import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import User from '../User';
import formation from '../formation';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {
  username: string | null = '';
  clickedFormations: Set<string> = new Set(); 
  users: User[] = [];
  demandes: any[] = [];
  currentUser: any;
  title: string = '';
  formations: any[] = [];
  formationsInterssees: any[] = [];
  currentSlide: number = 0;
  demandesPresentes: boolean = false;

  constructor(private usersService: UsersService) {}
  
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    console.log('Retrieved username:', this.username); 
    this.usersService.getAllformationUser().subscribe(
      (formations: formation[]) => {
        this.formations = formations;
        this.formations.forEach((formation) => {
          console.log(formation.description);
        });
      },
      (error) => {
        console.error('Error fetching formations:', error);
      }
    );
  

    
    this.usersService.getUser().subscribe(data => {
      this.currentUser = data.find(user => user.name === this.username);
      console.log('Current user:', this.currentUser);
    });
    if (this.username) {
      this.usersService.getAllDemandes(this.username).subscribe(response => {
        this.demandes = JSON.parse(response.demandes);
        console.log('Demandes:', this.demandes); 
        this.demandesPresentes = this.demandes.length > 0;
        console.log(this.username); 
      });
    }
  }
    
  prevSlide(): void {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.formations.length - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide < this.formations.length - 1) ? this.currentSlide + 1 : 0;
  }

  interesseClicked(title: string) {
    if (this.username && !this.clickedFormations.has(title)) { // Ensure username is not null and not already clicked
      console.log('Title:', title);
      console.log('Username:', this.username);
      this.usersService.saveInterssee(this.username, title).subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.formationsInterssees.push(data);
          this.clickedFormations.add(title); // Add to clicked set
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


  




