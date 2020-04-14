const covid19ImpactEstimator = (data) => {
  const {
    region,
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;

  const currInfImpact = reportedCases * 10;
  const impactObj = {
    currentlyInfected: currInfImpact
  };

  const currInfSevImpact = reportedCases * 50;
  const severeImpactObj = {
    currentlyInfected: currInfSevImpact
  };

  let days;
  const chkDuration = (period, duration) => {
    let result = 2 ** Math.floor(duration / 3);
    days = duration;
    if (period === 'weeks') {
      days = duration * 7;
      result = 2 ** Math.floor((duration * 7) / 3);
    } else if (period === 'months') {
      days = duration * 30;
      result = Math.floor(2 ** ((duration * 30) / 3));
    }
    return result;
  };
  const getDuration = chkDuration(periodType, timeToElapse);

  const impactInfectionsBy = currInfImpact * getDuration;
  impactObj.infectionsByRequestedTime = impactInfectionsBy;
  const severeImpactInfectionsBy = currInfSevImpact * getDuration;
  severeImpactObj.infectionsByRequestedTime = severeImpactInfectionsBy;

  let impactSevereCases = impactObj.infectionsByRequestedTime * 0.15;
  impactSevereCases = impactSevereCases < 0 ? Math.ceil(
    impactSevereCases
  ) : Math.floor(impactSevereCases);
  impactObj.severeCasesByRequestedTime = (impactSevereCases);

  let severeImpactSevereCases = severeImpactObj.infectionsByRequestedTime * 0.15;
  severeImpactSevereCases = severeImpactSevereCases < 0 ? Math.ceil(
    severeImpactSevereCases
  ) : Math.floor(severeImpactSevereCases);

  severeImpactObj.severeCasesByRequestedTime = severeImpactSevereCases;

  let impactHospBeds = (
    totalHospitalBeds * 0.35 - impactObj.severeCasesByRequestedTime
  );
  impactHospBeds = impactHospBeds < 0 ? Math.ceil(impactHospBeds) : Math.floor(impactHospBeds);
  impactObj.hospitalBedsByRequestedTime = impactHospBeds;

  let sevImpactHospBeds = (totalHospitalBeds * 0.35
    - severeImpactObj.severeCasesByRequestedTime);
  sevImpactHospBeds = sevImpactHospBeds < 0 ? Math.ceil(
    sevImpactHospBeds
  ) : Math.floor(sevImpactHospBeds);
  severeImpactObj.hospitalBedsByRequestedTime = sevImpactHospBeds;

  impactObj.casesForICUByRequestedTime = Math.floor(
    impactObj.infectionsByRequestedTime * 0.05
  );
  severeImpactObj.casesForICUByRequestedTime = Math.floor(
    severeImpactObj.infectionsByRequestedTime * 0.05
  );

  impactObj.casesForVentilatorsByRequestedTime = Math.floor(
    impactObj.infectionsByRequestedTime * 0.02
  );
  severeImpactObj.casesForVentilatorsByRequestedTime = Math.floor(
    severeImpactObj.infectionsByRequestedTime * 0.02
  );

  const dFlightImpact = Math.floor(
    (impactObj.infectionsByRequestedTime
      * region.avgDailyIncomePopulation
      * region.avgDailyIncomeInUSD)
    / days
  );
  impactObj.dollarsInFlight = dFlightImpact;
  const dFlightSevere = Math.floor(
    (severeImpactObj.infectionsByRequestedTime
      * region.avgDailyIncomePopulation
      * region.avgDailyIncomeInUSD)
    / days
  );
  severeImpactObj.dollarsInFlight = dFlightSevere;

  return {
    impact: impactObj,
    severeImpact: severeImpactObj
  };
};

export default covid19ImpactEstimator;
