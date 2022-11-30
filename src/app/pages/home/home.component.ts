import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { info } from 'src/assets/global-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private socketServ: WebSocketService, private formBuilder: FormBuilder, private router: Router) { }

  signInForm!: FormGroup;

  ngOnInit(): void {
    this.initForm()
  }



  initForm() {
    this.signInForm = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.pattern('[^ ]*'), Validators.maxLength(15)]],
    })
  }

  addUser() {
    const pseudo = this.signInForm.get('pseudo')?.value
    this.socketServ.emit('createUser', pseudo)
    let receiveId = this.socketServ.listen('userId').subscribe((id: string) => {
      if (!id) return
      info.userId = id;
      receiveId.unsubscribe()
      this.goToMenu()
    })
  }


  goToMenu() {
    this.router.navigate(['/menu'])
  }
}
