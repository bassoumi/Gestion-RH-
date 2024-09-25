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
  constructor(private userService: UsersService) {}

 
  ngOnInit(): void {
    this.loadUsers();
    this.userService.getUser().subscribe(data => {
      this.users = data;
      console.log(data)
    });
    
  }

  loadUsers(): void {
    this.userService.getUser().subscribe(data => {
      this.users = data;
      console.log(data);
    });
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

  hasVenteUsers(): boolean {
    return this.users.some(user => user.department === 'vente');
  }
  hasAchatUsers(): boolean {
    return this.users.some(user => user.department === 'achat');
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
}
