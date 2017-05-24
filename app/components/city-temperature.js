import Ember from 'ember';

export default Ember.Component.extend({
  weather: Ember.inject.service(),
  tagName: '',

  didInsertElement() {
    this._super(...arguments);
    let location = this.get('location');
    let temperaturePromise = this.get('weather').getTemperaturePromise(location);
    temperaturePromise.then((value)=>{this.set('weatherValue', value)});
  }
});
