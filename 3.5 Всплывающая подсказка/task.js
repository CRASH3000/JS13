const tooltips = [];

function clearTooltips() {
  for (let index = 0; index < tooltips.length; index++) {
    tooltips[index] = false;
  }
}

function onTooltipClick(event, index) {
  event.preventDefault();
  const $tooltip = document.getElementById('tooltip');

  if (tooltips[index]) {
    $tooltip.classList.remove('tooltip_active');
    tooltips[index] = false;
    return;
  }
  clearTooltips();
  tooltips[index] = true;

  const $tooltipTarget = event.currentTarget;
  $tooltip.style.left = `${$tooltipTarget.offsetLeft}px`;
  $tooltip.style.top = `${$tooltipTarget.offsetTop + 20}px`;
  $tooltip.innerHTML = $tooltipTarget.getAttribute('title');
  $tooltip.classList.add('tooltip_active');
}

document.addEventListener('DOMContentLoaded', function () {
  const $tooltips = document.querySelectorAll('.has-tooltip');

  $tooltips.forEach(($tooltip, index) => {
    tooltips[index] = false;
    $tooltip.addEventListener('click', (event) => onTooltipClick(event, index));
  });
});
