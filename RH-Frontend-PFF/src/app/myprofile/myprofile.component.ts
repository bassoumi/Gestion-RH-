import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import User from '../User';
import formation from '../formation';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  username: string | null = '';
  clickedFormations: Set<string> = new Set(); 
  users: User[] = [];
  demandes: any[] = [];
  currentUser: any = {};  // Initialisation pour éviter les erreurs d'accès
  title: string = '';
  formations: any[] = [];
  formationsInterssees: any[] = [];
  currentSlide: number = 0;
  demandesPresentes: boolean = false;

  constructor(private usersService: UsersService) {}
  
  ngOnInit(): void {
    // Récupérer le nom d'utilisateur stocké localement
    this.username = localStorage.getItem('username');
    console.log('Retrieved username:', this.username); 
    
    // Charger les formations de l'utilisateur
    this.usersService.getAllformationUser().subscribe(
      (formations: formation[]) => {
        this.formations = formations;
        console.log('Formations:', this.formations);
      },
      (error) => {
        console.error('Error fetching formations:', error);
      }
    );
    
    this.usersService.getUser().subscribe(
      data => {
        console.log('Tous les utilisateurs', data);
        // Comparer en utilisant `toLowerCase()` pour rendre la recherche insensible à la casse
        this.currentUser = data.find(user => user.name.toLowerCase() === this.username?.toLowerCase()) || {};
        console.log('Current user loaded:', this.currentUser);
        
        // Vérifiez le contenu de `currentUser` après l'assignation
        if (this.currentUser) {
          console.log('currentUser.email:', this.currentUser.email);
          console.log('currentUser.department:', this.currentUser.department);
          console.log('currentUser.job:', this.currentUser.job);
          console.log('currentUser.phone:', this.currentUser.phone);
        }
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
    

    // Si le nom d'utilisateur est présent, charger les demandes associées
    if (this.username) {
      this.usersService.getAllDemandes(this.username).subscribe(
        response => {
          try {
            this.demandes = JSON.parse(response.demandes);
            console.log('Demandes:', this.demandes); 
            this.demandesPresentes = this.demandes.length > 0;
          } catch (e) {
            console.error('Error parsing demandes JSON:', e);
          }
        },
        error => {
          console.error('Error fetching demandes:', error);
        }
      );
    }
  }

  // Navigation entre les slides
  prevSlide(): void {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.formations.length - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide < this.formations.length - 1) ? this.currentSlide + 1 : 0;
  }

  // Action lorsqu'une formation est cliquée
  interesseClicked(title: string) {
    if (this.username && !this.clickedFormations.has(title)) {
      console.log('Title:', title);
      console.log('Username:', this.username);
      this.usersService.saveInterssee(this.username, title).subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.formationsInterssees.push(data);
          this.clickedFormations.add(title); 
          console.log('Formations intéressées:', this.formationsInterssees);
        },
        (error) => {
          console.error('Erreur lors de la récupération des formations intéressées:', error);
        }
      );
    } else {
      console.error('Username is null or Formation already clicked');
    }
  }
}
