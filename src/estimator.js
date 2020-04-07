const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse, population, totalHospitalBeds } = data;

  const impact = {
    currentlyInfected: reportedCases * 10,
  }

  const severeImpact = {
    currentlyInfected: reportedCases * 50,
  }

  const chkDuration = (periodType, duration) => {
    let 
    if (periodType === 'weeks') {
      
      return 
    } else if (periodType === 'months') {
      
      return
    }
    return 1024
  }

  const infectionsByRequestedtimeForImp = impact.currentlyInfected * 512;
  const infectionsByRequestedtimeForSevImp = severeImpact.currentlyInfected * 512;

  return {
    data,
    impact,
    severeImpact
  }

};

export default covid19ImpactEstimator;

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
