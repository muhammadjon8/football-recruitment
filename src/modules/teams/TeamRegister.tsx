import {
  ArrowRight,
  BadgeOutlined,
  CheckCircle,
  CheckCircleOutline,
  LockClock,
  Shield,
  Upload,
} from "@mui/icons-material";
import { Box, Button, Card, InputLabel, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { teamSchema, type TeamRegisterSchema } from "../../schemas/team.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LocationSearch from "../../components/LocationSearch";
import useRegisterTeam from "./hooks/use-register-team";

const accountInformation: (keyof TeamRegisterSchema)[] = ["email", "password"];

const teamInformation: (keyof TeamRegisterSchema)[] = [
  "teamName",
  "website",
  "location",
];

const TeamRegister = () => {
  const navigate = useNavigate();
  const registerTeam = useRegisterTeam();

  const methods = useForm<TeamRegisterSchema>({
    resolver: zodResolver(teamSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      teamName: "",
      location: "",
      description: "",
      logo: null,
    },
  });

  const handleSubmit = () => {
    const isValid = methods.trigger();
    if (!isValid) return;

    const formData = methods.getValues();
    registerTeam.mutate(formData, {
      onSuccess: () => {
        navigate("/team/pending");
      },
      onError: (err) => {
        console.error("Failed to register team:", err);
      },
    });
    console.log("Team Registration Data:", formData);
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <BadgeOutlined className="mb-4 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-blue-300">
            <Shield className="w-4 h-4 mr-2" />
            Team Registration
          </BadgeOutlined>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Join Our Network
          </h1>
          <p className="text-gray-600">
            Connect with top football industry professionals
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <Box className="p-8">
            <div className="space-y-6">
              {/* Account Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  {accountInformation.every(
                    (field) => !methods.formState.errors[field]
                  ) ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <CheckCircleOutline className="w-4 h-4 mr-2" />
                  )}
                  Account Information
                </h3>
                <div className="">
                  <div className="space-y-2">
                    <TextField
                      id="email"
                      label="Email Address"
                      {...methods.register("email")}
                      placeholder="Enter your email address"
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
                      type="password"
                      placeholder="Enter your password"
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
                </div>
              </div>

              {/* Club Information */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                  {teamInformation.every(
                    (field) => !methods.formState.errors[field]
                  ) ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <CheckCircleOutline className="w-4 h-4 mr-2" />
                  )}
                  Club Information
                </h3>

                <div className="space-y-4">
                  <div className="">
                    <div className="space-y-2">
                      <TextField
                        id="name"
                        label="Club Name"
                        {...methods.register("teamName")}
                        placeholder="Enter your club name"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                      />
                      {methods.formState.errors.teamName && (
                        <p className="text-red-500 text-sm">
                          {methods.formState.errors.teamName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <div className="space-y-2">
                      <TextField
                        id="website"
                        label="Website"
                        {...methods.register("website")}
                        placeholder="Enter your website"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                      />
                      {methods.formState.errors.website && (
                        <p className="text-red-500 text-sm">
                          {methods.formState.errors.website.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <div className="space-y-2">
                      <LocationSearch
                        onSelect={(value) =>
                          methods.setValue("location", value)
                        }
                      />
                      {methods.formState.errors.location && (
                        <p className="text-red-500 text-sm">
                          {methods.formState.errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <TextField
                      id="description"
                      label="Description"
                      {...methods.register("description")}
                      placeholder="Enter your description"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                    {methods.formState.errors.description && (
                      <p className="text-red-500 text-sm">
                        {methods.formState.errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Controller
                      name="logo"
                      control={methods.control}
                      render={({ field, fieldState }) => (
                        <div className="space-y-2">
                          <InputLabel htmlFor="logo">Upload Logo</InputLabel>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                            <input
                              type="file"
                              id="logo"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0] || null)
                              }
                              className="hidden"
                            />
                            <label htmlFor="logo" className="cursor-pointer">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-600">
                                {field.value?.name
                                  ? field.value.name
                                  : "Click to upload your Logo (PDF, DOC, DOCX)"}
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
                </div>
              </div>

              {/* Registration Benefits */}
              <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">
                  What You Get:
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircleOutline className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        Free registration and setup
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleOutline className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        Access to qualified candidates
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleOutline className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Advanced search filters</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircleOutline className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        Post unlimited job vacancies
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleOutline className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        Only pay $50 per successful hire
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleOutline className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Dedicated support team</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Process Notice */}
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <LockClock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">
                      Approval Process
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your team account will be reviewed by our admin team
                      before activation. This typically takes 1-2 business days.
                      You'll receive an email once approved.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 py-3 text-white border rounded-md flex items-center justify-center"
              >
                Submit Registration <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default TeamRegister;
