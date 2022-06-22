import { ErrorMessageComponent } from './error-message/error-message.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './forms/form-input/form-input.component';
import { FormDropdownComponent } from './forms/form-dropdown/form-dropdown.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FormInputComponent,
    ErrorMessageComponent,
    FormDropdownComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SidebarComponent,
    FormInputComponent,
    ErrorMessageComponent,
    FormDropdownComponent,
  ],
})
export class SharedMainModule {}
