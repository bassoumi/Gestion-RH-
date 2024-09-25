import { Component } from '@angular/core';
import formation from '../formation';
import { UsersService } from '.././users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent {
  formation: formation = {
    title: '',
    description: '',
    date: '',
    duration: '',
    location: '',
    image: ''
  };

  formgroup: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';
  imageUrl: string | ArrayBuffer | null = null; 

  constructor(private userService: UsersService, private router: Router) {
    this.formgroup = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      image: new FormControl(null)
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.formgroup.patchValue({ image: file });
    this.formgroup.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageUrl = e.target!.result; 
    };
    reader.readAsDataURL(file);
    this.selectedFile = file;  // Store the file in the component
  }

  addFormation() {
    if (this.formgroup.valid) {
      const formData = new FormData();
      formData.append('title', this.formgroup.get('title')?.value);
      formData.append('description', this.formgroup.get('description')?.value);
      formData.append('date', this.formgroup.get('date')?.value);
      formData.append('duration', this.formgroup.get('duration')?.value);
      formData.append('location', this.formgroup.get('location')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.userService.addFormation(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/les-Demandes']);
        },
        error: (e) => {
          console.log(e);
          if (e.error && e.error.error) {
            this.errorMessage = e.error.error;
          } else {
            this.errorMessage = 'An error occurred while adding the formation';
          }
        },
      });
    } else {
      console.log('Erreur: le formulaire n\'est pas valide');
    }
  }
}
