export interface Proprietaire {
    cin: string;
    mdp: string;
    nom: string;
    prenom: string;
    dateNaiss: Date;
    sf: string;
  }
  
  export interface PieceJs {
    idPJ: number;
    document: string;
    obg: number;
    statut: number;
    PJ: ArrayBuffer;
    demande: number;
  }

    
  export interface Compte {
    numCompte?: string;
    dateOuv?: Date;
    devise?: string;
    proprietaire?: string;
  }
  
  
  export interface Historique {
    idHis: number;
    observation: string;
    etat: number;
    DateDemande: Date;
    demande: number;
  }
  
  export interface Credit {
    idCredit: number;
    montant: number;
    unite: string;
    nbE : number;
    typeC: number;
  }
  
  export interface Garantie {
    idGarantie: number;
    valeur: string;
    devise: string;
    demande: number;
    typeG: number;
  }

  export interface Demande {
    idDemande: number,
    observation: string,
    etat: number,
    credit: number,
    utilisateur: string,
    compte: string,
    dateDemande: Date
  }
  
  export interface DemandeResponse {
    nomC : string;
    demande: Demande;
    prop: Proprietaire;
    saisisseur: string;
    compte: Compte;
    credit: Credit;
    pjs: PieceJs[];
    garanties: Garantie[];
    historiques: Historique[];
  }