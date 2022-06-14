import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user';
import * as firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Role } from '../shared/models/role';

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
    public fireStore: AngularFirestore
  ) {
    this.user = auth.user;
  }

  loginWhithEmail(val: any) {
    debugger;
    return this.auth.signInWithEmailAndPassword(val.email, val.password);
  }

  async loginWhithEmail2(val: any) {
    try {
      const user = await this.auth.signInWithEmailAndPassword(
        val.email,
        val.password
      );
      debugger;
      return user;
    } catch (e) {
      debugger;
      return null;
    }
  }

  signup(val: any) {
    debugger;
    return this.auth.createUserWithEmailAndPassword(val.email, val.password);
  }

  async signup2(val: any) {
    try {
      const user = await this.auth.createUserWithEmailAndPassword(
        val.email,
        val.password
      );
      user.user.sendEmailVerification();

      return user;
    } catch (e) {
      return null;
    }
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

  getDetails2(val: any) {
    debugger;
    return this.fireStore
      .collection('users')
      .doc(val.uid)
      .valueChanges()
      .pipe(
        map((user: any) => {
          if (user) {
            console.log(user);

            localStorage.setItem('loggedIn', user.token);
            this.currentUserSource.next(user);
          }
        })
      );
  }

  async presentAlertMultipleButtons(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  loginWithGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider());
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
}
