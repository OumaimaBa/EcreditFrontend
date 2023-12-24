import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthResponseDTO } from 'src/app/models/AuthResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8089/api/auth'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  login(loginDto: any): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiUrl}/register`, loginDto);
  }
}
