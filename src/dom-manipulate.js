import covid19ImpactEstimator from './estimator.js';

const toggleForms = () => {
  $('.region-data').animate({
    left: '150%',
    opacity: '0'
  });
  $('.cases-data').animate({
    left: '0',
    opacity: '1'
  });
  $(':root').css('--currentColor', '#007bff')
};

$('.step-but').click(() => {
  const rgnVals = {
    name: $('select[data-name] option:selected'),
    avgAge: $('input[data-avgAge]'),
    avgDailyIncomeInUSD: $('input[data-avgDailyIncomeInUSD]'),
    avgDailyIncomePopulation: $('input[data-avgDailyIncomePopulation]')
  };

  let chkRgnVals =
    !!rgnVals.name.text() &&
    !!rgnVals.avgAge.val() &&
    !!rgnVals.avgDailyIncomeInUSD.val() &&
    !!rgnVals.avgDailyIncomePopulation.val();
  if (chkRgnVals) {
    rgnVals.name.data('name', rgnVals.name.text());
    rgnVals.avgDailyIncomeInUSD.data('avgDailyIncomeInUSD', rgnVals.avgDailyIncomeInUSD.val());
    rgnVals.avgDailyIncomePopulation.data('avgDailyIncomePopulation', rgnVals.avgDailyIncomePopulation.val());
    rgnVals.avgAge.data('avgAge', rgnVals.avgAge.val());
    return toggleForms();
  }
  const warnElem = $('aside h4');
  warnElem.text('Please fill all fields.');
  warnElem.css('color', 'red');
});

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
    periodType: $('input[data-avgAge]').val(),
    timeToElapse: $('input[data-timeToElapse]').val(),
    reportedCases: $('input[data-reportedCases]').val(),
    population: $('input[data-population]').val(),
    totalHospitalBeds: $('input[data-totalHospitalBeds]').val()
  };

  covid19ImpactEstimator(data);
});
