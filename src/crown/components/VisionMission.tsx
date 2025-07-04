import money from "../assets/money.svg";
import document from "../assets/docs.svg";
import clock from "../assets/clock-check.svg";
import nafcbIcon from "../assets/nacfb-black.svg";
import { Divider } from "@mui/material";

const VisionMissionComponent = () => {
  const features = [
    {
      icon: money,
      text: "Borrow from £5K to £10M with flexible funding options",
    },
    {
      icon: document,
      text: "Get affordable terms tailored to your business needs",
    },
    {
      icon: clock,
      text: "Enjoy quick approvals to keep your business moving",
    },
  ];

  return (
    <div className="w-[415px]">
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md mx-auto">
          <div className="text-center mb-8 w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-3 font-serif">
              Your Vision, Our Mission!
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get the funding you need with fast,
              <br />
              flexible business loans.
            </p>
          </div>
          <div className="space-y-6 mb-8">
            <Divider sx={{mb: 4}}/>
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 font-serif"
              >
                <div className="">
                  <img src={feature.icon} alt="" />
                </div>
                <p className="text-gray-70 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-5">
            <img src={nafcbIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionComponent;
