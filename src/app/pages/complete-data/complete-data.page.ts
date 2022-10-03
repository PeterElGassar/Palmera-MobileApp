import { User } from './../../shared/models/user';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/shared/models/role';

@Component({
  selector: 'app-complete-data',
  templateUrl: './complete-data.page.html',
  styleUrls: ['./complete-data.page.scss'],
})
export class CompleteDataPage implements OnInit {
  completeDataForm: FormGroup;
  loaderVar: any;
  roles: any[];
  user: any;
  constructor(
    private router: Router,
    private fm: FormBuilder,
    private authService: AuthService,
    private loader: LoadingController,
    private af: AngularFireAuth
  ) {
    this.authService.user.subscribe((user: any) => {
      if (user) {
        this.user = user;
        console.log("Xx: " + user);
        debugger;
        this.initialUserDataFrom(user);
        this.createCompleteDataForm();
      }
    });
  }

  ngOnInit() {
    this.getRoles();

  }

  createCompleteDataForm() {
    this.completeDataForm = this.fm.group({
      uid: [this.user.uid],
      name: [this.user.displayName, [Validators.required, Validators.maxLength(100)]],
      phone: [null, [Validators.required, Validators.maxLength(15)]],
      organizationCode: [null, [Validators.required, Validators.maxLength(15)]],
      employeeNumber: [null, [Validators.required, Validators.maxLength(10)]],
      roleId: [null, [Validators.required]],
      isDataComplete: [true],
    });
  }

  get completeDataFormControl() {
    return this.completeDataForm.controls;
  }

  async submitForm() {
    this.loaderVar = await this.loader.create({ message: 'loading ...' });
    this.loaderVar.present();

    this.authService.updateUserData(this.completeDataForm.value).then(
      () => {
        debugger;
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },

      (err) => {
        alert(err.message);
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

  initialUserDataFrom(user: any) {
    this.authService.getUserDetails(user).then((userData: any) => {
      debugger;
      console.log('userData: ' + userData);

      // this.completeDataForm.get('name').setValue(userData?.name);
      // this.completeDataForm.get('uid').setValue(userData?.uid);
    });
  }
}
