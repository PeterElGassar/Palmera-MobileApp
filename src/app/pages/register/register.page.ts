import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private router: Router,
    private fm: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fm.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
        ],
      ],
      password: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(100)]],
      id: [null],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  submitForm() {
    this.authService.signup(this.registerForm.value).then(
      (res) => {
        if (res.user.uid) {
          let data = {
            email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value,
            name: this.registerForm.get('name').value,
            uid: res.user.uid,
          };
          this.authService.saveDetails(data).then(
            (res) => {
              alert('Account Created!');
            },
            (err) => {
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
  }
}
