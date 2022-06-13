import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { create } from 'domain';
import { LoadingController } from '@ionic/angular';
import { Role } from 'src/app/shared/models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  loaderVar: any;
  roles: any[];

  constructor(
    private router: Router,
    private fm: FormBuilder,
    private authService: AuthService,
    private loader: LoadingController,
    private af: AngularFireAuth
  ) {}

  ngOnInit() {
    this.getRoles();
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fm.group({
      uid: [null],

      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
        ],
      ],
      password: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(100)]],
      phone: [null, [Validators.required, Validators.maxLength(15)]],
      organizationCode: [null, [Validators.required, Validators.maxLength(15)]],
      employeeNumber: [null, [Validators.required, Validators.maxLength(10)]],
      roleId: [null, [Validators.required]],
      isDataComplete: [true],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  async submitForm() {
    this.loaderVar = await this.loader.create({ message: 'loading ...' });
    this.loaderVar.present();

    this.authService.signup(this.registerForm.value).then(
      (res) => {
        console.log(res.user);

        if (res.user.uid) {
          res.user.sendEmailVerification();
          //email verify
          this.authService.sendEmailVerification(res.user);
          //email verify

          debugger;
          this.registerFormControl.uid.setValue(res.user.uid);

          this.authService.saveDetails(this.registerForm.value).then(
            (res) => {
              debugger;
              this.router.navigateByUrl('/home', { replaceUrl: true });
            },
            (err) => {
              debugger;
              console.log(err);
            }
          );
        }
      },
      (err) => {
        alert(err.message);
        console.log(err);
      }
    );
    this.loaderVar.dismiss();
  }

  async submitForm2() {
    debugger;

    this.loaderVar = await this.loader.create({ message: 'loading ...' });
    this.loaderVar.present();

    const user = await this.authService.signup2(this.registerForm.value);

    this.loaderVar.dismiss();
    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
  }

  async ShowLoader() {
    this.loaderVar = await this.loader.create({ message: 'loading ...' });

    this.loaderVar.present();

    setTimeout(() => {
      this.loaderVar.dismiss();
    }, 3000);
  }

  async getRoles() {
    this.authService.getRoles().subscribe((res: Role[]) => {
      if (res) {
        debugger;
        this.roles = res;
        console.log('roles' + res);
      }
    });
  }
}
