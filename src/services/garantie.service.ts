import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NatureG } from '../app/models/NatureG';
import { TypeG } from '../app/models/TypeG';
import { Garantie } from 'src/app/models/Garantie';

@Injectable({
  providedIn: 'root'
})

export class GarantieService {
  private apiUrl = 'http://localhost:8089/';
  garantiesProposees:Garantie[]=[];


  constructor(private http: HttpClient) { }

  getAllNaturesG(): Observable<NatureG[]> {
    return this.http.get<NatureG[]>(`${this.apiUrl}natureG/all`);
  }
  getAllTypesG(natureG: number): Observable<TypeG[]> {
    const url = `${this.apiUrl}typeG/${natureG}`;
    return this.http.get<TypeG[]>(url);
  }

  ajouterGarantie(garantie: Garantie) {

    this.garantiesProposees.push(garantie);
    console.log(this.garantiesProposees,"ttttttt")
    this.garantiesProposees;
    
  }

  getGarantiesProposees() {
    // return this.garantiesProposees;
  }

}
