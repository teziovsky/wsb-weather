<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <StackLayout orientation="horizontal">
        <Label class="fas action-bar-drawer" text.decode="&#xf0c9;" width="10%" @tap="onDrawerButtonTap" />
        <Label class="action-bar-title" text="My location" width="77%" />
        <Label class="fas action-bar-drawer" text.decode="&#xf021;" width="13%" @tap="onRefreshTap" />
      </StackLayout>
    </ActionBar>

    <GridLayout class="page__content" rows="*">
      <transition appear mode="out-in" name="fade">
        <StackLayout v-if="!city" class="wrapper-home" row="0">
          <Label
            class="weather-text-city text-center bold"
            text="Tap refresh button to get info about your location." textWrap="true"></Label>
        </StackLayout>
        <StackLayout v-else class="wrapper-home" row="0">
          <Label
            :text="'Continent: ' + city.continent" class="weather-text-city text-center bold"
            textWrap="true"></Label>
          <Label
            :text="'Country: ' + city.countryName" class="weather-text-city text-center bold"
            textWrap="true"></Label>
          <Label
            :text="'Principal: ' + city.principalSubdivision" class="weather-text-city text-center bold"
            textWrap="true"></Label>
          <Label :text="'City: ' + city.city" class="weather-text-city text-center bold" textWrap="true"></Label>
          <Button class="btn btn-primary margin-top-5" text="Show weather in my location" @tap="getLocation" />
        </StackLayout>
      </transition>
    </GridLayout>
  </Page>
</template>

<script>
import * as Geolocation from '@nativescript/geolocation';
import * as utils from '~/shared/utils';
import Weather from './Weather';
import { SelectedPageService } from '~/shared/selected-page-service';
import { Http } from '@nativescript/core';

export default {
  components: {
    Weather: Weather,
  },
  data() {
    return {
      Weather: Weather,
      city: null,
    };
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onRefreshTap() {
      Geolocation.enableLocationRequest();
      Geolocation.getCurrentLocation({
        updateDistance: 0.1,
        timeout: 20000,
      }).then(
        (loc) => {
          if (loc) {
            Http.getJSON(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${ loc.latitude }&longitude=${ loc.longitude }&localityLanguage=en`).then(response => {
              console.log(response);
              this.city = response;
            }, error => {
              console.log(error);
            });
          }
        },
        function (e) {
          console.log('Error: ' + e.message);
        },
      );
    },
    getLocation() {
      this.$navigateTo(Weather, {
        transition: {
          name: 'slide',
          duration: 250,
          curve: 'easeIn',
        },
        props: {
          cityname: this.city.city,
        },
      });

    },
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage('Location');
    this.onRefreshTap();
  },
};
</script>
