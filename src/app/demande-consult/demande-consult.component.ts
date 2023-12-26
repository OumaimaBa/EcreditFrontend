import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeResponse } from '../models/Demande';
import { DemandeService } from 'src/services/demande.service';

@Component({
  selector: 'app-demande-consult',
  templateUrl: './demande-consult.component.html',
  styleUrls: ['./demande-consult.component.css']
})
export class DemandeConsultComponent implements OnInit {

  idDemande!: number;
  demande!: DemandeResponse;
  parsedDateNaiss: Date | undefined;
  parseddateOuv: Date | undefined;
  dateD: Date | undefined;
  saisisseur! : string;

  constructor(private route: ActivatedRoute, private demandeService: DemandeService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.idDemande = +idParam;
      this.chargerDemandeDetails();

    } else {
      // Gérez le cas où 'id' est null (par exemple, redirigez l'utilisateur vers une autre page)
      console.error('ID de demande non défini.');
    }
  }

  chargerDemandeDetails(): void {
    this.demandeService.getDemandeById(this.idDemande)
      .subscribe(data => {
        this.demande = data;
        this.parsedDateNaiss = data.prop.dateNaiss ? new Date(data.prop.dateNaiss) : undefined;
        this.parseddateOuv = data.compte.dateOuv ? new Date(data.compte.dateOuv) : undefined;
        this.dateD = data.demande.DateDemande ? new Date(data.demande.DateDemande) : undefined;
        const parts = data.saisisseur.split('@');
        const username = parts[0];
        this.saisisseur = username;

      });
  }


}
