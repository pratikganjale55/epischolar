import React from "react";
import { Chart } from "react-google-charts";

function PiChart({ totalLoanAmount, loanAmount }) {
  console.log(totalLoanAmount, loanAmount);
  const totalInterestPaid = totalLoanAmount - loanAmount;
  const data = [
    ["Type", "Amount"],
    ["Principal Amount", loanAmount],
    ["Total Interest Paid", totalInterestPaid],
  ];

  const options = {
    title: "Loan Breakdown",
    is3D: true,
  };
  return (
    <>


    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
   
    </>
    
  );
}

export default PiChart;
