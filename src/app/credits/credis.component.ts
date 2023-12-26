import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/services/demande.service';
import { Demande, DemandeResponse } from '../models/Demande';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credis',
  templateUrl: './credis.component.html',
  styleUrls: ['./credis.component.css']
})
export class CredisComponent implements OnInit {

  demandes: DemandeResponse[] = [];

  constructor(private demandeService: DemandeService, private router: Router) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    console.log('tesssssssst');
    this.demandeService.getAllDemandes().subscribe((data) => {
      this.demandes = data;
    });
  }

  validerDemande(demande: DemandeResponse) {
    this.demandeService.updateDemande(demande.demande.idDemande, 1)
      .subscribe(response => {
        console.log('Demande validée avec succès:', response);
        this.loadDemandes();
      });
  }

  rejeterDemande(demande: any) {
    this.demandeService.updateDemande(demande.demande.id, -1)
      .subscribe(response => {
        console.log('Demande rejetée avec succès:', response);
      });
  }

  afficherDetailsDemande(idDemande: number): void {
    this.router.navigate(['/details-demande', idDemande]);
}

}
