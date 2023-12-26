import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { InfosClientComponent } from './infos-client/infos-client.component';
import {FieldsetModule} from 'primeng/fieldset';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SplitterModule} from 'primeng/splitter';
import {PasswordModule} from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DossierCreditComponent } from './dossier-credit/dossier-credit.component';
import { GarantieComponent } from './garantie/garantie.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { SuiviComponent } from './suivi/suivi.component';
import { PiecesJComponent } from './pieces-j/pieces-j.component';
import { ObservationComponent } from './observation/observation.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DemandeComponent } from './demande/demande.component';
import { CredisComponent } from './credits/credis.component';
import { SidebarModule } from 'primeng/sidebar';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import {CheckboxModule} from 'primeng/checkbox';
import { DatePipe } from '@angular/common';
import { DemandeConsultComponent } from './demande-consult/demande-consult.component';
import { HistoriqueComponent } from './historique/historique.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfosClientComponent,
    DossierCreditComponent,
    GarantieComponent,
    SuiviComponent,
    PiecesJComponent,
    ObservationComponent,
    DemandeComponent,
    CredisComponent,
    BodyComponent,
    SidenavComponent,
    DemandeConsultComponent,
    HistoriqueComponent,
    ],
  imports: [
    ConfirmPopupModule,
    CheckboxModule,
    HttpClientModule ,
    SidebarModule,
    InputTextareaModule,
    FileUploadModule,
    DialogModule,
    TagModule,
    RatingModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    PasswordModule,
    SplitterModule,
    BrowserAnimationsModule,
    FieldsetModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService, DatePipe, DialogService ,    ConfirmationService],
  bootstrap: [AppComponent]

})
export class AppModule { }
