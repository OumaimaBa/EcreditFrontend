import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseDTO } from 'src/app/models/AuthResponseDTO';
import { tap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://192.168.56.10:8085/api/auth'; 
  private readonly tokenKey = 'token';
  private authToken: string | null = null; 
  public  utilisateur:string='';
  constructor(private http: HttpClient) { }

  login(loginDto: any): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiUrl}/login`, loginDto)
      .pipe(
        tap(response => this.saveToken(response.accessToken))
      );
  }

  private saveToken(token: string): void {
    this.authToken = token;
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.authToken;
  }

  logout(): void {
    this.authToken = null;
    localStorage.removeItem(this.tokenKey);
  }
  
}
