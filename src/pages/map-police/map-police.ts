import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import firebase from 'firebase';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

/**
 * Generated class for the MapPolice page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name: 'policemap'
})
@Component({
  selector: 'page-map-police',
  templateUrl: 'map-police.html',
})
export class MapPolice {
	
  public userData: any;

  userLat: any;
  userLong: any;
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, private googleMaps: GoogleMaps) {
  	this.userData = navParams.get('data');
  	console.log(this.userData);

  	let that = this;

  	firebase.database().ref('userProfile').on('value',
	  function(userData) {
	  	var getData = userData.val();
	  	for (var key in getData) {
	  		if(getData[key].email == that.userData.email) {
	  			//that.userId = key;
	  			var lat = getData[key].latitude;
	  			var long = getData[key].longitude;

	  			events.publish('userCoordinates', lat, long);
	  		}
	  	}
	  });

	  events.subscribe('userCoordinates', (lat, long) => {
	  	this.userLat = lat;
	  	this.userLong = long;
	  	this.loadMap();
	  }, (err) => { console.error(err); });

	 //firebase.database().ref('userProfile')
  }

  loadMap() {
         let location = new LatLng(this.userLat, this.userLong);
         let element: HTMLElement = document.getElementById('map');

         let map: GoogleMap = this.googleMaps.create(element, {
           'backgroundColor': 'white',
           'controls': {
             'compass': true,
             'myLocationButton': true,
             'indoorPicker': true,
             'zoom': true
           },
           'gestures': {
             'scroll': true,
             'rotate': true,
             'zoom': true
           },
           'camera': {
             'latLng': location,
             'zoom': 18
           }
         });

        map.clear();
        map.setCenter(location);

        let markerOptions: MarkerOptions = {
          position: location,
          title: 'My Location',
          'icon': {
              'url': 'http://meridianapps.com/images/icon_bludot@2x.png',
              'size': {
                  width: 60,
                  height: 60
               }
          },
        };

        map.addMarker(markerOptions).then((marker: Marker) => {
          marker.showInfoWindow();
        });

        map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
           console.log('Map is ready!');
        });

    }

}
