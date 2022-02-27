<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <StackLayout orientation="horizontal">
        <Label class="fas action-bar-drawer" text.decode="&#xf0c9;" width="10%" @tap="onDrawerButtonTap" />
        <Label class="action-bar-title" colSpan="2" text="List of cities" width="80%" />
        <Label class="fas action-bar-drawer" text.decode="" width="10%" />
      </StackLayout>
    </ActionBar>

    <GridLayout class="page__content" rows="auto,*">
      <StackLayout row="0">
        <TextField v-model="searchQuery" class="search-bar" hint="Search your city..." textFieldHintColor="white" />
      </StackLayout>
      <StackLayout row="1">
        <ListView for="city in filteredCities" @itemTap="onCityTap($event.item.attributes.CITY_NAME)">
          <v-template>
            <Label :text="city.attributes.CITY_NAME" class="city" />
          </v-template>
        </ListView>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import { Http } from '@nativescript/core';
import * as utils from '~/shared/utils';
import { SelectedPageService } from '~/shared/selected-page-service';
import Weather from '~/components/Weather';

export default {
  data() {
    return {
      cities: [],
      searchVisible: false,
      searchQuery: '',
    };
  },
  computed: {
    filteredCities() {
      return this.cities.filter(item => item.attributes.CITY_NAME.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    onCityTap(value) {
      this.$navigateTo(Weather, {
        transition: {
          name: 'slide',
          duration: 250,
          curve: 'easeIn',
        },
        props: {
          cityname: value,
        },
      });
    },
    getCities() {
      Http.getJSON('https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0/query?where=POP%20%3E%3D%2010000%20AND%20POP%20%3C%3D%2010000000&outFields=CITY_NAME,POP&outSR=4326&f=json').then(response => {
        this.cities = response.features.sort((a, b) => a.attributes.CITY_NAME.localeCompare(b.attributes.CITY_NAME));
      }, error => {
        console.log(error);
      });
    },
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage('List');
  },
  created() {
    this.getCities();
  },
};
</script>
