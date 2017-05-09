import { Component, NgZone } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import firebase from 'firebase';


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  zone:NgZone;

  userData: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public push: Push, public alertCtrl: AlertController) {

    firebase.initializeApp({
      apiKey: "AIzaSyDaqZw9AkJWqU0oHQaH1BPtyDtMbnGpacU",
      authDomain: "capstone-1493490358184.firebaseapp.com",
      databaseURL: "https://capstone-1493490358184.firebaseio.com",
      storageBucket: "capstone-1493490358184.appspot.com",
      messagingSenderId: "8842581918"
    });

    this.zone = new NgZone({});

    let that = this;

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = 'login';
          unsubscribe();
        } else { 

          var isPolice = firebase.database().ref('userProfile/'+user.uid+'/police');

          isPolice.once('value', function(police) {
            if (police.val()) {
              that.rootPage = 'police';
              unsubscribe();
            } else {
              that.rootPage = 'HomePage';
              unsubscribe();
            }
          });

        }
      });     
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();
    });

  }

  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '8842581918'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

  
    
}