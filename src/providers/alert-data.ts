import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

/*
  Generated class for the AlertData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertData {
	
	private db: any;
	private alertsRef: any;
	
  constructor(private events: Events) {
		this.db = firebase.database().ref('/');

		var user = firebase.auth().currentUser;
		
		this.alertsRef = firebase.database().ref('userProfile');
		this.alertsRef.on('value', function(userData) {
			var newData = userData.val();
			
			for (var key in newData) {
				if (key == user.uid) {
					var alertValue = newData[key].alert;
					var latitude = newData[key].latitude;
					var longitude = newData[key].longitude;

					events.publish('alerts', alertValue, latitude, longitude);
				}
			}	
		});
  }

}
