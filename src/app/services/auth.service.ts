import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user';
import * as firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  ApplicationVerifier,
} from '@angular/fire/auth';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSource = new BehaviorSubject<User>(null);
  currentUser$ = this.currentUserSource.asObservable();
  // this.auth.signInWithPopup( new firebase.default.auth.GoogleAuthProvider());
  user: Observable<firebase.default.User>;

  constructor(
    private auth: AngularFireAuth,
    public alertController: AlertController,
    public fireStore: AngularFirestore,
    private database: AngularFireDatabase // private database: Database
  ) {
    this.user = auth.user;
  }

  loginWhithEmail(val: any) {
    debugger;
    return this.auth.signInWithEmailAndPassword(val.email, val.password);
  }

  signup(val: any) {
    debugger;
    return this.auth.createUserWithEmailAndPassword(val.email, val.password);
  }

  async saveDetails(val: User) {
    debugger;

    return await this.fireStore.collection('users').doc(val.uid).set({
      uid: val.uid,
      email: val.email,
      name: val.name,
      password: val.password,
      phone: val.phone,
      organizationCode: val.organizationCode,
      employeeNumber: val.employeeNumber,
      isDataComplete: val.isDataComplete,
      roleId: val.roleId,
    });
  }

  updateData(val: any) {
    debugger;
    return this.fireStore.collection('users').doc(val.uid).update(val);
  }

  getDetails(val: any) {
    debugger;
    return this.fireStore.collection('users').doc(val.uid).valueChanges();
  }

  logout() {
    return this.auth.signOut();
  }

  sendEmailVerification(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        alert(err.message);
        console.log(err);
      }
    );
  }
  login(val: any): Observable<User> {
    debugger;
    return new Observable<any>((observable) => {
      debugger;
      this.auth
        .setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
        .then(() => {
          this.auth
            .signInWithEmailAndPassword(val.email, val.password)
            .then((fireBaseUser: firebase.default.auth.UserCredential) => {
              debugger;
              observable.next({ email: val.email, password: val.password });
              console.log('success');
              observable.complete();
            });
        })
        .catch((err) => {
          debugger;
          observable.error(err);
          observable.complete();
        });
    });
  }

  async alertPopupMessage(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Palmera Systems',
      subHeader: '',
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  loginWithGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider());
  }

  loginWithFacebook() {
    return this.auth.signInWithPopup(new FacebookAuthProvider());
  }

  getRoles(): Observable<any[]> {
    return this.fireStore.collection('roles').valueChanges();
  }

  mappingUserEntity(val: any): User {
    let user = new User(
      val.uid,
      val.email,
      val.displayName,
      val.password,
      val.phone,
      val.organizationCode,
      val.employeeNumber,
      val.isDataComplete,
      val.roleId
    );
    return user;
  }

  // ==========================
  // ============ RealTime Database
  // ==========================

  insertUser(val: any) {
    return this.database.object(`users/${val.uid}`).set({
      uid: val.uid,
      email: val.email,
      name: val.name,
      password: val.password,
      phone: val.phone,
      organizationCode: val.organizationCode,
      employeeNumber: val.employeeNumber,
      isDataComplete: val.isDataComplete,
      roleId: val.roleId,
    });
  }

  updateUserData(val: any) {
    debugger;
    return this.database.object(`users/${val.uid}`).update(val);
  }

  async getAllUsers() {
    return new Promise((resolve, reject) => {
      this.database
        .list('users')
        .valueChanges()
        .subscribe((value) => {
          resolve(value);
        });
    });
  }

  getUserDetails(val: any) {
    return new Promise((resolve, reject) => {
      this.database
        .object(`users/${val.uid}`)
        .valueChanges()
        .subscribe((userData) => {
          resolve(userData);
        });
    });
  }

  signInWithPhoneNumber(
    mobileNumber: string,
    reCaptureVerifier: ApplicationVerifier
  ) {
    //fetch promise
    return firebase.default
      .auth()
      .signInWithPhoneNumber(mobileNumber, reCaptureVerifier);
  }
}
