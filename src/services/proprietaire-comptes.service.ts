import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proprietaire } from 'src/app/models/Proprietaire-Compte';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireComptesService {

  private apiUrl = 'http://localhost:8089/';
  constructor(private http: HttpClient) { }
  
  getInfosClient(cin: string): Observable<Proprietaire> {
    return this.http.get<Proprietaire>(`${this.apiUrl}proprietaire/${cin}`);
  }

  getComptesClient(cin: string): Observable<any> {
    return this.http.get(`${this.apiUrl}compte/${cin}`);
  }

}
