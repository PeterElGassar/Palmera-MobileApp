import { LoadingController } from '@ionic/angular';
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
  loaderVar: any;
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
      password: [null, [Validators.required]],
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  async submitForm() {
    this.loaderVar = await this.loader.create({ message: 'loading ...' });
    this.loaderVar.present();

    this.authService
      .loginWhithEmail2(this.loginForm.value)
      .then((res) => {
        debugger;
        console.log(res);
        if (res) {
          this.router.navigateByUrl('/home');
        } else this.authService.presentAlertMultipleButtons();
        this.loader.dismiss();
      })
      .catch((err) => {
        console.log(err);
      });
    this.loader.dismiss();
  }
}
