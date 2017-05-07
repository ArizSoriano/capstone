import { Component } from '@angular/core';
import { NavController, IonicPage, Loading, AlertController } from 'ionic-angular';
import { Auth } from './../../providers/auth';
import { Events } from 'ionic-angular';
import { Data } from '../../providers/data';
import firebase from 'firebase';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public loading:Loading;

  alertValue: any;
  sensorDisabled: any;

  db: any;
  alertsRef: any;
  updateRef: any;

  constructor(private nav: NavController, private auth: Auth, private events: Events, private alertCtrl: AlertController) {
    this.db = firebase.database().ref('/');

    var user = firebase.auth().currentUser;
    
    var that = this;

    this.updateRef = firebase.database().ref('userProfile/'+user.uid);

    this.alertsRef = firebase.database().ref('userProfile');
    this.alertsRef.on('value', function(userData) {
      var newData = userData.val();
      
      for (var key in newData) {
        if (key == user.uid) {
          that.alertValue = newData[key].alert;
          that.sensorDisabled = newData[key].sensorDisabled;
        }
      } 
    });

  }
 
  public logout() {
    this.auth.logoutUser().then( () => {
        this.nav.setRoot('login');
        this.nav.push('login')
    });
  }

  alertAuthorities(): void { this.nav.push('alertAuthorities'); }

  goToMap(): void { this.nav.push('map'); }

  disableSensor(): void {
    let alert = this.alertCtrl.create({
      title: 'Disable Sensor',
      message: 'Disable sensor now?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Disable',
          handler: () => {
             this.updateRef.update({'sensorDisabled':true});
             this.updateRef.update({'alert':false});
          }
        }
      ]
    });
    alert.present();
  
  }


  enableSensor(): void {
    let alert = this.alertCtrl.create({
        title: 'Enable Sensor',
        subTitle: 'Sensor is now enabled.',
        buttons: ['Ok']
      });
      alert.present();

      this.updateRef.update({'sensorDisabled':false});
  }


  reportSafe(): void {
    let alert = this.alertCtrl.create({
      title: 'Report Safe',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.updateRef.update({'alert':false});
          }
        }
      ]
    });
    alert.present();
  
  }

}
