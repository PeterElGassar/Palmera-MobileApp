import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './forms/form-input/form-input.component';

@NgModule({
  declarations: [SidebarComponent, FormInputComponent],
  imports: [
    CommonModule,
    IonicModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SidebarComponent, FormInputComponent],
})
export class SharedMainModule {}
