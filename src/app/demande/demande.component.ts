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
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  display: boolean = false; 
  successMessage: string = ''; 
  errorMessage: string = ''; 
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
    if (!this.dossierCreditComponent || !this.infosClientComponent || !this.garantieComponent) {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      this.successMessage = '';
      this.display = true;
      return;
    }
  
    if (!this.dossierCreditComponent.montant || !this.dossierCreditComponent.unite || !this.dossierCreditComponent.nbE || !this.dossierCreditComponent.typeCid) {
      this.errorMessage = 'Veuillez remplir tous les champs du dossier de crédit.';
      this.successMessage = '';
      this.display = true;
      return;
    }
  
    if (!this.infosClientComponent.selectedNumeroCompte) {
      this.errorMessage = 'Veuillez remplir tous les infos du client.';
      this.successMessage = '';
      this.display = true;
      return;
    }
  
    if (!this.garantieComponent.garantiees || this.garantieComponent.garantiees.length === 0) {
      this.errorMessage = 'Veuillez ajouter au moins une garantie.';
      this.successMessage = '';
      this.display = true;
      return;
    }
  
    this.demande = new DemandeRequest();
    this.demande.etat = 0;
    this.demande.DateDemande = new Date();
    this.demande.credit.montant = this.dossierCreditComponent.montant;
    this.demande.credit.unite = this.dossierCreditComponent.unite;
    this.demande.credit.nbE = this.dossierCreditComponent.nbE;
    this.demande.credit.typeC = this.dossierCreditComponent.typeCid;
    this.demande.utilisateur = 'Agent1@gmail.com';
    this.demande.compte = this.infosClientComponent.selectedNumeroCompte.toString();
    this.demande.garanties = this.garantieComponent.garantiees;
  
    this.http.post<any>('http://localhost:8089/demande/add', this.demande).subscribe({
      next: (data) => {
        this.uploadFiles();
        this.successMessage = 'La demande a été ajoutée avec succès';
        this.errorMessage = '';
        this.display = true;
      },
      error: (error) => {
        this.errorMessage = "Une erreur s'est produite lors de l'ajout de la demande";
        this.successMessage = '';
        this.display = true;
      }
    });
  }
  reinitialiser() {
    if (this.dossierCreditComponent) {
      //this.dossierCreditComponent.montant = null;
      //this.dossierCreditComponent.unite = null;
      //this.dossierCreditComponent.nbE = null;
      //this.dossierCreditComponent.typeCid = null;
    }
  
    if (this.infosClientComponent) {
      //this.infosClientComponent.selectedNumeroCompte = null;
      // Ajoutez d'autres propriétés que vous souhaitez réinitialiser dans InfosClientComponent
    }
  
    if (this.garantieComponent) {
      this.garantieComponent.garantiees = [];
      // Ajoutez d'autres propriétés que vous souhaitez réinitialiser dans GarantieComponent
    }
  
    // Ajoutez une logique de réinitialisation similaire pour les autres composants si nécessaire
  
    // Effacez les messages de succès et d'erreur
    this.successMessage = '';
    this.errorMessage = '';
  }
  
  
}
