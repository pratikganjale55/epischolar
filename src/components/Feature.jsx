import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import PiChart from "./PiChart";

const Feature = () => {
  const [loanAmount, setLoanAmount] = useState(1600000);
  const [interestRate, setInterestRate] = useState(15);
  const [loanDuration, setLoanDuration] = useState(10);
  const [courseDuration, setCourseDuration] = useState(24);
  const [gracePeriod, setGracePeriod] = useState(6);
  const [totalLoanAmount, setTotalLoanAmount] = useState(loanAmount);

  const handleLoanAmountChange = (event) => {
    setLoanAmount(parseInt(event.target.value));
  };

  const handleInterestRateChange = (event) => {
    setInterestRate(parseInt(event.target.value));
  };

  const handleLoanDurationChange = (event) => {
    setLoanDuration(parseInt(event.target.value));
  };

  const handleCourseDurationChange = (event) => {
    setCourseDuration(parseInt(event.target.value));
  };

  const handleGracePeriodChange = (event) => {
    setGracePeriod(parseInt(event.target.value));
  };

  const principalAmount = loanAmount;
  const totalInterest = (loanAmount * interestRate * loanDuration) / 100;
  const totalAmountWithoutGracePeriod = principalAmount + totalInterest;
  const remainingMonths = loanDuration * 12 - (courseDuration - gracePeriod);
  const monthlyEMI = Math.floor(
    totalAmountWithoutGracePeriod / remainingMonths
  );
  const totalAmount = Math.floor(
    totalAmountWithoutGracePeriod + (courseDuration - gracePeriod) * monthlyEMI
  );

  const updateRangeStyle = (range) => {
    const value = ((range.value - range.min) / (range.max - range.min)) * 100;
    range.style.background = `linear-gradient(to right, #4E3C86 0%, #4E3C86 ${value}%, #b3b3b3 ${value}%, #b3b3b3 100%)`;
  };

  useEffect(() => {
    document.querySelectorAll('input[type="range"]').forEach(updateRangeStyle);
    setTotalLoanAmount(totalAmount);
  }, [
    loanAmount,
    interestRate,
    loanDuration,
    courseDuration,
    gracePeriod,
    totalAmount,
  ]);

  return (
    <>
      <div className="container">
        <div className="left_Container">
          <div className="top_left">
            <h2>Loan Repayment Calculator</h2>
            <p>
              The displayed EMI amount is approximate & is subject to change
              based on various factors.
            </p>
          </div>
          <div className="bottom_left">
            <div className="slider_Div">
              <div className="input_Group">
                <label htmlFor="loanAmount" className="label_Above">
                  <span className="left_Text"> Loan Amount: </span>
                  <span className="right_Text">{loanAmount}</span>
                </label>
                <input
                  type="range"
                  id="loanAmount"
                  className="input_Below"
                  min={100000}
                  max={10000000}
                  step={10000}
                  value={loanAmount}
                  onInput={(e) => {
                    handleLoanAmountChange(e);
                    updateRangeStyle(e.target);
                  }}
                />
              </div>

              <div className="input_Group">
                <label htmlFor="interestRate" className="label_Above">
                  <span className="left_Text"> Interest Rate: </span>
                  <span className="right_Text">{interestRate}%</span>
                </label>
                <input
                  type="range"
                  id="interestRate"
                  className="input_Below"
                  min={1}
                  max={20}
                  step={1}
                  value={interestRate}
                  onInput={(e) => {
                    handleInterestRateChange(e);
                    updateRangeStyle(e.target);
                  }}
                />
              </div>

              <div className="input_Group">
                <label htmlFor="loanDuration" className="label_Above">
                  <span className="left_Text"> Loan Duration: </span>
                  <span className="right_Text">{loanDuration} Years</span>
                </label>
                <input
                  type="range"
                  id="loanDuration"
                  className="input_Below"
                  min={1}
                  max={20}
                  step={1}
                  value={loanDuration}
                  onInput={(e) => {
                    handleLoanDurationChange(e);
                    updateRangeStyle(e.target);
                  }}
                />
              </div>

              <div className="input_Group">
                <label htmlFor="courseDuration" className="label_Above">
                  <span className="left_Text">Course Duration: </span>
                  <span className="right_Text">{courseDuration} Months </span>
                </label>
                <input
                  type="range"
                  id="courseDuration"
                  className="input_Below"
                  min={0}
                  max={48}
                  step={1}
                  value={courseDuration}
                  onInput={(e) => {
                    handleCourseDurationChange(e);
                    updateRangeStyle(e.target);
                  }}
                />
              </div>

              <div className="input_Group">
                <label htmlFor="gracePeriod" className="label_Above">
                  <span className="left_Text">Grace Period:</span>
                  <span className="right_Text">{gracePeriod} Months</span>
                </label>
                <input
                  type="range"
                  id="gracePeriod"
                  className="input_Below"
                  min={0}
                  max={12}
                  step={1}
                  value={gracePeriod}
                  onInput={(e) => {
                    handleGracePeriodChange(e);
                    updateRangeStyle(e.target);
                  }}
                />
              </div>
            </div>
            <div className="results_Container">
              <h2>Calculated Results</h2>
              <div className="result_Item">
                <span className="result_Label">Principal Amount:</span>
                <span className="result_Value">₹{principalAmount}</span>
              </div>
              <div className="result_Item">
                <span className="result_Label">Total Interest:</span>
                <span className="result_Value">₹{totalInterest}</span>
              </div>
              <div className="result_Item">
                <span className="result_Label">Total Amount:</span>
                <span className="result_Value">₹{totalAmount}</span>
              </div>
              <div className="result_Item">
                <span className="result_Label">Monthly EMI:</span>
                <span className="result_Value">₹{monthlyEMI.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right_Container">
          <div>
            <LineChart
              totalLoanAmount={totalLoanAmount}
              loanDuration={loanDuration}
              monthlyEMI={monthlyEMI}
            />
          </div>
          <div>
            <PiChart
              totalLoanAmount={totalLoanAmount}
              loanAmount={loanAmount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
