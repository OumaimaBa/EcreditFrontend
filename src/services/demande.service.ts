import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande, DemandeResponse } from 'src/app/models/Demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:8089/demande'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getAllDemandes(): Observable<DemandeResponse[]> {
    return this.http.get<DemandeResponse[]>(`${this.apiUrl}/getAllDemandes`);
  }

  updateDemande(id: number, nouvelEtat: number): Observable<any> {
    const url = `${this.apiUrl}/update/${id}/${nouvelEtat}`;
    return this.http.put(url, null); 
  }

  getDemandeById(id: number): Observable<any> {
    const url = `${this.apiUrl}/getDemandeById/${id}`;
    return this.http.get(url);
  }
}
