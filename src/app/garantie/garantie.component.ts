import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { GarantieService } from '../../services/garantie.service';
import { Garantie } from '../models/Garantie';
import { TypeG } from '../models/TypeG';
import { NatureG } from '../models/NatureG';

@Component({
  selector: 'app-garantie',
  templateUrl: './garantie.component.html',
  styleUrls: ['./garantie.component.css']
})
export class GarantieComponent implements OnInit {
  garanties: Garantie[] = [];
  selectedNatureGId: any;
  selectedTypeG: any;
  selectedValeur: any;
  selectedDevise: any;

  typesG: TypeG[]=[];
  visible: boolean = false;
  naturesG: NatureG[] = [];
  devises: string[] = ['DT'];
  
  constructor(private gService: GarantieService, private dialogService: DialogService, private messageService: MessageService, private ngService:GarantieService) {

  }
  


  ngOnInit(): void {
    this.ngService.getAllNaturesG().subscribe(data => {
      this.naturesG = data;
    });
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
  
  enregistrerGarantie() {
    if (this.selectedNatureGId) {
      const nouvelleGarantie: Garantie = {
        devise: this.selectedDevise!,
        natureG: this.selectedNatureGId.libNG,
        typeG: this.selectedTypeG?.libTG,
        valeur: this.selectedValeur!
      };
  
      this.ngService.ajouterGarantie(nouvelleGarantie);
      this.garanties = this.ngService.garantiesProposees;
      console.log("Garanties après l'ajout :", this.garanties);
    } else {
      console.warn('Veuillez sélectionner une nature de garantie.');
    }
  }
  
  reinitialiser() {
    this.selectedDevise=null;
    this.selectedNatureGId=null;
    this.selectedTypeG=null;
    this.selectedValeur=null;
  }
}