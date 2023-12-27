import { Component, OnInit } from '@angular/core';
import { ProprietaireComptesService } from '../../services/proprietaire-comptes.service';
import { Proprietaire, Compte } from '../models/Proprietaire-Compte';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-infos-client',
  templateUrl: './infos-client.component.html',
  styleUrls: ['./infos-client.component.css']
})
export class InfosClientComponent implements OnInit {
  selectedNumeroCompte!: string; 
  proprietaire: Proprietaire = {};
  selectedCompte: Compte = {};
  parsedDateNaiss: Date | undefined;
  cinControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]);
  showClientNotFoundMessage: boolean = false; // Ajoutez cette ligne


  constructor(private proprietaireService: ProprietaireComptesService) { }

  onCinInputChange(event: any): void {
    const cin = event?.target?.value;
  
    if (cin.length > 8) {
      this.cinControl.setValue(cin.slice(0, 8), { emitEvent: false });
    }
  
    if (cin && cin.length === 8) {
      this.proprietaireService.getInfosClient(cin).subscribe({
        next: data => {
          console.log('API Response:', data);
  
          if (data) {
            // Mettez à jour les champs avec les données reçues
            this.proprietaire.cin = data.cin;
            this.proprietaire.comptes = data.comptes;
            this.proprietaire.nom = data.nom;
            this.selectedCompte = {};
            this.proprietaire.prenom = data.prenom;
            this.proprietaire.sf = data.sf;
            this.proprietaire.dateNaiss = data.dateNaiss;
            this.parsedDateNaiss = this.proprietaire.dateNaiss ? new Date(this.proprietaire.dateNaiss) : undefined;
          } else {
            // Réinitialisez les champs et affichez le message d'erreur
            this.resetFields();
            this.showClientNotFoundMessage = true;
          }
        },
        error: error => {
          console.error('Erreur lors de la récupération des informations depuis l\'API', error);
        }
      });
    } else {
      this.resetFields();
      this.showClientNotFoundMessage = false;
    }
  }
  
  devise! : string ; 
  parseddateOuv: Date | undefined;
  onNumeroCompteChange() {
    if (this.selectedNumeroCompte && this.proprietaire?.comptes) {
  
       this.proprietaire.comptes.find(compte => {
        this.devise = compte.devise || '';
        this.parseddateOuv = compte.dateOuv ? new Date(compte.dateOuv) : undefined;
        this.selectedNumeroCompte=compte.numCompte!.toString();
      }) ;
    }
  }
  

  resetFields(): void {
    this.proprietaire.cin = '';
    this.proprietaire.comptes = [];
    this.proprietaire.nom = '';
    this.proprietaire.prenom = '';
    this.proprietaire.sf = '';
    this.selectedCompte = {};
    this.parsedDateNaiss = undefined;
    this.parseddateOuv = undefined;
    this.devise='';

  }

  updateFields(data: Proprietaire): void {
    this.proprietaire = { ...data };
    this.selectedCompte = {};
  }

  ngOnInit(): void {
    
  }
}
