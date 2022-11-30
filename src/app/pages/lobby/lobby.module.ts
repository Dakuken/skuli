import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbRadioModule } from '@nebular/theme';
import { JoueursComponent } from './components/joueurs/joueurs.component';
import { OptionsComponent } from './components/options/options.component';
import { LoaderComponent } from 'src/app/component/loader/loader.component';
import { LoaderModule } from 'src/app/component/loader/loader.module';



@NgModule({
  declarations: [LobbyComponent, JoueursComponent, OptionsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbRadioModule,
    LoaderModule
  ]
})
export class LobbyModule { }
