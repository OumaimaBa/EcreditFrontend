import { Injectable } from '@angular/core';
import { Compte } from '../../model/compte';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private apiServerUrl = "http://localhost:8080/comptes";
  constructor(private http: HttpClient) { }

  public getComptes(): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${this.apiServerUrl}`)
  }

  public getCompte(id: number): Observable<Compte> {
    return this.http.get<Compte>(`${this.apiServerUrl}/${id}`);
  }

  public addCompte(client: Compte): Observable<Compte> {
    return this.http.post<Compte>(`${this.apiServerUrl}`, client);
  }

  public updateCompte(client: Compte): Observable<Compte> {
    return this.http.put<Compte>(`${this.apiServerUrl}`, client);
  }

  public deleteCompte(id: number): Observable<Compte> {
    return this.http.delete<Compte>(`${this.apiServerUrl}/${id}`);
  }
  getCompteByDossierId(dossierId: number): Observable<Compte> {
    return this.http.get<Compte>(`${this.apiServerUrl}/dossier/${dossierId}`);
  }
  getCount(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/_count`);
  }

  getCountLastMonth(date: string): Observable<number> {
    const params = new HttpParams().set('date', date);
    return this.http.get<number>(`${this.apiServerUrl}/_count/lastMonth`, { params });
  }
}
