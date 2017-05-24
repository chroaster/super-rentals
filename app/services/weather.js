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

  getTemperaturePromise(location) {
    let currentTemp = null;
    let camelizedLocation = location.camelize();
    let weatherJson = this.get(`cachedWeather.${camelizedLocation}`);
    if (!weatherJson) {
      let promise = new Ember.RSVP.Promise((resolve)=> {
        Ember.$.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`).then(function(json) {
          weatherJson = json;
          currentTemp = kelvinToCelsius(json.main.temp).toFixed(0);
          resolve(currentTemp + 'C');
        });
      });
      this.set(`cachedWeather.${camelizedLocation}`, weatherJson);
      return promise;
    } else {
      currentTemp = kelvinToCelsius(weatherJson.main.temp).toFixed(0);
      return new Ember.RSVP.Promise((resolve)=>{resolve(currentTemp + 'C')});
    }
  },

  createWeatherElement() {
    let element = document.createElement('div');
    element.className = 'detail';
    return element;
  }
});
