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

  constructor(private messageService: MessageService,private router: Router,private appComponent: AppComponent,private authService: LoginService) {
  }

  ngOnInit(): void {
  }

  onConnexion() {

    const loginDto = { login: this.login, mdp: this.mdp };
    console.log(loginDto);
    this.authService.login(loginDto)
      .subscribe({
        next: data => {
          if (data && data.accessToken) {
            this.appComponent.isLoggedIn = true;
            this.router.navigate(['/demande']);
            this.messageService.add({severity:'success', summary:'Succès', detail:'La garantie a été ajoutée avec succès'});
            this.authService.utilisateur=this.login;
          } else {
            console.error('La réponse ne contient pas un jeton valide. Réponse:', data);
          }
        },
        error: error => {
          console.error('Erreur de connexion:', error);
        }
      });
  }
  
  
  

}

