import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import * as firebase from "firebase/app";
import { switchMap, first, take, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  constructor(private AFauth: AngularFireAuth, private router: Router,private google: GooglePlus,private platform: Platform, private db: AngularFirestore) {

    async sendVerificationEmail(): Promise<void>{
      return (await this.AFauth.currentUser).sendEmailVerification();
    }

    AFauth.authState.subscribe(usuario => (this.isLogged =usuario));
   }

   async onLogin (usuario: User){
    try{
      return await this.AFauth.signInWithEmailAndPassword(usuario.email, usuario.password);

    }catch (error){
       console.log('Error del Login', error);
     
    }
  }
  registrarUsuario(usuario: User){
    const refContacto = this.db.collection("usuario");

    if (usuario.uid == null ){
      usuario.uid = this.db.createId();
      
    }
    refContacto.doc(usuario.uid).set(Object.assign({}, usuario), {merge: true})
  }

  getUsuarios(): Observable<any[]>{
    return this.db.collection("usuario").valueChanges();
  }

  
  login(email: string, passwd: string){
    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, passwd).then(user => {
        resolve(user);
      }).catch(err => {
        rejected(err);
      });
    });
  }

  logout(){
    this.AFauth.signOut().then(() => {
      this.google.disconnect();
      this.router.navigate(['inicio']);
    });
  }

  loginwithgoogle(){
    return this.google.login({}).then(res => {
      // tslint:disable-next-line: variable-name
      const user_data_google = res;
      return this.AFauth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken));
    });
  }

  async googleLogin() {
    if (this.platform.is("cordova")) {
      return await this.nativeGoogleLogin();
    } else {
      return await this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser: any = await this.google.login({
        webClientId: environment.googleWebClientId,
        offline: true
      });
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken);
      const firebaseUser = await firebase.auth().signInWithCredential(googleCredential);
      return await this.updateUserData(firebaseUser, "google");
    } catch (err) {
      console.error("Error Login google - native" + JSON.stringify(err));
      return err;
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.AFauth.signInWithPopup(provider);
      return await this.updateUserData(credential.user, "google");
    } catch (err) {
      console.error("Error Login google - web" + JSON.stringify(err));
      return err;
    } 
  }

  register(email: string, password: string, name: string, rol:number ){
    return new Promise ((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res => {
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          name: name,
          rol:rol,
          uid: uid
        });
        resolve(res);
      }).catch(error => reject(error));
    });
  }

  resetpassword(email: string){
    return this.AFauth.sendPasswordResetEmail(email);
  }

  getUserAuth(){
    return this.AFauth.authState;
  }

}


  





