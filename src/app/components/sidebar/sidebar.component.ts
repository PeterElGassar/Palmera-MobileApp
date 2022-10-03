import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public appPages = [
    // { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  isUserLoggedIn: boolean;
  currentUserDetails: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) this.isUserLoggedIn = true;
      console.log(user);
      this.getUserDetails(user);
    });
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/');
      console.log('out');
    });
  }

  getUserDetails(val: any) {
    this.auth.getDetails(val).subscribe((userData) => {
      debugger;
      if (userData) {
        this.currentUserDetails = userData;
      }
      // console.log('userData'+userData);
    });
  }
}
