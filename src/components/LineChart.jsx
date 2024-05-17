import React from "react";
import Chart from "react-google-charts";

const LineChart = ({ totalLoanAmount, loanDuration, monthlyEMI }) => {
    console.log(totalLoanAmount, loanDuration, monthlyEMI)
    const data = [["Loan year", "Loan Amount Remaining"]];

    for (let year = 1; year <= loanDuration; year++) {
      const remainingLoan = totalLoanAmount - year * monthlyEMI * 12;
      const loanAmountForYear = remainingLoan >= 0 ? remainingLoan : 0;
      data.push([year, loanAmountForYear]);
    }
  const options = {
    chart: {
      title: "Loan Repayment Calculator",
      subtitle:
        "The displayed EMI amount is approximate & is subject to change based on various factors.",
    },
    hAxis: {
      title: "Number of Years",
    },
    vAxis: {
      title: "Loan Amount Remaining (₹)",
    },
    
  };
  return (
    <>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </>
  );
};

export default LineChart;
