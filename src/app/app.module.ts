import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { HandifyPage } from '../pages/handify/handify';
import { AdditionalInfoPage } from '../pages/additional-info/additional-info';
import { AdditionalInfoTwoPage } from '../pages/additional-info-two/additional-info-two';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

import { AuthData } from '../providers/auth-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    HandifyPage,
    AdditionalInfoPage,
    AdditionalInfoTwoPage,
    ResetPasswordPage,
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
    AdditionalInfoPage,
    AdditionalInfoTwoPage,
    ResetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthData,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
