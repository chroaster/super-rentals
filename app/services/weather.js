import Ember from 'ember';

const apiKey = '43f2d6b023a90d00a318372bbe0d75cd';
function kelvinToCelsius(degreesKelvin) {
  return degreesKelvin - 273.15;
}

export default Ember.Service.extend({
  init() {
    if (!this.get('cachedWeather')) {
      this.set('cachedWeather', Ember.Object.create());
    }
  },

  getTemperatureElement(location) {
    let element = this.createWeatherElement();
    let camelizedLocation = location.camelize();
    let weatherJson = this.get(`cachedWeather.${camelizedLocation}`);
    if (!weatherJson) {
      Ember.$.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`).then(function(json) {
        weatherJson = json;
        let currentTemp = kelvinToCelsius(json.main.temp).toFixed(0);
        element.append(currentTemp + 'C');
      });
      this.set(`cachedWeather.${camelizedLocation}`, weatherJson);
      return element;
    } else {
      let currentTemp = kelvinToCelsius(weatherJson.main.temp).toFixed(0);
      element.append(currentTemp + 'C');
      return element;
    }
  },

  createWeatherElement() {
    let element = document.createElement('div');
    element.className = 'detail';
    return element;
  }
});
