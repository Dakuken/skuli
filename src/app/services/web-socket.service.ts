import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any
  readonly url: string = "wss://skuli-6ojzlrrdqa-ey.a.run.app/"

  constructor() {
    this.socket = io.io(this.url)
  }

  listen(eventName: string): Observable<any> {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data: any) => {
        Subscriber.next(data)
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }

  join(groupName: string) {
    this.socket.emit('join', groupName);
  }
}
