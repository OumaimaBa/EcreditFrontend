import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginService } from 'src/services/login.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login!: string;
  mdp!: string;
  showErrorMessage: boolean = false;

  constructor(private messageService: MessageService,private router: Router,private appComponent: AppComponent,private authService: LoginService) {
  }

  ngOnInit(): void {
  }

  onConnexion() {
    const loginDto = { login: this.login, mdp: this.mdp };

    this.messageService.clear();

    this.authService.login(loginDto).subscribe({
      next: data => {
        if (data && data.accessToken) {
          this.appComponent.isLoggedIn = true;
          this.router.navigate(['/demande']);
          this.authService.utilisateur = this.login;
        } else {
          console.error('La réponse ne contient pas un jeton valide. Réponse:', data);
          this.messageService.clear();
          this.afficherMessageErreur('Nom d\'utilisateur ou mot de passe incorrect.');
        }
      },
      error: error => {
        console.error('Erreur de connexion:', error);
        this.messageService.clear();
        this.afficherMessageErreur('Nom d\'utilisateur ou mot de passe incorrect.');
      }
    });
  }

  afficherMessageErreur(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
  }


}

