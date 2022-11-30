import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { disconnect } from 'process';
import { WebSocketService } from 'src/app/services/web-socket.service';
import User from 'src/class/User';
import { info } from 'src/assets/global-constants';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {

  joueurs: User[] = [
    { id: '1', userName: 'Justin', isReady: true, score: 9 },
    { id: '5', userName: 'Piedsfsdfsq', isReady: true, score: 10 },
    { id: '8', userName: 'Andrew', isReady: true, score: 2 },
    { id: '2', userName: 'Alexis', isReady: true, score: 9 },
    { id: '3', userName: 'Pierre', isReady: true, score: 9 },
    { id: '4', userName: 'Joshua', isReady: true, score: 10 },
    { id: '1', userName: 'Justin', isReady: true, score: 9 },
    { id: '5', userName: 'Piedsfsdfsq', isReady: true, score: 10 },
    { id: '8', userName: 'Andrew', isReady: true, score: 2 },
    { id: '2', userName: 'Alexis', isReady: true, score: 9 },
    { id: '3', userName: 'Pierre', isReady: true, score: 9 },
    { id: '4', userName: 'Joshua', isReady: true, score: 10 },
    { id: '4', userName: 'Joshua', isReady: true, score: 10 },
    { id: '4', userName: 'Joshua', isReady: true, score: 10 },
    { id: '4', userName: 'Joshua', isReady: true, score: 10 }]
  classement: number[] = []

  isLoaded = false

  tabJoueur: { user: string, score: number }[] = []

  constructor(private socketServ: WebSocketService, private router: Router) { }

  ngOnInit(): void {
    console.log('classement');

    this.socketServ.listen("classement").subscribe((data: { user: string, score: number }[]) => {
      if (!data) { return }
      console.log(data);

      this.tabJoueur = data
      this.triclassement()
      this.isLoaded = true
    })
  }

  triclassement(): void {
    this.tabJoueur.sort((a, b) => b.score - a.score);
    let classement = 1
    this.tabJoueur.forEach((joueur, index) => {
      if (index === 0) {
        this.classement.push(classement)
      }
      else {
        if (joueur.score === this.tabJoueur[index - 1].score) {
          classement--
          this.classement.push(classement)
        }
        else {
          this.classement.push(classement)
        }
      }
      classement++
    });
  }


  goToLobby() {
    let id = info.roomId
    this.router.navigate(['/lobby', id])
  }



  disconnect() {
    this.socketServ.emit('leaveRoom', info.roomId)
    this.router.navigate(['/menu'])
  }
}
