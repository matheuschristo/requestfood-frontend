import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { HomeEstablishmentComponent } from './components/establishment/home-establishment/home-establishment.component';
import { EstablishmentConsumableComponent } from './components/establishment/establishment-consumable/establishment-consumable.component';
import { ClientConsumableComponent } from './components/_client/client-consumable/client-consumable.component';
import { HomeClientComponent } from './components/_client/home-client/home-client.component';
import { CadastroEstablishmentComponent } from './components/establishment/cadastro/cadastro.component';
import { CadastroClientComponent } from './components/_client/cadastro/cadastro.component';
import { LoginComponent } from './components/user/login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'cadastroC',component: CadastroClientComponent},
  {path: 'cadastroE',component: CadastroEstablishmentComponent},
  {path: 'home-client/:id', component: HomeClientComponent},
  {path: 'consumablesC/:idEstablishment', component: ClientConsumableComponent},
  {path: 'consumablesE/:idEstablishment', component: EstablishmentConsumableComponent},
  {path: 'home-establishment/:id',component: HomeEstablishmentComponent},
  {path: 'user-update/:id', component: UserUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
