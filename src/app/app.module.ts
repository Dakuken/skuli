import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbAlertModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeModule } from './pages/home/home.module';
import { MenuModule } from './pages/menu/menu.module';
import { PartyModule } from './pages/party/party.module';
import { WebSocketService } from './services/web-socket.service';
import { LobbyModule } from './pages/lobby/lobby.module';
import { ResultatModule } from './pages/resultat/resultat.module';
import { LoaderModule } from './component/loader/loader.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HomeModule,
    MenuModule,
    LobbyModule,
    PartyModule,
    ResultatModule, 
    LoaderModule,

    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbAlertModule,
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

