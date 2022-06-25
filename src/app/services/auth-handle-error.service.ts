import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHandleErrorService {

  constructor() { }

  showErrorMessage(erorrCode:string):string{
    switch (erorrCode) {
      case 'auth/user-not-found':
        return 'email or password Invalid ..';
    
      case 'auth/email-already-in-use':
        return 'Email is already exists';
    

      default:
        break;
    }  
  }
}
