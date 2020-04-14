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
    data,
    impact: impactObj,
    severeImpact: severeImpactObj
  };
};

const toggleForms = () => {
  document
    .querySelector('.region-data')
    .setAttribute('style', 'opacity: 0; z-index: -50');

  document
    .querySelector('.cases-data')
    .setAttribute('style', 'opacity: 1; z-index: 50');
  document
    .querySelector(':root')
    .style.setProperty('--currentColor', '#007bff');
};

document.querySelector('.step-but').onclick = () => {
  const rgnVals = {
    name: document.querySelector('select[data-name]'),
    avgAge: document.querySelector('input[data-avgAge]'),
    avgDailyIncomeInUSD: document.querySelector(
      'input[data-avgDailyIncomeInUSD]'
    ),
    avgDailyIncomePopulation: document.querySelector(
      'input[data-avgDailyIncomePopulation]'
    )
  };
  const chkRgnVals = !!rgnVals.name.value
    && !!rgnVals.avgAge.value
    && !!rgnVals.avgDailyIncomeInUSD.value
    && !!rgnVals.avgDailyIncomePopulation.value;
  if (chkRgnVals) {
    document.querySelector('#name').dataset.name = rgnVals.name.value;
    rgnVals.avgDailyIncomeInUSD.dataset.avgDailyIncomeInUSD = rgnVals.avgDailyIncomeInUSD.value;
    const dailyVal = rgnVals.avgDailyIncomePopulation.value;
    rgnVals.avgDailyIncomePopulation.dataset.avgDailyIncomePopulation = dailyVal;
    rgnVals.avgAge.dataset.avgAge = rgnVals.avgAge.value;
    return toggleForms();
  }
  const warnElem = document.querySelector('aside h4');
  warnElem.textContent = 'Please fill all fields.';
  warnElem.style.color = 'red';
  return '';
};

const runEstimator = (input) => {
  const estimateOutput = covid19ImpactEstimator(input);
  const { data, impact, severeImpact } = estimateOutput;
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = data;
  const {
    currentlyInfected,
    infectionsByRequestedtime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  } = impact;
  const {
    currentlyInfected: scurrentlyInfected,
    infectionsByRequestedtime: sinfectionsByRequestedtime,
    severeCasesByRequestedTime: ssevereCasesByRequestedTime,
    hospitalBedsByRequestedTime: shospitalBedsByRequestedTime,
    casesForICUByRequestedTime: scasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: scasesForVentilatorsByRequestedTime,
    dollarsInFlight: sdollarsInFlight
  } = severeImpact;
  const {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = region;

  document.querySelector('.reg').textContent = name;
  document.querySelector('.avgAge').textContent = avgAge;
  document.querySelector(
    '.avgDailyIncomeInUSD'
  ).textContent = avgDailyIncomeInUSD;
  document.querySelector(
    '.avgDailyIncomePopulation'
  ).textContent = avgDailyIncomePopulation;
  document.querySelector('.periodType').textContent = periodType;
  document.querySelector('.timeToElapse').textContent = timeToElapse;
  document.querySelector('.reportedCases').textContent = reportedCases;
  document.querySelector('.population').textContent = population;
  document.querySelector('.totalHospitalBeds').textContent = totalHospitalBeds;
  document.querySelector(
    '.impact-cont .currentlyInfected'
  ).textContent = currentlyInfected;
  document.querySelector(
    '.impact-cont .infectionsByRequestedtime'
  ).textContent = infectionsByRequestedtime;
  document.querySelector(
    '.impact-cont .severeCasesByRequestedTime'
  ).textContent = severeCasesByRequestedTime;
  document.querySelector(
    '.impact-cont .hospitalBedsByRequestedTime'
  ).textContent = hospitalBedsByRequestedTime;
  document.querySelector(
    '.impact-cont .casesForICUByRequestedTime'
  ).textContent = casesForICUByRequestedTime;
  document.querySelector(
    '.impact-cont .casesForVentilatorsByRequestedTime'
  ).textContent = casesForVentilatorsByRequestedTime;
  document.querySelector(
    '.impact-cont .dollarsInFlight'
  ).textContent = dollarsInFlight;
  document.querySelector(
    '.severe-impact-cont .currentlyInfected'
  ).textContent = scurrentlyInfected;
  document.querySelector(
    '.severe-impact-cont .infectionsByRequestedtime'
  ).textContent = sinfectionsByRequestedtime;
  document.querySelector(
    '.severe-impact-cont .severeCasesByRequestedTime'
  ).textContent = ssevereCasesByRequestedTime;
  document.querySelector(
    '.severe-impact-cont .hospitalBedsByRequestedTime'
  ).textContent = shospitalBedsByRequestedTime;
  document.querySelector(
    '.severe-impact-cont .casesForICUByRequestedTime'
  ).textContent = scasesForICUByRequestedTime;
  document.querySelector(
    '.severe-impact-cont .casesForVentilatorsByRequestedTime'
  ).textContent = scasesForVentilatorsByRequestedTime;
  document.querySelector(
    '.severe-impact-cont .dollarsInFlight'
  ).textContent = sdollarsInFlight;
  document.querySelector('.form-container section').style.width = '100%';
  document.querySelector('aside').style.width = '100%';

  document.querySelector('.steps-shift').style.display = 'none';
  document.querySelector('form').style.display = 'none';
  document.querySelector('aside h1').style.display = 'none';
  document.querySelector('aside h4').style.display = 'none';
  document.querySelector('.results').style.display = 'initial';
  document.querySelector('.data-main-cont').style.display = 'initial';
};

document.querySelector('form').onsubmit = (e) => {
  e.preventDefault();
  const data = {
    region: {
      name: document.querySelector('select[data-name]').dataset.name,
      avgAge: document.querySelector('input[data-avgAge]').dataset.avgAge,
      avgDailyIncomeInUSD: document.querySelector(
        'input[data-avgDailyIncomeInUSD]'
      ).dataset.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: document.querySelector(
        'input[data-avgDailyIncomePopulation]'
      ).dataset.avgDailyIncomePopulation
    },
    periodType: document.querySelector('select[data-name]').value,
    timeToElapse: document.querySelector('input[data-time-to-elapse]').value,
    reportedCases: document.querySelector('input[data-reported-cases]').value,
    population: document.querySelector('input[data-population]').value,
    totalHospitalBeds: document.querySelector('input[data-total-hospital-beds]')
      .value
  };
  runEstimator(data);
};

document.querySelector('.reload').onclick = (() => {
  window.location.reload();
});
