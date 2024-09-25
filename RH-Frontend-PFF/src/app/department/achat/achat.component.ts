import { Component } from '@angular/core';
import User from 'src/app/User';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css']
})
export class AchatComponent {
  users: any[] | undefined;
  searchQuery: string = '';
  searchResults: User[] = [];
  searchQueryPhone: string = '';
  searchQueryDepartment: string = '';
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
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
  onSearch(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior

    this.userService.searchUsers(this.searchQueryPhone, this.searchQueryDepartment).subscribe(
      (data: User[]) => {
        console.log('Search results:', data);
        this.searchResults = data; // Manipuler les résultats de recherche ici
      },
      (error) => {
        console.error('Search error', error);
      }
    );
  }
}
