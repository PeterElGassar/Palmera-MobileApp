import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user';
import * as firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = '';
  private currentUserSource = new BehaviorSubject<User>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth
  ) {}

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

      return user;
    } catch (e) {
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

  saveDetails(val: any) {
    return this.fireStore.collection('users').doc(val.uid).set(val);
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
  // login(_email: string, _password: string): Observable<User> {
  //   debugger;
  //   return new Observable<any>((observable) => {
  //     debugger;
  //     this.auth
  //       .setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
  //       .then(() => {
  //         this.auth
  //           .signInWithEmailAndPassword(_email, _password)
  //           .then((fireBaseUser: firebase.default.auth.UserCredential) => {
  //             debugger;
  //             observable.next({ email: _email, password: _password });
  //             console.log('success');
  //             observable.complete();
  //           });
  //       })
  //       .catch((err) => {
  //         debugger;
  //         observable.error(err);
  //         observable.complete();
  //       });
  //   });
  // }

  // localStorage.setItem("token",user.token);
  // this.currentUserSource.next(user);

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
}
