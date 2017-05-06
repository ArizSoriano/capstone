import { Component } from '@angular/core';
import { NavController, IonicPage, Loading } from 'ionic-angular';
import { Auth } from './../../providers/auth';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public loading:Loading;

  constructor(private nav: NavController, private auth: Auth) {

  }
 
  public logout() {
    this.auth.logoutUser().then( () => {
        this.nav.setRoot('login');
        this.nav.push('login')
    });
  }

  goToMap(): void { this.nav.push('map'); }

}