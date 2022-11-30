import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('anim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'qcm-live-client';
  isBanned = false

  constructor(private socketService: WebSocketService, private router: Router) { }

  ngOnInit() {
    this.socketService.listen('isBanned').subscribe(() => {
      this.router.navigate(['/menu'])
      this.banned()
    })
  }

  banned() {
    this.isBanned = !this.isBanned
    setTimeout(() => {
      this.isBanned = !this.isBanned
    }, 3000);
  }
}
