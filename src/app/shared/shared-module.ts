import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorNamePipe } from '../pipes/color-name-pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

const shareable: Type<any>[] = [
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatRippleModule,
  MatRadioModule,
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  ColorNamePipe,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: [shareable],
  exports: [shareable],
})
export class SharedModule {}
