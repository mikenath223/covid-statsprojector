const covid19ImpactEstimator = data => {
  const {
    region,
    reportedCases,
    periodType,
    timeToElapse,
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

  // CHALLENGE 3
  impact.casesForICUByRequestedTime = Math.floor(
    impact.infectionsByRequestedtime * 0.05
  );
  severeImpact.casesForICUByRequestedTime = Math.floor(
    severeImpact.infectionsByRequestedtime * 0.05
  );

  impact.casesForVentilatorsByRequestedTime = Math.floor(
    impact.infectionsByRequestedtime * 0.02
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(
    impact.infectionsByRequestedtime * 0.02
  );

  impact.dollarsInFlight = Math.floor(
    impact.infectionsByRequestedtime *
    region.avgDailyIncomePopulation *
    region.avgDailyIncomeInUSD *
    getDuration
  );
  severeImpact.dollarsInFlight = Math.floor(
    severeImpact.infectionsByRequestedtime *
    region.avgDailyIncomePopulation *
    region.avgDailyIncomeInUSD *
    getDuration
  );
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
