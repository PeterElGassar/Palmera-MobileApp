import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.page.html',
  styleUrls: ['./otp-verification.page.scss'],
})
export class OtpVerificationPage implements OnInit {
  hasVerifiedEmail: boolean = true;
  reCaptureVerifier: any;
  mobileNumber: any;
  isSendedCodeSuccess: any = true;

  constructor(private auth: AngularFireAuth, private authServer: AuthService) {
    this.auth.authState.subscribe((user) => {
      if (user) this.hasVerifiedEmail = user.emailVerified;
      console.log(user.emailVerified);
    });
  }

  ngOnInit() {}

  getOTP() {
    this.reCaptureVerifier = new firebase.default.auth.RecaptchaVerifier(
      'login-btn',
      { size: 'invisible' }
    );

    console.log(this.reCaptureVerifier);
    console.log(this.mobileNumber);

    //fetch promise
    this.authServer
      .signInWithPhoneNumber(this.mobileNumber, this.reCaptureVerifier)
      .then((confirmationResult) => {
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );

        //active shown verification code input
        this.isSendedCodeSuccess = true;
        console.log('active shown verification: ' + this.isSendedCodeSuccess);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
