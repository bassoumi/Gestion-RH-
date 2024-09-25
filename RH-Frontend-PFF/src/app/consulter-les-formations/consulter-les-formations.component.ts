import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import formation from '../formation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulter-les-formations',
  templateUrl: './consulter-les-formations.component.html',
  styleUrls: ['./consulter-les-formations.component.css']
})
export class ConsulterLesFormationsComponent {
  formations: any[] = [];

  constructor(private usersService: UsersService,private http: HttpClient) {}

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
  deleteFormation(formationId: number) {
    this.usersService.deleteFormation(formationId).subscribe(
      () => {
        this.ngOnInit()
        console.log('Formation deleted successfully');
        // Vous pouvez ajouter ici d'autres logiques après la suppression si nécessaire
      },
      error => {
        console.error('Error deleting formation:', error);
        // Gérez les scénarios d'erreur ici
      }
    );
  }
}
