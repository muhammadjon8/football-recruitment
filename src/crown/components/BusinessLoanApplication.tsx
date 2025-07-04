import { useState } from "react";
import CustomSlider from "./CustomSlider";
import CustomRadio from "./CustomRadio";
import arrowRight from "../assets/arrow-right.svg";
import shield from "../assets/shield-tick.svg";

const loanTerms = [
  "6 months",
  "12 months",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "6 years",
];
function BusinessLoanApplication() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("12 months");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      const numValue = parseInt(value);

      if (numValue > 500000) {
        setHasError(true);
        setErrorMessage("Maximum loan amount is £500K");
      } else if (numValue < 10000) {
        setHasError(true);
        setErrorMessage("Minimum loan amount is £10K");
      } else {
        setHasError(false);
        setErrorMessage("");
      }

      setLoanAmount(numValue);
    }
  };
  const handleSliderChange = (newValue: number) => {
    setLoanAmount(newValue);
    setHasError(false);
    setErrorMessage("");
  };
  return (
    <div className="bg-[#EDEDED] z-50 w-full">
      <div className="border border-gray-200 shadow-lg bg-white rounded-xl p-10 w-full">
        <h2 className="text-2xl font-bold font-serif">
          Business Loan Application
        </h2>
        <p className="text-gray-600 font-serif">
          Answer a few questions to check your borrowing potential
        </p>
        <div className="mt-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loan Amount
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600 font-semibold">
                £
              </span>
              <input
                type="text"
                value={loanAmount}
                onChange={handleAmountChange}
                placeholder="Enter an amount between £10K and £10M"
                className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-colors ${
                  hasError
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>
            {hasError && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                {errorMessage}
              </p>
            )}
            <div className="mt-4">
              <CustomSlider
                min={10000}
                max={500000}
                value={loanAmount}
                onChange={handleSliderChange}
                step={10000}
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Loan Term
          </label>
          <div className="grid grid-cols-4 gap-3">
            {loanTerms.map((term) => (
              <CustomRadio
                label={term}
                selected={term === selectedTerm}
                onClick={() => setSelectedTerm(term)}
              />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-center text-gray-600 text-sm gap-2">
            <img src={shield} alt="Sheild" />
            <p>Eligibility check won't affect your score</p>
          </div>
        </div>

        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-4 cursor-pointer">
          <p>Get Started</p>
          <img src={arrowRight} alt="Arrow" />
        </button>
      </div>
    </div>
  );
}

export default BusinessLoanApplication;
