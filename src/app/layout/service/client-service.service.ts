import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyClient } from '../../model/client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiServerUrl = `${environment.apiUrl}/clients`;
  constructor(private http:HttpClient) {}

  public getClients():Observable<AnyClient[]>{
    return this.http.get<AnyClient[]>(`${this.apiServerUrl}`)
  }

  public getClient(id: number):Observable<AnyClient>{
    return this.http.get<AnyClient>(`${this.apiServerUrl}/${id}`);
  }

  public addClient(client : AnyClient):Observable<AnyClient>{
    return this.http.post<AnyClient>(`${this.apiServerUrl}`,client);
  }
  
  public updateClient(client : AnyClient):Observable<AnyClient>{
    return this.http.put<AnyClient>(`${this.apiServerUrl}`,client);
  }

  public deleteClient(id:number):Observable<AnyClient>{
    return this.http.delete<AnyClient>(`${this.apiServerUrl}/${id}`);
  }

  public getClientByCompteId(id:number):Observable<AnyClient>{
    return this.http.get<AnyClient>(`${this.apiServerUrl}/comptes/${id}`);
  }

  

  

}
