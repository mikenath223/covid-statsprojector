import covid19ImpactEstimator from "./estimator";

const selectQuery = (query) => document.querySelector(query);
const toggleForms = () => {
  $('.region-data').animate({
    left: '150%',
    opacity: '0',
  });
  $('.cases-data').animate({
    left: '0',
    opacity: '1',
  });
}

$('.step-but').click(() => {
  const rgnVals = {
    name: selectQuery('select[data-name]'),
    avgDailyIncomeInUSD: selectQuery('input[data-avgDailyIncomeInUSD]'),
    avgDailyIncomePopulation: selectQuery('input[data-avgDailyIncomePopulation]'),
    avgAge: selectQuery('input[data-average-age]')
  };
  let chkRgnVals = !!rgnVals.name.value && !!rgnVals.avgAge.value && !!rgnVals.avgDailyIncomeInUSD.value && !!rgnVals.avgDailyIncomePopulation.value
  if (chkRgnVals) {
    rgnVals.name.dataset.name = rngVals.name.value;
    rgnVals.avgDailyIncomeInUSD.dataset.avgDailyIncomeInUSD = rngVals.avgDailyIncomeInUSD.value;
    rgnVals.name.dataset.avgDailyIncomePopulation = rngVals.avgDailyIncomePopulation.value;
    rgnVals.avgAge.dataset.avgAge = rngVals.avgAge.value;
    return toggleForms();
  }
  const warnElem = selectQuery('aside h4');
  warnElem.textContent = "Please fill all fields.";
  warnElem.style.color = "red";
})

$('form').submit(() => {
  $(this).preventDefault();
  const data = {
    region: {
      name: selectQuery('select[data-name]').dataset.name,
      avgAge: 
    }
  }

// covid19ImpactEstimator
})