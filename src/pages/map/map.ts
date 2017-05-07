import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
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

@IonicPage({
  name: 'map'
})

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {
  map: any;

  latitude: any;
  longitude: any;
  userEmail = '';


  alertsRef: any;
  db: any;

  constructor(private googleMaps: GoogleMaps, private platform: Platform, private navCtrl: NavController, private events: Events) {
    this.db = firebase.database().ref('/');

    var user = firebase.auth().currentUser;
    
    var that = this;

    this.alertsRef = firebase.database().ref('userProfile');
    this.alertsRef.on('value', function(userData) {
      var newData = userData.val();
      
      for (var key in newData) {
        if (key == user.uid) {
          that.latitude = parseFloat(newData[key].latitude);
          that.longitude = parseFloat(newData[key].longitude);
          that.loadMap();
        }
      } 
    });

  }

    ngAfterViewInit() {
     this.loadMap();
    }

    loadMap() {
         let location = new LatLng(this.latitude, this.longitude);
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
             'zoom': 20
           }
         });

        map.clear()

        map.setCenter(location);
        
        let markerOptions: MarkerOptions = {
          position: location,
          title: 'My Location'
        };

        const marker: any = map.addMarker(markerOptions).then((marker: Marker) => {
          marker.showInfoWindow();
        });

        const circle: any = map.addCircle({
          'center' : location,
          'radius' : 6,
          'strokeColor' : '#abd6f4',
          'strokeWidth': 1,
          'fillColor' : '#abd6f4',
          'zIndex' : 1
        });



        map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
           console.log('Map is ready!');
        });

    }

  
  

}