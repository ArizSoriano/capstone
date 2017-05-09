import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the Police page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name: 'police'
})
@Component({
  selector: 'page-police',
  templateUrl: 'police.html',
})
export class Police {

	
  db: any;
  alertsRef: any;

  alertList: any;
  completeUserList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

  	this.alertList = [];
  	this.completeUserList = [];

  	var that = this;
  		
  	this.alertsRef = firebase.database().ref('userProfile');
  	
  	this.alertsRef.on('value', function(userData) {
      var newData = userData.val();
      var dataList = [];

      for (var key in newData) {
        if(newData[key].reported) {
        	dataList.push(newData[key]);
        }
      }
      that.completeUserList = newData;
      that.alertList = dataList;
    });
  }

  viewMap(object) {
  	if(object.policeConfirmed) {
  		this.navCtrl.push('policemap', {
			data: object
	    });
  	} else {
	    let alert = this.alertCtrl.create({
	      title: 'Respond',
	      message: 'Respond to this alert now?',
	      buttons: [
	        {
	          text: 'Cancel',
	          role: 'cancel'
	        },
	        {
	          text: 'Respond',
	          handler: () => {
	          	this.changeRespond(object.email);
	          	this.navCtrl.push('policemap', {
	          		data: object
	          	});
	          }
	        }
	      ]
	    });
	    alert.present();
  	}

  }

  changeRespond(email) {
  	var that = this;
	for(var key in this.completeUserList) {
		if(this.completeUserList[key].email == email) {
			var userLink = firebase.database().ref('userProfile/'+key);
			userLink.update({'policeConfirmed': true});
		}
  	}
  }

}
