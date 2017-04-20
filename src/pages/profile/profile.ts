import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
public profileData: any;


public cityForm;

  userInfo: { city: string } = { city: ' ' };

  constructor(public navCtrl: NavController, public profileDataA: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
    this.navCtrl = navCtrl;
    this.profileData = profileDataA;

    this.cityForm = this.formBuilder.group ({

      'city': ['', Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern(/^[a-zÆØÅæøå ,.'-]+$/i)])]

    });


    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }

  updateCityButton() {
          this.profileData.updateCity(this.cityForm.city);
  }

updateEmail(): void {
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newEmail',
        placeholder: 'Your new email',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateEmail(data.newEmail);
        }
      }
    ]
  });
  alert.present();
}

//updatePass virker ikke :O
updatePassword(){
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newPassword',
        placeholder: 'Your new password',
        type: 'password'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updatePassword(data.newPassword);
        }
      }
    ]
  });
  alert.present();
}

  updateDOB(birthDate): void {
  this.profileData.updateDOB(birthDate);
}

updateName(): void {
  let alert = this.alertCtrl.create({
    message: "Your first name & last name",
    inputs: [
      {
        name: 'firstName',
        placeholder: 'Your first name',
        value: this.userProfile.firstName
      },
      {
        name: 'lastName',
        placeholder: 'Your last name',
        value: this.userProfile.lastName
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateName(data.firstName, data.lastName);
        }
      }
    ]
  });
  alert.present();
}

updateAddress(): void {
  let alert = this.alertCtrl.create({
    message: "Address",
    inputs: [
      {
        name: 'address',
        placeholder: 'address',
        value: this.userProfile.address
      },
        ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateAddress(data.address);
        }
      }
    ]
  });
  alert.present();
}

updateZip(): void {
  let alert = this.alertCtrl.create({
    message: "zip",
    inputs: [
      {
        name: 'zip',
        placeholder: 'zip',
        value: this.userProfile.zip
      },
     
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateZip(data.zip);
        }
      }
    ]
  });
  alert.present();
}

updateCity(): void {
  let alert = this.alertCtrl.create({
    message: "Cityasd",
    inputs: [
      {
        name: 'city',
        placeholder: 'cityqq',
        value: this.userProfile.city
      },
     
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateCity(data.city);
        }
      }
    ]
  });
  alert.present();
}

updateCountry(): void {
  let alert = this.alertCtrl.create({
    message: "country",
    inputs: [
      {
        name: 'country',
        placeholder: 'country',
        value: this.userProfile.country
      },
     
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateCountry(data.country);
        }
      }
    ]
  });
  alert.present();
}

}