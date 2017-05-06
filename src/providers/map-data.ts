import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import firebase from 'firebase';
import { Events } from 'ionic-angular';


/*
  Generated class for the MapData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MapData {
	private db: any;
	private mapcoorRef: any;
	private mapcoordinates$: any;

	private coordinatesRef: any;

 	constructor(private events: Events) {
		this.db = firebase.database().ref('/');
		this.mapcoorRef = firebase.database().ref('coordinates');
		this.mapcoorRef.on('child_added', this.handleData, this);
		this.mapcoordinates$ = new ReplaySubject();

		var user = firebase.auth().currentUser;
		var userEmail = user.email;

		this.coordinatesRef = firebase.database().ref('userProfile');
		this.coordinatesRef.on('value', function(userData) {
			var newData = userData.val();

			for (var key in newData) {
				if (key == user.uid) {
					var sendLatitude = newData[key].latitude;
					var sendLongitude = newData[key].longitude;
					events.publish('coordinates', sendLatitude, sendLongitude);
				}
			}	
		});
  	}
  	
  	get mapcoordinates() {
  		return this.mapcoordinates$;
  	}

  	handleData(coordinate) {
  		try {
  			this.mapcoordinates$.next(coordinate.val());
  		} catch(error) {
  			console.log('catching', error)
  		}
  	}
}
