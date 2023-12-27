import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/services/demande.service';
import { Demande, DemandeResponse } from '../models/Demande';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-credis',
  templateUrl: './credis.component.html',
  styleUrls: ['./credis.component.css']
})
export class CredisComponent implements OnInit {

  demandes: DemandeResponse[] = [];

  constructor(private confirmationService: ConfirmationService,private demandeService: DemandeService, private router: Router) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.demandeService.getAllDemandes().subscribe((data) => {
      this.demandes = data;
    });
  }

  validerDemande(demande: DemandeResponse) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir valider cette demande?',
      accept: () => {
        this.demandeService.updateDemande(demande.demande.idDemande, 1)
          .subscribe(response => {
            console.log('Demande validée avec succès:', response);
            this.loadDemandes();
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
            this.loadDemandes();
          });
      }
    });
  }
  

  afficherDetailsDemande(idDemande: number): void {
    this.router.navigate(['/details-demande', idDemande]);
}

}
