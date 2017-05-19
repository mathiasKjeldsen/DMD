import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';
import { AccountSettingsPage } from '../account-settings/account-settings';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Platform, ActionSheetController } from 'ionic-angular';
import firebase from 'firebase';
declare var window: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  public profilePageForm;
  public profilePic: any;
  public blob: any;
  public photoURL: any;
  public base64Image: string;
  public cameraSupported: boolean;

  constructor(public navCtrl: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController, public formBuilder: FormBuilder,
    public platform: Platform, public actionSheetCtrl: ActionSheetController, public camera: Camera, public crop: Crop) {

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;

    });

    this.profilePageForm = this.formBuilder.group({
      'summary': ['', Validators.compose([Validators.minLength(1), Validators.required])],
    });



  }

  goToProfileSettingsTwo() {
    this.navCtrl.push(ProfileSettingsPage);
  }

  goToSettings() {
    this.navCtrl.push(AccountSettingsPage);
  }

  updateSummary(summary: string) {
    this.profileData.updateSummary(this.profilePageForm.summary).then(() => {
      let alert = this.alertCtrl.create({
        message: "Updated summary!",
        cssClass: 'alertcss',
        buttons: [
          {
            cssClass: "alertButtonNormal",
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    });
  }

  getPicture(fromCamera: boolean) {

    var self = this;
    let imageSource = (fromCamera ? this.camera.PictureSourceType.CAMERA :  this.camera.PictureSourceType.PHOTOLIBRARY);

     this.camera.getPicture({
      sourceType: imageSource,
      destinationType:  this.camera.DestinationType.FILE_URI,
      quality: 75,
      targetWidth: 300,
      targetHeight: 500,
      encodingType:  this.camera.EncodingType.JPEG,
      correctOrientation: true,
      allowEdit: false
    }).then((fileUri) => {
      //alert('got image path ' + fileUri);
      // convert picture to blob
      if (self.platform.is('android')) {
        // Modify fileUri format, may not always be necessary
        fileUri = 'file://' + fileUri;
      }
      /* Using cordova-plugin-crop starts here */
      return this.crop.crop(fileUri, { quality: 100 });
    }).then((_imagePath) => {
      //alert('got image path ' + _imagePath);
      // convert picture to blob
      return self.makeFileIntoBlob(_imagePath);
    }).then((_imageBlob) => {
      //alert('got image blob ' + _imageBlob);

      // upload the blob
      return self.uploadToFirebase(_imageBlob);
    }).then((_uploadSnapshot: any) => {
      //alert('file uploaded successfully  ' + _uploadSnapshot.downloadURL);

      // store reference to storage in database
      return self.saveToUserProfile(_uploadSnapshot);

    }).then(() => {
      //alert('User Saved  ');
      //load user with new data
      return self.userProfile;
    }, (error) => {
      let alert = self.alertCtrl.create({
        title: "Update profile image",
        message: error,
        cssClass: 'alertText',
        buttons: [
          {
            cssClass: 'alertButtonNormal',
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    });
  }

  makeFileIntoBlob(_imagePath) {

    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Failed file read: ' + e.toString());
            try {
              throw new Error('makeFileIntoBlob: ' + e);
            } catch (e) {
              reject(e);
            }
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  uploadToFirebase(_imageBlob) {
    var fileName = 'profilePhoto.jpg';

    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('userProfile').child('/' + this.userProfile.userId + '/' + fileName);

      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed', (_snapshot) => {
        console.log('snapshot progess ' + _snapshot);
      }, (_error) => {
        try {
          throw new Error('makeFileIntoBlob: ' + _error);
        } catch (e) {
          reject(e);
        }
      }, () => {
        // completion...
        resolve(uploadTask.snapshot);
      });
    });
  }

  saveToUserProfile(_uploadSnapshot) {
    this.photoURL = _uploadSnapshot.downloadURL;
    this.profileData.updatePhoto(this.photoURL);
  }

  profilePicActionSheet() {
    let profilePicSheet = this.actionSheetCtrl.create({
      title: 'Upload your Profile Picture',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Take a Picture',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            console.log('Take a Picture clicked');
            this.getPicture(true);
          }
        }, {
          text: 'Select from Gallery',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            console.log('Select from Gallery clicked');
            this.getPicture(false);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    profilePicSheet.present();
  }



}