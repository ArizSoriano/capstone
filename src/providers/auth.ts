import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';


/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  	loginUser(email: string, password: string): firebase.Promise<any> {
	    return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	signupUser(email: string, password: string, latitude: number, longitude: number, alert: boolean, safe: boolean): firebase.Promise<any> {
	    return firebase.auth().createUserWithEmailAndPassword(email, password)
	    .then( newUser => {
	        firebase.database().ref('/userProfile').child(newUser.uid)
	        .set({ 
	        	email: email,
	        	latitude: latitude,
	        	longitude: longitude,
	        	alert: alert,
	        	safe: safe
	        });
	  });
	}

	resetPassword(email: string): firebase.Promise<void> {
	  	return firebase.auth().sendPasswordResetEmail(email);
	}

	logoutUser(): firebase.Promise<void> {
	  	return firebase.auth().signOut();
	}

}
