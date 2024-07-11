import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
 ToolbarComponent
  ],
  imports: [
    MatMenuModule,
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule

  ],
  exports: [
    ToolbarComponent,
    CommonModule,
    MatButtonModule
  ]
})
export class SharedModule { }