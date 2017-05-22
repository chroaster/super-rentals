import Ember from 'ember';

export default Ember.Component.extend({
  weather: Ember.inject.service(),

  didInsertElement() {
    this._super(...arguments);
    let location = this.get('location');
    let weatherElement = this.get('weather').getTemperatureElement(location);
    this.$('.weather-container').append(weatherElement);
  }
});
