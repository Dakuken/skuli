import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { disconnect } from 'process';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { info } from 'src/assets/global-constants';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  createRoomForm!: FormGroup;
  joinRoomForm!: FormGroup;
  fullScreen = false

  constructor(private socketServ: WebSocketService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    (window.innerWidth > 768) ? this.fullScreen = true : this.fullScreen = false;
    this.initformcreate();
    this.initformjoin();

  }

  initformcreate() {
    this.createRoomForm = this.formBuilder.group({
      roomNameCreate: ['', [Validators.required]],
    })
  }

  initformjoin() {
    this.joinRoomForm = this.formBuilder.group({
      roomNameJoin: ['', [Validators.required]],
    })
  }

  addRoom() {
    const roomName: string = this.createRoomForm.get('roomNameCreate')?.value;
    this.socketServ.emit('createRoom', roomName)
    let receiveIdRoom = this.socketServ.listen('idRoom').subscribe((idRoom: string) => {
      if (!idRoom) return;
      info.roomId = idRoom;
      receiveIdRoom.unsubscribe();
      this.goToLobby();
    })
  }

  joinRoom() {
    const id: string = this.joinRoomForm.get('roomNameJoin')?.value;
    console.log(id);

    this.socketServ.emit('joinRoom', id)
    let receiveIdRoom = this.socketServ.listen('idRoom').subscribe((idRoom: string) => {
      if (!idRoom) return;
      info.roomId = idRoom
      receiveIdRoom.unsubscribe();
      this.goToLobby();
    })
  }

  goToLobby() {
    let id = info.roomId
    this.router.navigate(['/lobby', id])
  }

  disconnect() {
    this.socketServ.emit('disconnect', { id: info.userId })
    localStorage.clear();
    this.router.navigate(['/home'])
  }


  goToHome() {
    this.router.navigate(['home'])
  }





}
