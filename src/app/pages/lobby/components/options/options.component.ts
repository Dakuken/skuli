import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { fullScreen, info } from 'src/assets/global-constants';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Output() ready: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() params!: { nbPlayers: number, nbTimes: number, nbQuestions: number }
  @Input() isHost: boolean = false

  isReady = false
  fullScreen = fullScreen
  constructor(private socketService: WebSocketService) { }

  ngOnInit(): void {


    this.socketService.listen("playersChanged").subscribe((data: number) => {
      this.params.nbPlayers = data
    })
    this.socketService.listen("timesChanged").subscribe((data: number) => {
      this.params.nbTimes = data
    })
    this.socketService.listen("questionsChanged").subscribe((data: number) => {
      this.params.nbQuestions = data
    })
  }

  toggleReady() {
    // laisser comme ça pour mobile
    this.isReady = !this.isReady
    this.ready.emit(this.isReady);

  }

  onPlayersChange(ev: number) {
    let roomId = info.roomId
    let nbPlayers = ev
    this.socketService.emit("onChangePlayers", { roomId, nbPlayers })

  }

  onTimesChange(ev: number) {
    let roomId = info.roomId
    let nbTimes = ev
    this.socketService.emit("onChangeTimes", { roomId, nbTimes })
  }

  onQuestionsChange(ev: number) {
    let roomId = info.roomId
    let nbQuestions = ev
    this.socketService.emit("onChangeQuestions", { roomId, nbQuestions })
  }

}
