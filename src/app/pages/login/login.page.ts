import { LoadingController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageForm } from './login-page-form';
import { AuthService } from 'src/app/services/auth.service';
import { FormInputTypes } from 'src/app/core/guards/Enums/form-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loaderVar: any;
  //form enum
  public formInput = FormInputTypes;
  //form enum

  constructor(
    private router: Router,
    private fm: FormBuilder,
    private authService: AuthService,
    private loader: LoadingController
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
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?//&gt;.&lt;,])(?!.*\\s).*$"
          ),
        ],
      ],
    });
  }

  get loginFormControl(): FormGroup {
    return this.loginForm;
  }

  get emailField(): FormGroup {
    return this.loginForm.get(this.formInput.email) as FormGroup;
  }

  get passwordField(): FormGroup {
    return this.loginForm.get(this.formInput.password) as FormGroup;
  }

  async submitForm() {
    this.loaderVar = await this.loader.create({ message: 'loading ...' });
    this.loaderVar.present();

    this.authService
      .loginWhithEmail(this.loginForm.value)
      .then((res) => {
        debugger;
        console.log(res);
        if (res) {
          this.router.navigateByUrl('/home');
        } else
          this.authService.alertPopupMessage('email or password Invalid ..');
        this.loader.dismiss();
      })
      .catch((err) => {
        console.log(err);
        this.authService.alertPopupMessage(err.message);
        this.loader.dismiss();
      });
    this.loader.dismiss();
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(
      (res) => {
        console.log(res.user);
        let user = this.authService.mappingUserEntity(res.user);
        this.authService.insertUser(user);
        this.router.navigateByUrl('/home');
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook().then(
      (res) => {
        console.log(res.user);
        let user = this.authService.mappingUserEntity(res.user);
        this.authService.insertUser(user);
        this.router.navigateByUrl('/home');
      },
      (err) => {
        console.log(err.message);
        this.authService.alertPopupMessage(err.message);
      }
    );
  }
}
