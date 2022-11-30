import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { MenuComponent } from './pages/menu/menu.component';
import { PartyComponent } from './pages/party/party.component';
import { ResultatComponent } from './pages/resultat/resultat.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'party', component: PartyComponent },
  { path: 'lobby/:id', component: LobbyComponent },

  { path: 'resultat', component: ResultatComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
