import { SharedMainModule } from 'src/app/components/shared-main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpVerificationPageRoutingModule } from './otp-verification-routing.module';

import { OtpVerificationPage } from './otp-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpVerificationPageRoutingModule,
    SharedMainModule,
  ],
  declarations: [OtpVerificationPage],
})
export class OtpVerificationPageModule {}
