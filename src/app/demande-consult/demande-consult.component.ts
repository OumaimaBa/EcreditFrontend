import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeResponse } from '../models/Demande';
import { DemandeService } from 'src/services/demande.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-demande-consult',
  templateUrl: './demande-consult.component.html',
  styleUrls: ['./demande-consult.component.css']
})
export class DemandeConsultComponent implements OnInit {

  idDemande!: number;
  demande: DemandeResponse = this.initializeDemande(); // Utilisez la fonction d'initialisation

  parsedDateNaiss: Date | undefined;
  parseddateOuv: Date | undefined;
  dateD: Date | undefined;
  saisisseur! : string;

  constructor(private confirmationService: ConfirmationService,private route: ActivatedRoute,private router : Router, private demandeService: DemandeService) {}


  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.idDemande = +idParam;
      this.chargerDemandeDetails();

    } else {
      console.error('ID de demande non défini.');
    }
  }

  initializeDemande(): DemandeResponse {
    return {
      nomC: '',
      demande: {
        idDemande: 0,
        observation: '',
        etat: 0,
        credit: 0,
        utilisateur: '',
        compte: '',
        dateDemande: new Date()
      },
      prop: {
        cin: '',
        mdp: '',
        nom: '',
        prenom: '',
        dateNaiss: new Date(),
        sf: ''
      },
      saisisseur: '',
      compte: {
        numCompte: '',
        dateOuv: new Date(),
        devise: '',
        proprietaire: ''
      },
      credit: {
        idCredit: 0,
        montant: 0,
        unite: '',
        nbE: 0,
        typeC: 0
      },
      pjs: [],
      garanties: [],
      historiques: []
    };
  }

  validerDemande(demande: DemandeResponse) {
    console.log('vvvvvvvvv');
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir valider cette demande?',
      accept: () => {
        this.demandeService.updateDemande(demande.demande.idDemande, 1)
          .subscribe(response => {
            console.log('Demande validée avec succès:', response);
          });
      }
    });
  }
  
  rejeterDemande(demande: DemandeResponse) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir rejeter cette demande?',
      accept: () => {
        this.demandeService.updateDemande(demande.demande.idDemande, -1)
          .subscribe(response => {
            console.log('Demande rejetée avec succès:', response);
          });
      }
    });
  }

  chargerDemandeDetails(): void {
    this.demandeService.getDemandeById(this.idDemande)
      .subscribe(data => {
        this.demande = data;
        console.log(this.demande);
        this.parsedDateNaiss = this.demande.prop.dateNaiss ? new Date(this.demande.prop.dateNaiss) : undefined;
        this.parseddateOuv = this.demande.compte.dateOuv ? new Date(this.demande.compte.dateOuv) : undefined;
        this.dateD = this.demande.demande.dateDemande ? new Date(this.demande.demande.dateDemande) : undefined;
        const parts = this.demande.saisisseur.split('@');
        const username = parts[0];
        this.saisisseur = username;

      });
  }

  retour() {
    this.router.navigate(['credits']);
  }

}
