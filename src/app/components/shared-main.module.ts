import { OverPageModalComponent } from './over-page-modal/over-page-modal.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './forms/form-input/form-input.component';
import { FormDropdownComponent } from './forms/form-dropdown/form-dropdown.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    SidebarComponent,
    FormInputComponent,
    ErrorMessageComponent,
    FormDropdownComponent,
    VerifyCodeComponent,
    OverPageModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
  ],
  exports: [
    SidebarComponent,
    FormInputComponent,
    ErrorMessageComponent,
    FormDropdownComponent,
    VerifyCodeComponent,
  ],
})
export class SharedMainModule {}
