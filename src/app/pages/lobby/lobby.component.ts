import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { fullScreen, info } from 'src/assets/global-constants';
import Room from 'src/class/Room';
import User from 'src/class/User';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

export class LobbyComponent implements OnInit {
  fullScreen = fullScreen
  isReady = false
  isHost = false
  isAllReady = false
  host = ''
  isLoaded = false
  users: User[] = []
  roomId: string = info.roomId
  params: { nbPlayers: number, nbTimes: number, nbQuestions: number } = { nbPlayers: 0, nbTimes: 0, nbQuestions: 0 }

  constructor(private socketService: WebSocketService, private activeRoute: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.socketService.listen('startGame').subscribe(() => {
      this.router.navigate(['/party']);
    })

    this.connect()
    this.socketService.emit('getInfoRoom', info.roomId)
    this.socketService.listen('infoRoom').subscribe((room: Room) => {
      if (!room) return;
      this.host = room.host.id;
      if (this.host === info.userId) {
        this.isHost = true;
      }
      this.params.nbPlayers = room.nbPlayers
      this.params.nbTimes = room.nbTimes
      this.params.nbQuestions = room.nbQuestions
      this.isLoaded = true;

    })
    this.socketService.emit('askUsers', info.roomId)
    this.socketService.listen('users').subscribe((users: User[]) => {
      if (!users) return
      this.users = users
      let noReady = 0
      users.forEach(user => {
        if (user.isReady === false) {
          noReady++
          return
        }
      });
      if (noReady === 0) {
        this.isAllReady = true
      } else {
        this.isAllReady = false
      }
    })
  }

  // ! pener à envoyer l'info au server et recevoir la confirmation avant modif
  toggleReady() {
    this.isReady = !this.isReady
    let { roomId, userId } = info
    this.socketService.emit('userReady', { roomId, userId, isReady: this.isReady })
  }

  start() {
    this.socketService.emit('start', info.roomId);

  }

  connect() {
    this.socketService.listen('roomDeleted').subscribe((idRoom: string) => {
      this.socketService.emit("deleteRoom", idRoom)
      this.router.navigate(['/menu'])
    })
  }


}
