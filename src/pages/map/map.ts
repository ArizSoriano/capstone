import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapData } from '../../providers/map-data';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

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

  constructor(private googleMaps: GoogleMaps, private platform: Platform, private geolocation: Geolocation, private navCtrl: NavController, private mapdata: MapData, private events: Events) {

    let that = this;
    
    var user = firebase.auth().currentUser;

    if (user) {
      this.userEmail = user.email;
    }

    firebase.database().ref('userProfile/'+user.uid+'/latitude').once('value').then(
      function(latitude) {
        console.log(latitude.val());
        that.latitude = latitude.val();
      });

    firebase.database().ref('userProfile/'+user.uid+'/longitude').once('value').then(
      function(longitude) {
        that.longitude = longitude.val();
      });

    events.subscribe('coordinates', (latitude, longitude) =>  {
      this.latitude = latitude;
      this.longitude = longitude;
      this.loadMap();
    }, (err) => {console.error(err);});

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