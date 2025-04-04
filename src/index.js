import './styles/reset.css';
import './styles/styles.css';

import { fetchWeather } from './scripts/weatherService';
import { updateTemp } from './scripts/tempSwitch';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('location-form');
  const input = document.getElementById('location-input');
  const resultSection = document.getElementById('weather-result');
  const tempSwitchBtn = document.getElementById('temp-unit');

  let currentUnit = 'F°';
  tempSwitchBtn.innerHTML = currentUnit;

  let currentFahrenheitTemp = null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const location = input.value.trim();
    if (!location) return;

    resultSection.innerHTML = '<p>Loading...</p>';

    try {
      const data = await fetchWeather(location);
      const { currentConditions, resolvedAddress } = data;
      const { temp, conditions } = currentConditions;

      currentFahrenheitTemp = temp;

      const calcTemp = updateTemp(temp, currentUnit);

      resultSection.innerHTML = `
        <div class="weather-info">
          <div class="temp-display">
            <h1>${calcTemp}°</h1>
          </div>
          <div class="weather-details">
            <p class="conditions">${conditions}</p>
            <p class="location">${resolvedAddress}</p>
          </div>
        </div>
      `;
    } catch (error) {
      resultSection.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  });

  tempSwitchBtn.addEventListener('click', () => {
    if (tempSwitchBtn.innerHTML === 'F°') {
      currentUnit = 'C°';
      tempSwitchBtn.innerHTML = currentUnit;
    } else {
      currentUnit = 'F°';
      tempSwitchBtn.innerHTML = currentUnit;
    }

    if (currentFahrenheitTemp !== null) {
      const tempDisplay = document.querySelector('.temp-display h1');
      if (tempDisplay) {
        tempDisplay.innerHTML = `${updateTemp(
          currentFahrenheitTemp,
          currentUnit
        )}°`;
      }
    }
  });
});
