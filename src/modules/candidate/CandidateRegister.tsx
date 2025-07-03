import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  candidateSchema,
  type CandidateFormData,
} from "../../schemas/candidate.schema";
import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowRight,
  CheckCircleOutline,
  Star,
  Upload,
} from "@mui/icons-material";
import useRegisterCandidate from "./hooks/use-candidate";
import { useNavigate } from "react-router-dom";

const step1Fields: (keyof CandidateFormData)[] = [
  "firstName",
  "lastName",
  "email",
  "password",
];
const step2Fields: (keyof CandidateFormData)[] = [
  "position",
  "experience",
  "skills",
  "cv",
];

const CandidateRegister = () => {
  const registerCandidate = useRegisterCandidate();

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro" | null>(
    null
  );

  const methods = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      position: "",
      experience: "",
      skills: "",
      cv: null,
      selectedPlan: undefined,
    },
  });
  const handleNext = async () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = await methods.trigger(step1Fields);
    } else if (currentStep === 2) {
      isValid = await methods.trigger(step2Fields);
    }

    if (!isValid) return;

    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = await methods.trigger();
    if (!isValid || !selectedPlan) return;

    const formValues = methods.getValues();

    const payload = {
      ...formValues,
      selectedPlan,
      paymentStatus: "unpaid" as const,
    };
    registerCandidate.mutate(payload, {
      onSuccess: () => {
        navigate("/payment");
      },
      onError: (err) => {
        console.error("Failed to register candidate:", err);
      },
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-600">
          Start your journey in the football industry
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextField
            id="firstName"
            label="First Name"
            {...methods.register("firstName")}
            placeholder="Enter your first name"
            fullWidth
            variant="outlined"
            margin="dense"
          />
          {methods.formState.errors.firstName && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.firstName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <TextField
            id="lastName"
            label="Last Name"
            {...methods.register("lastName")}
            placeholder="Enter your last name"
            fullWidth
            variant="outlined"
            margin="dense"
          />
          {methods.formState.errors.lastName && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <TextField
          id="email"
          label="Email Address"
          type="email"
          {...methods.register("email")}
          placeholder="Enter your email"
          fullWidth
          variant="outlined"
          margin="dense"
        />
        {methods.formState.errors.email && (
          <p className="text-red-500 text-sm">
            {methods.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <TextField
          id="password"
          label="Password"
          {...methods.register("password")}
          placeholder="Enter your secure password"
          fullWidth
          variant="outlined"
          margin="dense"
        />
        {methods.formState.errors.password && (
          <p className="text-red-500 text-sm">
            {methods.formState.errors.password.message}
          </p>
        )}
      </div>

      <button
        onClick={handleNext}
        className="w-full flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-black font-medium py-2 px-4 rounded-md cursor-pointer"
      >
        Continue <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  );
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Professional Profile
        </h2>
        <p className="text-gray-600">
          Tell us about your football industry experience
        </p>
      </div>
      <div className="space-y-2">
        <Controller
          name="position"
          control={methods.control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel id="rolePreference-label">Role Preference</InputLabel>
              <Select
                labelId="rolePreference-label"
                id="rolePreference"
                value={field.value}
                label="Role Preference"
                onChange={field.onChange}
              >
                <MenuItem value="marketing">
                  Marketing & Communications
                </MenuItem>
                <MenuItem value="operations">
                  Operations & Administration
                </MenuItem>
                <MenuItem value="finance">Finance & Accounting</MenuItem>
                <MenuItem value="sales">Sales & Business Development</MenuItem>
                <MenuItem value="analytics">
                  Data Analytics & Performance
                </MenuItem>
                <MenuItem value="media">Media & Broadcasting</MenuItem>
                <MenuItem value="legal">Legal & Compliance</MenuItem>
                <MenuItem value="hr">Human Resources</MenuItem>
                <MenuItem value="it">IT & Technology</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </div>
      <div className="space-y-2">
        <Controller
          name="experience"
          control={methods.control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel id="experience-label">Experience Level</InputLabel>
              <Select
                labelId="experience-label"
                id="experience"
                value={field.value}
                label="Experience Level"
                onChange={field.onChange}
              >
                <MenuItem value="entry">Entry Level (0-2 years)</MenuItem>
                <MenuItem value="mid">Mid Level (3-5 years)</MenuItem>
                <MenuItem value="senior">Senior Level (6-10 years)</MenuItem>
                <MenuItem value="executive">
                  Executive Level (10+ years)
                </MenuItem>
              </Select>
              {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="qualifications">Key Qualifications</InputLabel>
        <TextField
          id="qualifications"
          multiline
          minRows={4}
          {...methods.register("skills")}
          placeholder="List your key qualifications, certifications, and skills..."
          fullWidth
          variant="outlined"
        />
      </div>
      <div className="space-y-2">
        <Controller
          name="cv"
          control={methods.control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <InputLabel htmlFor="cv">Upload CV</InputLabel>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  id="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="cv" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    {field.value?.name
                      ? field.value.name
                      : "Click to upload your CV (PDF, DOC, DOCX)"}
                  </p>
                </label>
              </div>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      <div className="flex space-x-4">
        <Button onClick={handleBack} variant="outlined" className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Choose Your Membership
        </h2>
        <p className="text-gray-600">
          Select a plan to make your profile visible to football teams
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Box
          className={`cursor-pointer transition-all duration-75 p-4 hover:shadow-lg ${
            selectedPlan === "basic"
              ? "ring-2 ring-green-500 shadow-lg"
              : "hover:shadow-lg"
          }`}
          onClick={() => setSelectedPlan("basic")}
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Badge className="bg-green-100 text-green-800 border rounded-2xl px-3 border-green-100">
                Most Popular
              </Badge>
            </div>
            <div className="text-xl">Basic Plan</div>
            <div className="text-3xl font-bold text-green-600">
              $5<span className="text-sm text-gray-500">/month</span>
            </div>
            <Typography className="text-[12px] text-gray-400 py-3">
              Perfect for getting started
            </Typography>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircleOutline className="w-1 h-w-1 text-green-500" />
              <span className="text-sm">Profile visible to teams</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleOutline className="w-1 h-w-1 text-green-500" />
              <span className="text-sm">Apply to unlimited jobs</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleOutline className="w-1 h-w-1 text-green-500" />
              <span className="text-sm">Basic profile analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleOutline className="w-1 h-w-1 text-green-500" />
              <span className="text-sm">Email notifications</span>
            </div>
          </div>
        </Box>

        <Box
          className={`cursor-pointer transition-all duration-300 p-4 ${
            selectedPlan === "pro"
              ? "ring-2 ring-blue-500 shadow-lg"
              : "hover:shadow-lg"
          }`}
          onClick={() => setSelectedPlan("pro")}
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border rounded-2xl px-2">
                <Star className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            </div>
            <Typography className="text-xl">Pro Plan</Typography>
            <div className="text-3xl font-bold text-blue-600">
              $10<span className="text-sm text-gray-500">/month</span>
            </div>
            <Typography className="text-[12px] text-gray-400 py-3">
              For serious professionals
            </Typography>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircleOutline className="w-2 h-2 text-blue-500" />
              <span className="text-sm">Everything in Basic</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleOutline className="w-2 h-2 text-blue-500" />
              <span className="text-sm">Priority profile visibility</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleOutline className="w-2 h-2 text-blue-500" />
              <span className="text-sm">Advanced analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleOutline className="w-2 h-2 text-blue-500" />
              <span className="text-sm">Direct messaging with teams</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleOutline className="w-2 h-2 text-blue-500" />
              <span className="text-sm">Career consultation calls</span>
            </div>
          </div>
        </Box>
      </div>

      {selectedPlan && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Payment Summary</h4>
          <div className="flex justify-between items-center">
            <span>{selectedPlan === "basic" ? "Basic Plan" : "Pro Plan"}</span>
            <span className="font-bold">
              ${selectedPlan === "basic" ? "5" : "10"}/month
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Your subscription will begin immediately after payment confirmation.
          </p>
        </div>
      )}

      <div className="flex space-x-4 gap-1">
        <Button onClick={handleBack} variant="outlined" className="flex-1">
          Back
        </Button>
        <button
          onClick={handleSubmit}
          disabled={!selectedPlan}
          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 text-white py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer"
        >
          Complete Registration <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-gray-500">
              Candidate Registration
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <Card className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default CandidateRegister;
