import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, IonicModule, IonicModule, RouterModule],
  exports: [SidebarComponent],
})
export class SharedMainModule {}
