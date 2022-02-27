<template>
  <Page>
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <StackLayout orientation="horizontal">
        <Label class="fas action-bar-drawer" text.decode="&#xf060;" width="10%" @tap="$navigateBack" />
        <Label :text="city" class="action-bar-title" colSpan="2" width="80%" />
        <Label class="fas action-bar-drawer" text.decode="" width="10%" />
      </StackLayout>
    </ActionBar>

    <GridLayout class="wrapper" rows="auto,auto">
      <StackLayout row="0">
        <Label :text="city" class="weather-text weather-text-city bold"></Label>
        <Label :text="summary" class="weather-text"></Label>
        <Image :src="image" class="weather-image" />

        <GridLayout class="weather-box" columns="1*,1*" rows="auto">
          <Label :text="currentTemperature" class="weather-text large" col="0" row="0"></Label>
          <StackLayout col="1" row="0">
            <Label class="weather-text small bold" text="details"></Label>
            <StackLayout class="hr-light tight"></StackLayout>
            <Label :text="humidity" class="weather-text small"></Label>
            <Label :text="windSpeed" class="weather-text small"></Label>
            <Label :text="visibility" class="weather-text small"></Label>
          </StackLayout>
        </GridLayout>
      </StackLayout>

      <StackLayout row="1">
        <Label :text="day" class="weather-text"></Label>
        <Label :text="time" class="weather-text"></Label>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import { Http } from '@nativescript/core';

export default {
  props: ['cityname'],
  data() {
    return {
      image: '',
      city: '',
      windSpeed: '',
      summary: '',
      visibility: '',
      humidity: '',
      currentTemperature: '',
      day: '',
      time: '',
    };
  },
  methods: {
    getMyWeather() {
      const formattedCityName = this.cityname.replace(' ', '%20');
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ formattedCityName }&units=metric&appid=${ process.env.WEATHER_KEY }`;
      Http.request({ url: url, method: 'GET' }).then(this.parseResponse);
    },
    parseResponse(response) {
      const location = response.content.toJSON();
      this.city = location.name;
      this.summary = location.weather[0].main;
      this.icon = location.weather[0].description;
      this.setImage(this.icon);
      const weatherObj = JSON.stringify(location.main);
      const weather = JSON.parse(weatherObj);
      this.currentTemperature = parseFloat(weather.temp).toFixed(1).toString() + '°C';
      this.humidity = 'humidity: ' + weather.humidity.toString() + '%';
      const windObj = JSON.stringify(location.wind);
      const wind = JSON.parse(windObj);
      this.windSpeed = 'wind: ' + wind.speed.toString() + ' mph';
      const visibilityObj = Math.round(JSON.stringify(location.visibility) / 1609.344);
      this.visibility = 'visibility: ' + visibilityObj.toString() + ' m';
    },
    setImage(icon) {
      if (icon.includes('rain') || icon.includes('thunderstorm') || icon.includes('drizzle')) {
        this.image = '~/assets/images/rainy.png';
      } else if (icon.includes('clouds')) {
        this.image = '~/assets/images/cloudy.png';
      } else if (
        icon.includes('snow') ||
        icon.includes('sleet') ||
        icon.includes('mist') ||
        icon.includes('drizzle') ||
        icon.includes('haze')
      ) {
        this.image = '~/assets/images/foggy.png';
      } else if (icon.includes('clear')) {
        this.image = '~/assets/images/sunny.png';
      }
    },
  },
  created() {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const currentHours = currentDate.getHours();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = weekdays[day];
    const timeOfDay = currentHours >= 12 ? 'Afternoon' : 'Morning';
    this.day = dayName;
    this.time = timeOfDay;

    this.getMyWeather();
  },
};
</script>
