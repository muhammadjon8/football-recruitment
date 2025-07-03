import { CircleNotifications, Home, LockClock, Mail } from "@mui/icons-material";
import { Badge, Box, Button, Card } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const PendingApproval = () => {
  const navigate = useNavigate();
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-2xl border-0">
          <Box className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <LockClock className="w-8 h-8 text-white" />
            </div>

            <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-300 p-2 rounded-md">
              Pending Review
            </Badge>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Registration Submitted Successfully!
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Thank you for registering your football team with FootballCareers.
              Your application is now under review by our admin team.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">
                What happens next?
              </h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Verification Process
                    </p>
                    <p className="text-sm text-gray-600">
                      Our team will verify your club information and credentials
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Email Notification
                    </p>
                    <p className="text-sm text-gray-600">
                      You'll receive an email confirmation once approved
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Account Activation
                    </p>
                    <p className="text-sm text-gray-600">
                      Start posting vacancies and searching for candidates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <LockClock className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">
                    Review Time
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Typically 1-2 business days
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Email Updates
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Check your inbox regularly
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-8">
              <div className="flex items-start space-x-3">
                <CircleNotifications className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-semibold text-yellow-800">
                    Important Notes
                  </h4>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Keep your email notifications enabled</li>
                    <li>• Ensure all provided information is accurate</li>
                    <li>
                      • Contact support if you don't hear back within 3 business
                      days
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                variant="outlined"
                className="flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Return to Homepage</span>
              </Button>

              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default PendingApproval;
