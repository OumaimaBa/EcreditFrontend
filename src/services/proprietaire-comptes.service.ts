import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireComptesService {

  private apiUrl = 'http://localhost:8089/proprietaire';
  constructor(private http: HttpClient) { }
  
  getInfosClient(cin: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cin}`);
  }

}
