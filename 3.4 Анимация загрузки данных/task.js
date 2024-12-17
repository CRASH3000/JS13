const apiURL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

async function getCourses() {
  const response = await fetch(apiURL);
  const data = await response.json();

  const valuteObject = data.response.Valute;
  const courses = [];

  for (const key in valuteObject) {
    if (valuteObject.hasOwnProperty(key)) {
      const { CharCode, Name, Value } = valuteObject[key];

      courses.push({
        code: CharCode,
        value: Value,
        currency: Name,
      });
    }
  }
  return courses;
}

function renderItemElement({ code, value, currency }) {
  const $items = document.getElementById('items');

  const $item = document.createElement('div');
  $item.className = 'item';

  const $code = document.createElement('div');
  $code.className = 'item__code';
  $code.textContent = code;

  const $value = document.createElement('div');
  $value.className = 'item__value';
  $value.textContent = value;

  const $currency = document.createElement('div');
  $currency.className = 'item__currency';
  $currency.textContent = currency;

  $item.appendChild($code);
  $item.appendChild($value);
  $item.appendChild($currency);

  $items.appendChild($item);
}


document.addEventListener('DOMContentLoaded', async () => {
  const $loader = document.getElementById('loader');

  let courses = [];
  try {
    courses = await getCourses();
  } catch (error) {
    alert(error.message);
  } finally {
    $loader.classList.remove('loader_active');
  }

  courses.forEach(renderItemElement);
});
