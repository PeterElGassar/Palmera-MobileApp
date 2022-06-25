import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authServe: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authServe.user.pipe(
      map((user) => {
        debugger;
        if (user) {
          //Check If User Complete his data Before Redirect To Home Page

          this.authServe.getUserDetails(user).then((userData: any) => {
            debugger;

            if (userData.isDataComplete) {
              debugger;
              this.router.navigate(['/home'], {
                queryParams: { returnUrl: state.url },
              });
            } 
            else{
            debugger;

              this.router.navigate(['/complete-data'], {
                queryParams: { returnUrl: state.url },
              });
            
            }
          });
          return true;
        }

        //if not LogedIn User
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      })
    );
  }
}
