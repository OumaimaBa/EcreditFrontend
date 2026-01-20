
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyClient } from '../../model/client';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
private apiServerUrl = "http://localhost:8080/clients";
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
