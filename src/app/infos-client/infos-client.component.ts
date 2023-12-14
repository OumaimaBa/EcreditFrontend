import { Component, OnInit } from '@angular/core';
import { ProprietaireComptesService } from '../../services/proprietaire-comptes.service';

@Component({
  selector: 'app-infos-client',
  templateUrl: './infos-client.component.html',
  styleUrls: ['./infos-client.component.css']
})
export class InfosClientComponent implements OnInit {
  nom: string ='';
  prenom: string ='';

  constructor(private proprietaireService: ProprietaireComptesService) { }

  onCinInputChange(event: any): void {
    const cin = event?.target?.value;
    if (cin && cin.length === 8) {
      this.proprietaireService.getInfosClient(cin).subscribe(
        (data: any) => {
          this.updateFields(data);
        },
        (error) => {
          console.error('Erreur lors de la récupération des informations depuis l\'API', error);
        }
      );
    }else {
      this.nom='';
      this.prenom='';
    }
  }
  

  updateFields(data: any): void {
    this.nom = data.nom;
    this.prenom = data.prenom;
  }

  ngOnInit(): void {
  }
}
