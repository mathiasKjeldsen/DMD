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
import { SignUpInfoPage } from '../pages/sign-up-info/sign-up-info';
import { ProfileSettingsPage } from '../pages/profile-settings/profile-settings';
import { CalendarPage } from '../pages/calendar/calendar';
import { ManageHelpersPage } from '../pages/manage-helpers/manage-helpers';
import { AccountSettingsPage } from '../pages/account-settings/account-settings';
import { MyCoordinatorPage } from '../pages/my-coordinator/my-coordinator';
import { CalendarNewEventPage } from '../pages/calendar-new-event/calendar-new-event';
import { CalendarEditEventPage } from '../pages/calendar-edit-event/calendar-edit-event';
import { AboutPage } from '../pages/about/about';

import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';
import { EventProvider } from '../providers/events';
import { CalendarData } from '../providers/calendar-data';

import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

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
    SignUpInfoPage,
    CalendarPage,
    ManageHelpersPage,
    AccountSettingsPage,
    MyCoordinatorPage,
    CalendarNewEventPage,
    CalendarEditEventPage, 
    AboutPage
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
    SignUpInfoPage,
    CalendarPage,
    ManageHelpersPage,
    AccountSettingsPage,
    MyCoordinatorPage,
    CalendarNewEventPage,
    CalendarEditEventPage, 
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthData,
    ProfileData,
    EventProvider,
    CalendarData,
    Camera,
    Crop,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
