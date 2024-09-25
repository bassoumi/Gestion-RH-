import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-employee-interssee',
  templateUrl: './employee-interssee.component.html',
  styleUrls: ['./employee-interssee.component.css']
})
export class EmployeeIntersseeComponent {

  constructor(private usersService: UsersService) {}
  reponse: any[] = [];

  ngOnInit(): void {
    this.usersService.getAllInterssent().subscribe(
      response => {
        this.reponse = response;
        console.log('response:', this.reponse); 
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  }

