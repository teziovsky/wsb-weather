<template>
  <Page>
    <ActionBar :title="isLoggingIn ? 'Login' : 'Sign up'"></ActionBar>
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/assets/images/logo_wsb.png" />
        <Label class="header" text="WSB weather" />

        <StackLayout class="input-field" marginBottom="25">
          <TextField
            v-model="user.email"
            autocapitalizationType="none"
            autocorrect="false"
            class="input"
            fontSize="18"
            hint="Email"
            keyboardType="email"
            returnKeyType="next"
            @returnPress="focusPassword"
          />
          <StackLayout class="hr-light" />
        </StackLayout>

        <StackLayout class="input-field" marginBottom="25">
          <TextField
            ref="password"
            v-model="user.password"
            :returnKeyType="isLoggingIn ? 'done' : 'next'"
            class="input"
            fontSize="18"
            hint="Password"
            secure="true"
            @returnPress="focusConfirmPassword"
          />
          <StackLayout class="hr-light" />
        </StackLayout>

        <StackLayout v-show="!isLoggingIn" class="input-field">
          <TextField
            ref="confirmPassword"
            v-model="user.confirmPassword"
            class="input"
            fontSize="18"
            hint="Confirm password"
            returnKeyType="done"
            secure="true"
          />
          <StackLayout class="hr-light" />
        </StackLayout>

        <Button
          :text="isLoggingIn ? 'Log In' : 'Sign Up'"
          class="btn btn-primary m-t-20"
          @tap="submit"
        />
        <Label
          v-show="isLoggingIn"
          class="login-label"
          text="Forgot your password?"
          @tap="forgotPassword"
        />
      </StackLayout>

      <Label class="login-label sign-up-label" @tap="toggleForm">
        <FormattedString>
          <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'" />
          <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold" />
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>
<script>
import Home from './Home';
import { firebase } from '@nativescript/firebase';

const userService = {
  async register(user) {
    return await firebase.createUser({
      email: user.email,
      password: user.password,
    });
  },
  async login(user) {
    return await firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password,
      },
    });
  },
  async resetPassword(email) {
    return await firebase.sendPasswordResetEmail(email);
  },
};

export default {
  components: {
    Home,
  },
  data() {
    return {
      isLoggingIn: true,
      user: {
        email: 'wsbweather@wsb.pl',
        password: 'wsbweather123',
        confirmPassword: '',
      },
      Home: Home,
    };
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    },
    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert('Please provide both an email address and password.');
        return;
      }
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },
    login() {
      userService
        .login(this.user)
        .then(() => {
          this.$store.commit('setEmail', this.user.email);
          this.$navigateTo(Home, {
            clearHistory: true,
          });
        })
        .catch(() => {
          this.alert('Unfortunately we could not find your account.');
        });
    },
    register() {
      const validator = require('email-validator');
      if (!validator.validate(this.user.email)) {
        this.alert('Please enter a valid email address.');
        return;
      }
      if (this.user.password !== this.user.confirmPassword) {
        this.alert('Your passwords do not match.');
        return;
      }
      userService
        .register(this.user)
        .then(() => {
          this.alert('Your account was successfully created.');
          this.isLoggingIn = true;
        })
        .catch(() => {
          this.alert('Unfortunately we were unable to create your account.');
        });
    },
    forgotPassword() {
      prompt({
        title: 'Forgot Password',
        message:
          'Enter the email address you used to register for WSB weather app to reset your password.',
        inputType: 'email',
        defaultText: '',
        okButtonText: 'Ok',
        cancelButtonText: 'Cancel',
      }).then((data) => {
        if (data.result) {
          userService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                'Your password was successfully reset. Please check your email for instructions on choosing a new password.',
              );
            })
            .catch(() => {
              this.alert('Unfortunately, an error occurred resetting your password.');
            });
        }
      });
    },
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },
    alert(message) {
      return alert({
        title: 'WSB weather app',
        okButtonText: 'OK',
        message: message,
      });
    },
  },
};
</script>
