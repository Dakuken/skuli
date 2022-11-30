import { Component, OnInit, Input } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() time = 0;
  @Input() nbquestion = '';
  @Input() question = '';
  @Input() url = '';
  @Input() indexQuestion = '1/10';

  constructor(private socketServ: WebSocketService, private router: Router) {

  }

  ngOnInit(): void {
  }


}
