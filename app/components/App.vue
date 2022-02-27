<template lang="html">
  <RadSideDrawer ref="drawer" :drawerTransition="transition" drawerLocation="Left" gesturesEnabled="true">
    <StackLayout backgroundColor="#ffffff" ~drawerContent>
      <DrawerContent />
    </StackLayout>
    <Frame ref="drawerMainContent" ~mainContent>
      <LoginPage />
    </Frame>
  </RadSideDrawer>
</template>

<script>
import DrawerContent from './DrawerContent';
import LoginPage from './LoginPage';
import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';

export default {
  data() {
    return {
      transition: new SlideInOnTopTransition(),
    };
  },

  components: {
    DrawerContent,
    LoginPage,
  },
};
</script>
