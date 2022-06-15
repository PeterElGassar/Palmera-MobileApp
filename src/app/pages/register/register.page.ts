import { User } from './../../shared/models/user';
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
  _users: User[];

  constructor(
    private router: Router,
    private fm: FormBuilder,
    private authService: AuthService,
    private loader: LoadingController,
    private af: AngularFireAuth
  ) {
    var users: User[];
    this.authService.getAllUsers().then((value) => {
      debugger;
      users = value as User[];
    });
    this._users = users;
    console.log(this._users);
  }

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
          //save user data in firebase realtime database
          this.authService.insertUser(this.registerForm.value).then(() => {
            this.router.navigateByUrl('/home');
          });
        }
      },
      (err) => {
        this.authService.presentAlertMultipleButtons(err.message);
        // alert(err.message);
        console.log(err);
      }
    );
    this.loaderVar.dismiss();
  }

  async ShowLoader() {
    this.loaderVar = await this.loader.create({ message: 'loading ...' });

    this.loaderVar.present();

    setTimeout(() => {
      this.loaderVar.dismiss();
    }, 2000);
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
