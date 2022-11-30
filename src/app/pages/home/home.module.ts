import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
  ]
})
export class HomeModule { }
