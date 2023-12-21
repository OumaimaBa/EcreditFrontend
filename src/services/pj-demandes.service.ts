import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PjDemandes } from 'src/app/models/PjDemandes';

@Injectable({
  providedIn: 'root'
})
export class PjDemandesService {
  private apiUrl = 'http://localhost:8089/pjDemandes';

  constructor(private http: HttpClient) {}

  getAllPiecesJsDemandes(typeC: number): Observable<PjDemandes[]> {
    const url = `${this.apiUrl}/${typeC}`;
    return this.http.get<PjDemandes[]>(url);
  }
}
