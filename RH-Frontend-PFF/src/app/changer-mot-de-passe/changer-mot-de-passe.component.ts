import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.css']
})
export class ChangerMotDePasseComponent {

  oldPassword: string = '';
  newPassword: string = '';
  message: string = '';
  constructor(private usersService: UsersService,private router: Router) {}


  onSubmit(): void {
    this.usersService.changePassword(this.oldPassword, this.newPassword).subscribe(
        response => {
            this.message = 'Mot de passe changé avec succès';
            this.router.navigate([`/myprofile`]);
        },
        error => {
            if (error.error && error.error.error) {
                this.message = error.error.error; 
            } else {
                this.message = 'Erreur lors du changement de mot de passe';
            }
        }
    );
  }
}
