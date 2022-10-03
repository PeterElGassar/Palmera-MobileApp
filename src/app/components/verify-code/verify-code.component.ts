import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { environment } from '../environments/environment';

import * as firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit {
  verifyCode: string;
  otp!: string;
  config = environment.inputCodeConfig;


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.verifyCode = JSON.parse(localStorage.getItem('verificationId'));
    console.log(this.verifyCode);
  }

  onOtpChange(otpCode: any) {
    this.otp = otpCode;
  }

  clickVerifyEvent() {
    //create Credentials
    // console.log(this.verifyCode);
    console.log(this.otp);
debugger
    var credential = firebase.default.auth.PhoneAuthProvider.credential(
      this.verifyCode,
      this.otp
    );
    console.log(credential);
    debugger
    firebase.default
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        debugger
        console.log(response);
        //save user isPhonrNumberVerify
        localStorage.setItem('user_data', JSON.stringify(response));
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        debugger
        console.log(error);
        alert(error.message);
      });
  }
}
