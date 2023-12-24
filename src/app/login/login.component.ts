import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string = '';
  password: string = '';

  constructor(private router: Router,private appComponent: AppComponent,private authService: LoginService) {
  }

  ngOnInit(): void {
  }

  onConnexion() {
    const loginDto = { login: this.login, mdp: this.password };

    this.authService.login(loginDto)
      .subscribe(response => {
        // Gérez la réponse ici, par exemple, stockez le token dans le stockage local
        this.appComponent.isLoggedIn=true;
        this.router.navigate(['/demande']);
        console.log('Token:', response.token);
      }, error => {
        console.error('Erreur de connexion:', error);
      });
  }

}

