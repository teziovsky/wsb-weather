<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <StackLayout orientation="horizontal">
        <Label class="fas action-bar-drawer" text.decode="&#xf0c9;" width="10%" @tap="onDrawerButtonTap" />
        <Label class="action-bar-title" colSpan="2" text="Home" width="80%" />
        <Label class="fas action-bar-drawer" text.decode="" width="10%" />
      </StackLayout>
    </ActionBar>

    <GridLayout class="page__content" rows="*">
      <StackLayout class="wrapper-home" row="0">
        <Image class="logo" rowSpan="2" src="~/assets/images/logo_wsb.png" />
        <Label
          class="page__content-placeholder" horizontalAlignment="center" row="1"
          text="Welcome in WSB Weather application!" />
        <Label
          class="page__content-placeholder" horizontalAlignment="center" row="2"
          text="Click on menu drawer icon and explore" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from '~/shared/utils';
import { SelectedPageService } from '~/shared/selected-page-service';

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage('Home');
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
  },
};
</script>
