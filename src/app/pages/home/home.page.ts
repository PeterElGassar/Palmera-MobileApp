import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hasVerifiedEmail: boolean = true;

  constructor(private authx: AngularFireAuth) {
    this.authx.authState.subscribe((user) => {
      if (user) this.hasVerifiedEmail = user.emailVerified;
      console.log(user.emailVerified);
    });
  }

  ngOnInit() {}
}
