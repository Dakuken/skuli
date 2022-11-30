import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyComponent } from './party.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';



@NgModule({
  declarations: [PartyComponent, QuestionComponent, AnswerComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
  ]
})
export class PartyModule { }
