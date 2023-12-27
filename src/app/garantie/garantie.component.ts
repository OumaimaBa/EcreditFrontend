import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { GarantieService } from '../../services/garantie.service';
import { Garantie, Garantiee } from '../models/Garantie';
import { TypeG } from '../models/TypeG';
import { NatureG } from '../models/NatureG';

@Component({
  selector: 'app-garantie',
  templateUrl: './garantie.component.html',
  styleUrls: ['./garantie.component.css']
})

export class GarantieComponent implements OnInit {
  garanties: Garantie[] = [];
  garantiees: Garantiee[] = [];
  selectedNatureGId: any;
  selectedTypeG: any;
  selectedValeur: any;
  selectedDevise: any;
  idng!: number;
  idtg!: number;
  typesG: TypeG[] = [];
  visible: boolean = false;
  visiblee: boolean = false;
  naturesG: NatureG[] = [];
  devises: string[] = ['DT'];
  garantieAModifier: Garantie | null = null;
  selectedGarantie!: Garantie;

  constructor(private gService: GarantieService, private dialogService: DialogService, private messageService: MessageService, private ngService: GarantieService) {}

  ngOnInit(): void {
    this.ngService.getAllNaturesG().subscribe(data => {
      this.naturesG = data;
    });
  }

  modifierGarantie(): void {
    const index = this.garanties.findIndex(g => g === this.selectedGarantie);
    if (index !== -1) {
        this.garanties[index] = { ...this.selectedGarantie }; 
    }

    this.visiblee = false;
}


  onNatureGChange(event: any) {
    if (this.selectedNatureGId) {
      this.ngService.getAllTypesG(this.selectedNatureGId.idNG).subscribe(data => {
        this.typesG = data;
      });
    }
  }

  ouvrirDialog() {
    this.visible = true;
  }

  supprimerGarantie(garantie: Garantie) {
    const index = this.garanties.indexOf(garantie);
    if (index !== -1) {
      this.garanties.splice(index, 1);
    }
  }

  enregistrerGarantie() {
    if (this.selectedNatureGId) {
      const nouvelleGarantie: Garantie = {
        devise: this.selectedDevise!,
        natureG: this.selectedNatureGId.libNG,
        typeG: this.selectedTypeG?.libTG,
        valeur: this.selectedValeur!
      };
      const nouvelleGarantiee: Garantiee = {
        devise: this.selectedDevise!,
        natureG: this.selectedNatureGId.libNG,
        demande: 0,
        valeur: this.selectedValeur!
      };

      this.garantiees.push(nouvelleGarantiee);

      this.ngService.ajouterGarantie(nouvelleGarantie);
      this.garanties = this.ngService.getGarantiesProposees();

      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'La garantie a été ajoutée avec succès' });
      this.reinitialiser();
    } else {
      console.warn('Veuillez sélectionner une nature de garantie.');
    }
  }

  reinitialiser() {
    this.selectedDevise = null;
    this.selectedNatureGId = null;
    this.selectedTypeG = null;
    this.selectedValeur = null;
  }

  ouvrirDialogg(g: Garantie): void {
    this.selectedGarantie = g;
    this.visible = true;
}
}
