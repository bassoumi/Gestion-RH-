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
  constructor(public authService: UsersService , private router : Router) { this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.setActiveLink(event.urlAfterRedirects);
    }
  });}
 
  ngOnInit() {
    this.authService.checkAuthenticated().subscribe();
    this.getDemandes();
  }

  logout() {
    console.log('Logout clicked');
    console.log('Current localStorage:', localStorage);
    const refreshToken = localStorage.getItem('refresh_token');
    console.log('Retrieved refresh token:', refreshToken);

    if (refreshToken) {
      console.log('Refresh token found:', refreshToken);
      this.authService.logout(refreshToken).subscribe(
        response => {
          console.log('Logout response:', response);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Logout error', error);
        }
      );
    } else {
      console.log('No refresh token found');
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


  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); 
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.showDropdown = false;
    }
  }

  getDemandes(): void {
    this.authService.getDemandes().subscribe((data: any[]) => {
      this.demandes = data;
      this.hasNewDemandes = this.demandes.length > 0;
      console.log(this.demandes);
    });
  }
}