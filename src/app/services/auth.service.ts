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

  async saveDetails(val: any) {
    debugger;

    return await this.fireStore
      .collection('users')
      .doc(val.uid)
      .set({
        uid: val.uid !== undefined ? val.uid : '',
        email: val.email !== undefined ? val.email : '',
        name: val.name !== undefined ? val.name : '',
        password: val.password !== undefined ? val.password : '',
        phone: val.phone !== undefined ? val.phone : '',
        organizationCode:
          val.organizationCode !== undefined ? val.organizationCode : '',
        employeeNumber:
          val.employeeNumber !== undefined ? val.employeeNumber : 0,
        roleId: val.roleId !== undefined ? val.roleId : '',
      });
  }

  updateData(val: any) {
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
      val.uid !== undefined ? val.uid : '',
      val.email !== undefined ? val.email : '',
      val.displayName !== undefined ? val.displayName : '',
      val.password !== undefined ? val.password : '',
      val.phone !== undefined ? val.phone : '',

      val.organizationCode !== undefined ? val.organizationCode : '',

      val.employeeNumber !== undefined ? val.employeeNumber : 0,
      val.roleId !== undefined ? val.roleId : ''
    );

    return user;
  }
}
