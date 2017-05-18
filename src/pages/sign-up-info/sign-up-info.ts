import { Component } from '@angular/core';
import {
  NavController, LoadingController,
  AlertController
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileData } from '../../providers/profile-data';
import { HandifyPage } from '../handify/handify';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Platform, ActionSheetController } from 'ionic-angular';
import firebase from 'firebase';
declare var window: any;

@Component({
  selector: 'page-sign-up-info',
  templateUrl: 'sign-up-info.html'
})
export class SignUpInfoPage {
  public profileInfoForm;
  public dateForm;
  public datepicker: string;
  public userProfile: any;
  public profilePic: any;
  public blob: any;
  public photoURL: any;
  public base64Image: string;
  public cameraSupported: boolean;

  loading: any;


  profileInfoInfo: { address: string, zip: string, city: string} = { address: '', zip: '', city: ''};
  dateInfo: { datepicker: string } = { datepicker: '' };

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public profileData: ProfileData, public alertCtrl: AlertController, 
  public loadingCtrl: LoadingController, public platform: Platform, public actionSheetCtrl: ActionSheetController, public camera: Camera, public crop: Crop) {

    this.profileInfoForm = this.formBuilder.group({
      'address': ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.pattern(/^[a-zÆØÅæøå0-9é ,.'-]+$/i)])],
      'zip': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[0-9]*$/)])],
      'city': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])],
    });

    this.dateForm = this.formBuilder.group({
      'datepicker': ['', Validators.compose([Validators.minLength(1), Validators.required])]
    });
    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });
  }

  isValid(field: string) {
    let formField = this.profileInfoForm.get(field);
    return formField.valid || formField.pristine;
  }

  testIsValid(field: string) {
    let formField = this.dateForm.get(field);
    return formField.valid || formField.pristine;
  }

  backToPreviousPage() {
    this.navCtrl.pop();
  }

  updateProfile() {
    console.log(this.profileInfoForm);
    console.log(this.profileInfoForm.city);
    console.log(this.profileInfoForm.address);
    console.log(this.profileInfoForm.zip);
    console.log(this.dateForm.datepicker);

    if (this.profileInfoForm.controls.city.dirty) {
      this.profileData.updateCity(this.profileInfoForm.city);
    }
    if (this.profileInfoForm.controls.address.dirty) {
      this.profileData.updateAddress(this.profileInfoForm.address);
    }

    if (this.profileInfoForm.controls.zip.dirty) {
      this.profileData.updateZip(this.profileInfoForm.zip);
    }

    if (this.dateForm.controls.datepicker.dirty) {
      this.profileData.updateDOB(this.dateForm.datepicker);
    }

    this.navCtrl.setRoot(HandifyPage);
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