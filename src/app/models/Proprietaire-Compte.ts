export interface Proprietaire {
    nom?: string;
    prenom?: string;
    dateNaiss?: Date;
    comptes?: Compte[];
    cin?: string;
    sf?: string;
  }
  
  export interface Compte {
    numCompte?: string;
    dateOuv?: Date;
    devise?: string;
    proprietaire?: string;
  }
  