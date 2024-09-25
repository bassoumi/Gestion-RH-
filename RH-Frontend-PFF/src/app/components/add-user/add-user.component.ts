import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  formgroup: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';
  imageUrl: string | ArrayBuffer | null = null; 

  constructor(private userService: UsersService, private router: Router) {
    this.formgroup = new FormGroup({
      name: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      job: new FormControl('', Validators.required),
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
  }

  addUser() {
    if (this.formgroup.valid) {
      const addData = this.formgroup.value;

      this.userService.addUser(addData).subscribe({
        next: (data) => {
          console.log(data);
          const departmentValue = data.department;
          console.log(departmentValue);
          this.router.navigate([`/Department/${departmentValue}`]);
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

  ngAfterViewInit() {
    this.initializeJobSelect();
  }

  initializeJobSelect() {
    const departmentSelect = document.getElementById("department") as HTMLSelectElement;
    const jobSelect = document.getElementById("job") as HTMLSelectElement;

    departmentSelect.addEventListener("change", () => {
      const department = departmentSelect.value;

      jobSelect.innerHTML = '';

      if (department === "informatique") {
        jobSelect.innerHTML += '<option value="" disabled selected>Choisissez votre poste</option>';
        jobSelect.innerHTML += '<option value="Technicien supérieur">Technicien supérieur</option>';
        jobSelect.innerHTML += '<option value="Technicien">Technicien</option>';
        jobSelect.innerHTML += '<option value="Développeur">Développeur</option>';
      } else if (department === "vente") {
        jobSelect.innerHTML += '<option value="" disabled selected>Choisissez votre poste</option>';
        jobSelect.innerHTML += '<option value="Vendeur">Vendeur</option>';
        jobSelect.innerHTML += '<option value="Manager">Manager</option>';
      } else if (department === "achat") {
        jobSelect.innerHTML += '<option value="" disabled selected>Choisissez votre poste</option>';
        jobSelect.innerHTML += '<option value="Spécialiste des achats">Spécialiste des achats</option>';
      }
    });
  }
}
