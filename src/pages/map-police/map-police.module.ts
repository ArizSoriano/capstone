import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPolice } from './map-police';

import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MapPolice,
  ],
  imports: [
    IonicPageModule.forChild(MapPolice),
  ],
  exports: [
    MapPolice
  ],
  providers: [
    GoogleMaps
  ]
})
export class MapPoliceModule {}
