import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Police } from './police';

@NgModule({
  declarations: [
    Police,
  ],
  imports: [
    IonicPageModule.forChild(Police),
  ],
  exports: [
    Police
  ]
})
export class PoliceModule {}
