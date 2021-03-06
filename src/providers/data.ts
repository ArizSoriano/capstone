import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Events } from 'ionic-angular';


/*
  Generated class for the MapData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {
	private db: any;

	private dataRef: any;

 	constructor(private events: Events) {
		this.db = firebase.database().ref('/');

		var user = firebase.auth().currentUser;

		this.dataRef = firebase.database().ref('userProfile');
		this.dataRef.on('value', function(userData) {
			var newData = userData.val();
			
			for (var key in newData) {
				if (key == user.uid) {
					var sendLatitude = newData[key].latitude;
					var sendLongitude = newData[key].longitude;
					var sendAlert = newData[key].alert;
					var sendSafe = newData[key].safe;

					events.publish('data', sendAlert, sendLatitude, sendLongitude);
				}
			}	
		});
  	}
}
