import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { fullScreen, info } from 'src/assets/global-constants';
import User from 'src/class/User';
@Component({
  selector: 'app-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.scss']
})
export class JoueursComponent implements OnInit {
  @Input() isReady: boolean = false;
  @Input() host: string = '';
  @Input() users: User[] = [];
  @Input() params!: { nbPlayers: number, nbTimes: number, nbQuestions: number }
  nbJoueurMax: number = 0;
  isLoaded = false;
  fullScreen = fullScreen;
  myId = info.userId;


  constructor(private socketService: WebSocketService, private router: Router) { }

  async ngOnInit(): Promise<any> {
    this.socketService.listen("playersChanged").subscribe((data: number) => {
      this.nbJoueurMax = data
    })
  }

  onLeave() {
    this.socketService.emit("leaveRoom", info.roomId)
    this.router.navigate(['/menu'])
  }

  onBan(userId: string) {
    let roomId = info.roomId
    this.socketService.emit("ban", { roomId, userId })
  }
}
