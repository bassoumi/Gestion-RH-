import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import formation from '../formation';

@Component({
  selector: 'app-les-demandes',
  templateUrl: './les-demandes.component.html',
  styleUrls: ['./les-demandes.component.css']
})
export class LesDemandesComponent {
  formations: any[] = [];
  currentSlide: number = 0;
  constructor(private usersService: UsersService) {}


  ngOnInit(): void {
    this.usersService.getAllformationAdmin().subscribe(
      (formations: formation[]) => {
        this.formations = formations;
        this.formations.forEach((formation) => {
          console.log(formation);
        });
      },
      (error) => {
        console.error('Error fetching formations:', error);
      }
    );
  }

}
