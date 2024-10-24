import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import User from '../../User';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  userId: number = 1;
  selectedImage: string | ArrayBuffer | null = null;
  users: User[] = [];
  searchQuery: string = '';
  searchResults: User[] = [];

  currentSlideInformatique: number = 0; // Index for Informatique slides
  currentSlideVente: number = 0; // Index for Vente slides
  currentSlideAchat: number = 0; // Index for Achat slides
  usersPerPage: number = 3; // Number of users per slide

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userService.getUser().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

  loadUsers(): void {
    this.userService.getUser().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

  hasVenteUsers(): boolean {
    return this.users.some(user => user.department === 'vente');
  }

  hasAchatUsers(): boolean {
    return this.users.some(user => user.department === 'achat');
  }

  deleteUser(id: number): void {
    this.userService.deleteUserById(id).subscribe(data => {
      console.log(data);
      this.loadUsers(); 
    });
  }

  hasInformatiqueUsers(): boolean {
    return this.users.some(user => user.department === 'informatique');
  }

  getInformatiqueUsers(): User[] {
    return this.users.filter(user => user.department === 'informatique');
  }

  getVenteUsers(): User[] {
    return this.users.filter(user => user.department === 'vente');
  }

  getAchatUsers(): User[] {
    return this.users.filter(user => user.department === 'achat');
  }

  // Separate visible user methods for each department
  getVisibleInformatiqueUsers(): User[] {
    const startIndex = this.currentSlideInformatique * this.usersPerPage;
    return this.getInformatiqueUsers().slice(startIndex, startIndex + this.usersPerPage);
  }

  getVisibleVenteUsers(): User[] {
    const startIndex = this.currentSlideVente * this.usersPerPage;
    return this.getVenteUsers().slice(startIndex, startIndex + this.usersPerPage);
  }

  getVisibleAchatUsers(): User[] {
    const startIndex = this.currentSlideAchat * this.usersPerPage;
    return this.getAchatUsers().slice(startIndex, startIndex + this.usersPerPage);
  }

  // Informatique slides
  prevSlideInformatique(): void {
    this.currentSlideInformatique = (this.currentSlideInformatique > 0) ? this.currentSlideInformatique - 1 : Math.floor(this.getInformatiqueUsers().length / this.usersPerPage);
  }

  nextSlideInformatique(): void {
    this.currentSlideInformatique = (this.currentSlideInformatique < Math.floor(this.getInformatiqueUsers().length / this.usersPerPage)) ? this.currentSlideInformatique + 1 : 0;
  }

  // Vente slides
  prevSlideVente(): void {
    this.currentSlideVente = (this.currentSlideVente > 0) ? this.currentSlideVente - 1 : Math.floor(this.getVenteUsers().length / this.usersPerPage);
  }

  nextSlideVente(): void {
    this.currentSlideVente = (this.currentSlideVente < Math.floor(this.getVenteUsers().length / this.usersPerPage)) ? this.currentSlideVente + 1 : 0;
  }

  // Achat slides
  prevSlideAchat(): void {
    this.currentSlideAchat = (this.currentSlideAchat > 0) ? this.currentSlideAchat - 1 : Math.floor(this.getAchatUsers().length / this.usersPerPage);
  }

  nextSlideAchat(): void {
    this.currentSlideAchat = (this.currentSlideAchat < Math.floor(this.getAchatUsers().length / this.usersPerPage)) ? this.currentSlideAchat + 1 : 0;
  }
}

