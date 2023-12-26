import { Component, Output, EventEmitter } from '@angular/core';
import { navbarData } from './nav-data';
import { LoginService } from 'src/services/login.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false; // Initialiser à true pour avoir le volet latéral fermé par défaut
  screenWidth = 0;
  navData = navbarData;

  constructor(private router: Router,private appComponent: AppComponent,private authService: LoginService) {
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  onLogoutClick(): void {
    this.authService.logout();
  }
  
}
