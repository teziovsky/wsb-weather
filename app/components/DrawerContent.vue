<template lang="html">
  <GridLayout class="nt-drawer__content" rows="auto, *">
    <StackLayout class="nt-drawer__header" row="0">
      <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;" />
      <Label :text="email" class="nt-drawer__header-footnote" />
    </StackLayout>

    <ScrollView class="nt-drawer__body" row="1">
      <StackLayout>
        <GridLayout
          :class="'nt-drawer__list-item' + (selectedPage === 'Home' ? ' -selected': '')"
          columns="auto, *"
          @tap="onNavigationItemTap(Home)">
          <Label class="nt-icon fas" col="0" text.decode="&#xf015;" />
          <Label class="p-r-10" col="1" text="Home" />
        </GridLayout>

        <GridLayout
          :class="'nt-drawer__list-item' + (selectedPage === 'Location' ? ' -selected': '')"
          columns="auto, *"
          @tap="onNavigationItemTap(Location)">
          <Label class="nt-icon fas" col="0" text.decode="&#xf3c5;" />
          <Label class="p-r-10" col="1" text="Location" />
        </GridLayout>

        <GridLayout
          :class="'nt-drawer__list-item' + (selectedPage === 'List' ? ' -selected': '')"
          columns="auto, *"
          @tap="onNavigationItemTap(List)">
          <Label class="nt-icon fas" col="0" text.decode="&#xf03a;" />
          <Label class="p-r-10" col="1" text="List" />
        </GridLayout>

        <StackLayout class="hr" />

        <GridLayout
          :class="'nt-drawer__list-item' + (selectedPage === 'Logout' ? ' -selected': '')"
          columns="auto, *"
          @tap="onLogoutTap">
          <Label class="nt-icon fas" col="0" text.decode="&#xf2f5;" />
          <Label class="p-r-10" col="1" text="Logout" />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
import Home from './Home';
import LoginPage from './LoginPage';
import List from './List';
import Location from './Location';
import * as utils from '~/shared/utils';
import { SelectedPageService } from '~/shared/selected-page-service';

export default {
  mounted() {
    SelectedPageService.getInstance().selectedPage$
      .subscribe((selectedPage) => this.selectedPage = selectedPage);
  },
  data() {
    return {
      Home: Home,
      LoginPage: LoginPage,
      List: List,
      Location: Location,
      selectedPage: '',
    };
  },
  components: {
    Home,
    LoginPage,
    List,
    Location,
  },
  computed: {
    email() {
      return this.$store.state.email;
    },
  },
  methods: {
    onNavigationItemTap(component) {
      this.$navigateTo(component, {
        clearHistory: true,
      });
      utils.closeDrawer();
    },
    onLogoutTap() {
      this.$navigateTo(LoginPage, {
        clearHistory: true,
      });
      utils.closeDrawer();
    },
  },
};
</script>
