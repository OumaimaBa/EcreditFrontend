import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InfosClientComponent } from './infos-client/infos-client.component';
import { DossierCreditComponent } from './dossier-credit/dossier-credit.component';
import { GarantieComponent } from './garantie/garantie.component';
import { SuiviComponent } from './suivi/suivi.component';
import { PiecesJComponent } from './pieces-j/pieces-j.component';
import { ObservationComponent } from './observation/observation.component';
import { DemandeComponent } from './demande/demande.component';
import { CredisComponent } from './credits/credis.component';
import { DemandeConsultComponent } from './demande-consult/demande-consult.component';

const routes: Routes = [
  {path : '', redirectTo:'login', pathMatch : 'full'},
  {path:'login' , component: LoginComponent },
  {path:'infos-client' , component: InfosClientComponent },
  {path:'dossier-credit' , component: DossierCreditComponent },
  {path:'garantie' , component: GarantieComponent},
  {path:'suivi' , component: SuiviComponent},
  {path:'pieces-j' , component: PiecesJComponent },
  {path:'observation' , component: ObservationComponent },
  {path:'demande' , component: DemandeComponent },
  {path:'credits' , component: CredisComponent },
  { path: 'logout', component:  LoginComponent},
  { path: 'details-demande/:id', component:  DemandeConsultComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
