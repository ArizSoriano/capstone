import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the Alert page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'alertAuthorities'
})
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class Alert {
  
  alertsRef: any;
  db: any;

  reported: any;
  policeConfirmed: any;

  updateRef: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  	this.db = firebase.database().ref('/');

    var user = firebase.auth().currentUser;
    
    var that = this;

    this.updateRef = firebase.database().ref('userProfile/'+user.uid);

    this.alertsRef = firebase.database().ref('userProfile');
    this.alertsRef.on('value', function(userData) {
      var newData = userData.val();
      
      for (var key in newData) {
        if (key == user.uid) {
          that.reported = newData[key].reported;
          that.policeConfirmed = newData[key].policeConfirmed;
        }
      } 
    });

  }

  	report(): void {
  		let alert = this.alertCtrl.create({
		    title: 'Report Success',
		    subTitle: 'Your report was sent.',
		    buttons: ['Ok']
	  	});
	  	alert.present();

	  	this.updateRef.update({'reported':true});

	}

	cancelReport(): void {
		let alert = this.alertCtrl.create({
	    title: 'Cancel Report',
	    message: 'Do you want to cancel the report?',
	    buttons: [
	      {
	        text: 'Go back',
	        role: 'cancel'
	      },
	      {
	        text: 'Cancel Report',
	        handler: () => {
	        	this.updateRef.update({'reported':false});
	        	this.navCtrl.pop()
	        }
	      }
	    ]
	  });
	  alert.present();
	
	}


}
