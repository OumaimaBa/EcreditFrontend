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
  const loginValide = 'OumaimaBa';
  const mdpValide = 'Oumaima.9999';

  this.messageService.clear();

    // Login statique réussi
    this.appComponent.isLoggedIn = true;
    this.authService.utilisateur = this.login; // stocke le login
    this.router.navigate(['/demande']);
}

afficherMessageErreur(message: string): void {
  this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message });
}


}

