import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { info } from 'src/assets/global-constants';
import { ActivatedRoute, Router } from '@angular/router';


interface CurrentQuestion {
  question: string,
  choix: string[],
  url: string,
  indexQuestion: string
}

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})

export class PartyComponent implements OnInit {

  actualQuestion: CurrentQuestion = {
    question: 'Question',
    choix: ['choix1', 'choix2', 'choix3', 'choix4'],
    url: 'https://via.placeholder.com/200',
    indexQuestion: '1/10'
  };

  time = 0;
  answer = -1;

  constructor(private socketService: WebSocketService, private router: Router) {
  }

  ngOnInit(): void {
    this.socketService.listen('collectAnswers').subscribe(() => {
      this.socketService.emit('answer', { roomId: info.roomId, answer: `${this.answer}` });
      setTimeout(() => {
        this.answer = -1
      }, 1000);
    });

    this.socketService.listen('gameOver').subscribe(() => {
      this.router.navigate(['resultat']);
    });

    this.socketService.listen('question').subscribe((questionObj: CurrentQuestion) => {
      this.actualQuestion = questionObj;
    });

    this.socketService.listen('timeLeft').subscribe(async (time: number) => {
      if (!time) return
      this.timer(time)
    });


  }

  async timer(time: number) {
    for (let i = time; i > 0; i--) {
      this.time = i;
      await this.sleep(1000);
    }
  }
  sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  onResponseIndex(event: any) {
    this.answer = event;
  }
  goToHome() {
    this.router.navigate(['home'])
  }

}
