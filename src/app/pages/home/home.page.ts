import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hasVerifiedEmail: boolean = true;
  reCaptureVerifier: any;
  mobileNumber: any;
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) this.hasVerifiedEmail = user.emailVerified;
      console.log(user.emailVerified);
    });
  }

  ngOnInit() {}
}
