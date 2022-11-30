import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultatComponent } from './resultat.component';
import { NbButton, NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/component/loader/loader.module';




@NgModule({
  declarations: [ResultatComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule
  ]
})
export class ResultatModule { }
