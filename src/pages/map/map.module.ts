import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';

import { GoogleMaps } from '@ionic-native/google-maps';
import { MapData } from '../../providers/map-data';


@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
  ],
  exports: [
    MapPage
  ],
  providers: [
    GoogleMaps,
    MapData
  ]
})
export class MapModule {}
