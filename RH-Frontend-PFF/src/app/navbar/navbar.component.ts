import { Component, HostListener } from '@angular/core';
import { UsersService } from '../users.service';
import { NavigationEnd, Router } from '@angular/router';
import demande from '../demande';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showDropdown = false;
  demandes: demande[] = [];
  hasNewDemandes: boolean = false;
  showDemandesDropdown = false;

  constructor(public authService: UsersService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveLink(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {
    this.authService.checkAuthenticated().subscribe();
    this.getDemandes();
  }

  logout() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      this.authService.logout(refreshToken).subscribe(
        () => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Logout error', error);
        }
      );
    }
  }

  setActiveLink(url: string) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.getAttribute('routerLink') === url) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }


  openDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }


  closeDropdown(): void {
    this.showDropdown = false;
  }





  getDemandes(): void {
    this.authService.getDemandes().subscribe((data: any[]) => {
      this.demandes = data;
      this.hasNewDemandes = this.demandes.length > 0;
    });
  }
}
