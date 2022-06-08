import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageForm } from './login-page-form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fm: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createLoginForm();
    console.log(this.loginForm.controls);
  }

  createLoginForm() {
    this.loginForm = this.fm.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  submitForm() {
    // console.log(this.loginForm.get('email').value);
    // console.log(this.loginForm.get('password').value);

    this.authService
      .loginWhithEmail(this.loginForm.value)
      .then((res) => {
        console.log(res);
        if (res.user.uid) {
          //
          this.authService.getDetails({ uid: res.user.uid }).subscribe(
            (res) => {
              debugger;
              console.log(res);
              alert('Welcome ' + res['name']);
            },
            (err) => {
              console.log(err);
            }
          );
          //
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
