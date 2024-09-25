import { Component } from '@angular/core';
import User from 'src/app/User';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent {
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
    event.preventDefault(); 
    this.userService.searchUsers(this.searchQueryPhone, this.searchQueryDepartment).subscribe(
      (data: User[]) => {
        console.log('Search results:', data);
        this.searchResults = data; 
      },
      (error) => {
        console.error('Search error', error);
      }
    );
  }

}
