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

	signupUser(email: string, password: string, latitude: string, longitude: string, alert: boolean, police: boolean, policeConfirmed: boolean, reported: boolean, sensorDisabled: boolean): firebase.Promise<any> {
	    return firebase.auth().createUserWithEmailAndPassword(email, password)
	    .then( newUser => {
	        firebase.database().ref('/userProfile').child(newUser.uid)
	        .set({ 
	        	email: email,
	        	latitude: latitude,
	        	longitude: longitude,
	        	alert: alert,
	        	police: police,
	        	policeConfirmed: policeConfirmed,
	        	reported: reported,
	        	sensorDisabled: sensorDisabled
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
