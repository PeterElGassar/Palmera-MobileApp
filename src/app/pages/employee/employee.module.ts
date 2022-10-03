import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeItemComponent } from './components/employee-item/employee-item.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeePageRoutingModule } from './employee-routing.module';

import { EmployeePage } from './employee.page';
import { SharedMainModule } from 'src/app/components/shared-main.module';

const COMPONENTS = [
  EmployeePage,
  EmployeeListComponent,
  EmployeeItemComponent,
  AddEmployeeComponent,
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedMainModule,
    ReactiveFormsModule,
    EmployeePageRoutingModule,
  ],
  declarations: [...COMPONENTS],
})
export class EmployeePageModule {}
