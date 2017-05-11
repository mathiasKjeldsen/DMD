import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { HandifyPage } from '../pages/handify/handify';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ProfilePage } from '../pages/profile/profile';
import { LogOutPage } from '../pages/log-out/log-out';
import { ProfileSettingsPage } from '../pages/profile-settings/profile-settings';
import { ProfileSettingsTwoPage } from '../pages/profile-settings-two/profile-settings-two';
import { CalendarPage } from '../pages/calendar/calendar';

import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';

import { Facebook } from '@ionic-native/facebook';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    HandifyPage,
    ResetPasswordPage,
    ProfilePage,
    LogOutPage,
    ProfileSettingsPage,
    ProfileSettingsTwoPage,
    CalendarPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    HandifyPage,
    ResetPasswordPage,
    ProfilePage,
    LogOutPage,
    ProfileSettingsPage,
    ProfileSettingsTwoPage,
    CalendarPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthData,
    ProfileData,
    Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
