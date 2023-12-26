import { Garantie } from "./Garantie";

export class DemandeRequest {
  etat: number = 0;
  DateDemande: Date = new Date();
  credit: {
    montant: number;
    unite: string;
    nbE: number;
    typeC: number;
  } = {
    montant: 0,
    unite: '',
    nbE: 0,
    typeC: 0
  };
  utilisateur: string = '';
  compte: string = '';
  garanties: any[] = []; 

  constructor() {
  }
}

