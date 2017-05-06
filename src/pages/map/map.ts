import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
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

  constructor(private googleMaps: GoogleMaps, private platform: Platform, private navCtrl: NavController, private mapdata: MapData, private events: Events) {

    //let that = this;
    
    var user = firebase.auth().currentUser;

    if (user) {
      this.userEmail = user.email;
    }

    //this.mapdata.mapcoordinates.subscribe((data) => {
    //  if (this.userEmail == data.email) {
    //    that.latitude = data.latitude;
    //    that.longitude = data.longitude;
    //    that.loadMap();
    //  }
    //}, (err) => {console.error(err);});

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