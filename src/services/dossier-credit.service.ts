import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeC } from '../app/models/TypeC';

@Injectable({
  providedIn: 'root'
})

export class TypeCService {
  private apiUrl = 'http://localhost:8089/typeC';

  constructor(private http: HttpClient) { }

  getAllTypesC(): Observable<TypeC[]> {
    return this.http.get<TypeC[]>(`${this.apiUrl}/all`);
  }
}
