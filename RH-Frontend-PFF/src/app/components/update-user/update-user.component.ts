import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  data: any
  selectedFile: File | null = null;
  form: FormGroup;
  user: any = {
    id: null,
    name: '',
    email: '',
    department: '',
    adresse: '',
    phone: '',
    job: '',
    image: ''
  };
  constructor(private service: UsersService, private route: ActivatedRoute, private router : Router) {   this.form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
    image: new FormControl('', )
  });}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.service.getUserById(id).subscribe(data => {
      this.user = data
      console.log(this.user)
    })
  }


  submit() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')!.value);
    formData.append('email', this.form.get('email')!.value);
    formData.append('department', this.form.get('department')!.value);
    formData.append('adresse', this.form.get('adresse')!.value);
    formData.append('phone', this.form.get('phone')!.value);
    formData.append('job', this.form.get('job')!.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    this.service.updateUser(this.user.id, formData).subscribe(
      data => {
        console.log(data);
        // Mettre à jour l'image sans recharger la page
        if (this.selectedFile) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const imgElement = document.getElementById('userImage') as HTMLImageElement;
            if (imgElement) {
              imgElement.src = e.target.result;
            }
          };
          reader.readAsDataURL(this.selectedFile);
        }
        // Redirection vers le département approprié
        if (this.user.department === 'informatique') {
          this.router.navigate(['/Department/informatique']);
        } else if (this.user.department === 'achat') {
          this.router.navigate(['/Department/achat']);
        } else if (this.user.department === 'ventes') {
          this.router.navigate(['/Department/vente']);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  
    }

  deleteUser(id: number): void {
    this.service.deleteUserById(id).subscribe(data => {
      console.log(data);
      if (this.user.department === 'informatique') {
        this.router.navigate(['/Department/informatique']);
      } else if (this.user.department === 'achat') {
        this.router.navigate(['/Department/achat']);
      } else if (this.user.department === 'vente') {
        this.router.navigate(['/Department/vente']);
      } 
  
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        if (this.user) {
          this.user.image = reader.result as string;
        } else {
          console.error('User object is undefined');
        }
      };
      reader.readAsDataURL(file);
    }
  }


}
