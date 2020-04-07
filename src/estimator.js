const covid19ImpactEstimator = data => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    population,
    totalHospitalBeds
  } = data;

  // CHALLENGE 1

  const impact = {
    currentlyInfected: reportedCases * 10
  };

  const severeImpact = {
    currentlyInfected: reportedCases * 50
  };

  const chkDuration = (periodType, duration) => {
    let result = 2 ** Math.floor(duration / 3);
    if (periodType === 'weeks') {
      result = 2 ** Math.floor((duration * 7) / 3);
    } else if (periodType === 'months') {
      result = 2 ** Math.floor((duration * 30) / 3);
    }
    return result;
  };
  const getDuration = chkDuration(periodType, timeToElapse);

  impact.infectionsByRequestedtime = impact.currentlyInfected * getDuration;
  severeImpact.infectionsByRequestedtime =
    severeImpact.currentlyInfected * getDuration;

  // CHALLENGE 2
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedtime * 0.15;
  severeImpact.severeCasesByRequestedTime =
    severeImpact.infectionsByRequestedtime * 0.15;

  impact.hospitalBedsByRequestedTime =
    Math.floor(totalHospitalBeds * 0.35) - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime =
    Math.floor(totalHospitalBeds * 0.35) -
    severeImpact.severeCasesByRequestedTime;

  return {
    data,
    impact,
    severeImpact
  };
};
let output = covid19ImpactEstimator({
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
});

output;
// export default covid19ImpactEstimator;

// Input
// {
//   region: {
//   name: "Africa",
//   avgAge: 19.7,
//   avgDailyIncomeInUSD: 5,
//   avgDailyIncomePopulation: 0.71
//   },
//   periodType: "days",
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
//  }

// Output
// {
//   data: {}, // the input data you got
//   impact: {}, // your best case estimation
//   severeImpact: {} // your severe case estimation
//  }
