import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-conee',
  templateUrl: './demande-conee.component.html',
  styleUrls: ['./demande-conee.component.css']
})
export class DemandeConeeComponent {
  formgroup: FormGroup;
  errorMessage: string = '';
  username: string;
  

  constructor(private userService: UsersService, private router: Router) {
    this.username = localStorage.getItem('username') || '';

    this.formgroup = new FormGroup({
      user: new FormControl({ value: this.username, disabled: true }),
      title: new FormControl('', Validators.required),
      number_of_days: new FormControl('', Validators.required),
      date_debut: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required)
    });
  }
  addDemande(){
      if (this.formgroup.valid) {
        const formValues = { ...this.formgroup.getRawValue(), user: this.username };
        console.log(formValues)
        this.userService.addDemande(formValues).subscribe({
          next: (data) => {
            this.router.navigate([`/myprofile`]);
          },
          error: (e) => {
            console.log(e);
            if (e.error && e.error.error) {
              this.errorMessage = e.error.error;
            } else {
              this.errorMessage = 'An error occurred while adding the user';
            }
          },
        });
      } else {
        console.log('Erreur: le formulaire n\'est pas valide');
      }
    
  }
  

}
