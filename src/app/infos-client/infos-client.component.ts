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
  selectedNumeroCompte: string = ''; 
  proprietaire: Proprietaire = {};
  selectedCompte: Compte = {};
  parsedDateNaiss: Date | undefined;
  cinControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]);


  constructor(private proprietaireService: ProprietaireComptesService) { }

  onCinInputChange(event: any): void {
    const cin = event?.target?.value;
    if (cin && cin.length === 8) {
      this.proprietaireService.getInfosClient(cin).subscribe({
        next: data => {
          this.proprietaire.cin = data.cin;
          this.proprietaire.comptes = data.comptes;
          this.proprietaire.nom = data.nom;
          this.proprietaire.prenom = data.prenom;
          this.proprietaire.sf = data.sf;
          this.selectedCompte = {};
          this.proprietaire.dateNaiss = data.dateNaiss;
          this.parsedDateNaiss = this.proprietaire.dateNaiss ? new Date(this.proprietaire.dateNaiss) : undefined;
        },
        error: error => {
          console.error('Erreur lors de la récupération des informations depuis l\'API', error);
        }
      });
    } else {
      this.resetFields();
    }
  }
  devise! : string ; 
  parseddateOuv: Date | undefined;
  onNumeroCompteChange() {
    if (this.selectedNumeroCompte && this.proprietaire?.comptes) {
  
       this.proprietaire.comptes.find(compte => {
        this.devise = compte.devise || '';
        this.parseddateOuv = compte.dateOuv ? new Date(compte.dateOuv) : undefined;
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
