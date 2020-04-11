import covid19ImpactEstimator from './estimator';
/* global $ */

const domManip = () => {
const toggleForms = () => {
  $('.region-data').animate({
    left: '150%',
    opacity: '0'
  });
  $('.cases-data').animate({
    left: '0',
    opacity: '1'
  });
  document
    .querySelector(':root')
    .style.setProperty('--currentColor', '#007bff');
};

$('.step-but').click(() => {
  const rgnVals = {
    name: $('select[data-name] option:selected'),
    avgAge: $('input[data-avgAge]'),
    avgDailyIncomeInUSD: $('input[data-avgDailyIncomeInUSD]'),
    avgDailyIncomePopulation: $('input[data-avgDailyIncomePopulation]')
  };
  const chkRgnVals = !!rgnVals.name.text()
    && !!rgnVals.avgAge.val()
    && !!rgnVals.avgDailyIncomeInUSD.val()
    && !!rgnVals.avgDailyIncomePopulation.val();
  if (chkRgnVals) {
    $('#name').data('name', rgnVals.name.text());
    rgnVals.avgDailyIncomeInUSD.data(
      'avgDailyIncomeInUSD',
      rgnVals.avgDailyIncomeInUSD.val()
    );
    rgnVals.avgDailyIncomePopulation.data(
      'avgDailyIncomePopulation',
      rgnVals.avgDailyIncomePopulation.val()
    );
    rgnVals.avgAge.data('avgAge', rgnVals.avgAge.val());
    return toggleForms();
  }
  const warnElem = $('aside h4');
  warnElem.text('Please fill all fields.');
  return warnElem.css('color', 'red');
});

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

  $('.reg').text(name);
  $('.avgAge').text(avgAge);
  $('.avgDailyIncomeInUSD').text(avgDailyIncomeInUSD);
  $('.avgDailyIncomePopulation').text(avgDailyIncomePopulation);
  $('.periodType').text(periodType);
  $('.timeToElapse').text(timeToElapse);
  $('.reportedCases').text(reportedCases);
  $('.population').text(population);
  $('.totalHospitalBeds').text(totalHospitalBeds);
  $('.impact-cont .currentlyInfected').text(currentlyInfected);
  $('.impact-cont .infectionsByRequestedtime').text(infectionsByRequestedtime);
  $('.impact-cont .severeCasesByRequestedTime').text(
    severeCasesByRequestedTime
  );
  $('.impact-cont .hospitalBedsByRequestedTime').text(
    hospitalBedsByRequestedTime
  );
  $('.impact-cont .casesForICUByRequestedTime').text(
    casesForICUByRequestedTime
  );
  $('.impact-cont .casesForVentilatorsByRequestedTime').text(
    casesForVentilatorsByRequestedTime
  );
  $('.impact-cont .dollarsInFlight').text(dollarsInFlight);
  $('.severe-impact-cont .currentlyInfected').text(scurrentlyInfected);
  $('.severe-impact-cont .infectionsByRequestedtime').text(
    sinfectionsByRequestedtime
  );
  $('.severe-impact-cont .severeCasesByRequestedTime').text(
    ssevereCasesByRequestedTime
  );
  $('.severe-impact-cont .hospitalBedsByRequestedTime').text(
    shospitalBedsByRequestedTime
  );
  $('.severe-impact-cont .casesForICUByRequestedTime').text(
    scasesForICUByRequestedTime
  );
  $('.severe-impact-cont .casesForVentilatorsByRequestedTime').text(
    scasesForVentilatorsByRequestedTime
  );
  $('.severe-impact-cont .dollarsInFlight').text(sdollarsInFlight);

  $('.form-container section').css('width', '100%');
  $('aside').css('width', '100%');

  $('.steps-shift').hide(1000);
  $('form').hide(1000);
  $('aside h1').hide(1000);
  $('aside h4').hide(1000);
  $('.results').show('explode', { pieces: 9 }, 2000);
  $('.data-main-cont').show('explode', { pieces: 9 }, 2000);
};

$('form').submit((e) => {
  e.preventDefault();
  const data = {
    region: {
      name: $('select[data-name]').data('name'),
      avgAge: $('input[data-avgAge]').data('avgAge'),
      avgDailyIncomeInUSD: $('input[data-avgDailyIncomeInUSD]').data(
        'avgDailyIncomeInUSD'
      ),
      avgDailyIncomePopulation: $('input[data-avgDailyIncomePopulation]').data(
        'avgDailyIncomePopulation'
      )
    },
    periodType: $('select[data-period-type] option:selected').text(),
    timeToElapse: $('input[data-time-to-elapse]').val(),
    reportedCases: $('input[data-reported-cases]').val(),
    population: $('input[data-population]').val(),
    totalHospitalBeds: $('input[data-total-hospital-beds]').val()
  };
  runEstimator(data);
});

$('.reload').click(() => {
  window.location.reload()
})
}

export default domManip;