import { Component, OnInit, ViewChild } from '@angular/core';
import { InfosClientComponent } from '../infos-client/infos-client.component';
import { DemandeRequest } from '../models/DemandeRequest';
import { DossierCreditComponent } from '../dossier-credit/dossier-credit.component';
import { GarantieComponent } from '../garantie/garantie.component';
import { SuiviComponent } from '../suivi/suivi.component';
import { ObservationComponent } from '../observation/observation.component';
import { LoginService } from 'src/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PiecesJComponent } from '../pieces-j/pieces-j.component';
import { PieceJs } from '../models/Demande';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  demande!: DemandeRequest ;

  @ViewChild(InfosClientComponent) infosClientComponent: InfosClientComponent | undefined;
  @ViewChild(DossierCreditComponent) dossierCreditComponent: DossierCreditComponent | undefined;
  @ViewChild(GarantieComponent) garantieComponent: GarantieComponent | undefined;
  @ViewChild(SuiviComponent) suiviComponent: SuiviComponent | undefined;
  @ViewChild(ObservationComponent) observationComponent: ObservationComponent | undefined;
  @ViewChild(PiecesJComponent) piecesJComponent: PiecesJComponent | undefined;


  constructor(private authService: LoginService, private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  uploadFiles(): void {
    if (this.piecesJComponent!.selectedFiles && this.piecesJComponent!.selectedFiles.length > 0) {
      for (let i = 0; i < this.piecesJComponent!.selectedFiles.length; i++) {
        const file = this.piecesJComponent!.selectedFiles[i];
        this.onFileUpload(file, 23);
      }
    } else {
      console.warn('No files selected.');
    }
  }

  onFileUpload(file: File, idDemande: number): void {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id_demande', idDemande.toString());

    const headers = new HttpHeaders();

    this.http.post<PieceJs>('http://localhost:8089/pj/add', formData, { headers })
      .subscribe({
        next: data => {
          console.log('Réponse de l\'API :', data);
        },
        error: error => {
          console.error('Erreur lors de l\'envoi du fichier :', error);
        }
      });
  }
  
  enregistrerDemande() {
    this.demande = new DemandeRequest();
    this.demande.etat = 0;
    this.demande.DateDemande = new Date();
    this.demande.credit.montant = this.dossierCreditComponent!.montant;
    this.demande.credit.unite = this.dossierCreditComponent!.unite;
    this.demande.credit.nbE = this.dossierCreditComponent!.nbE;
    this.demande.credit.typeC = this.dossierCreditComponent!.typeCid;
    this.demande.utilisateur = 'Agent1@gmail.com';
    this.demande.compte = this.infosClientComponent!.selectedNumeroCompte.toString();
    this.demande.garanties = this.garantieComponent!.garantiees;
  
    // Appel à l'API avec HttpClient
    this.http.post<any>('http://localhost:8089/demande/add', this.demande).subscribe({
      next: (data) => {
        console.log('Réponse de l\'API:', data);
        this.uploadFiles();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'La demande a été ajoutée avec succès'
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur s\'est produite lors de l\'ajout de la demande'
        });
        console.error('Erreur lors de la récupération des informations depuis l\'API', error);
      }
    });
  }

  reinitialiser(){
    
  }

}
