import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from '../users.service';
import demande from '../demande';
@Component({
  selector: 'app-demande-consulter',
  templateUrl: './demande-consulter.component.html',
  styleUrls: ['./demande-consulter.component.css']
})
export class DemandeConsulterComponent {
  demandes: demande[] = [];
  countDemandes: number = 0;
  nombreDemandes: number = 0;
  confirmationMessage: string = '';
  confirmationClass: string = '';
  refreshInterval: any; 
  constructor(private UsersService: UsersService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getDemandes();
    this.startAutoRefresh(); 
  }

  getDemandes(): void {
    this.UsersService.getDemandes().subscribe((data: any[]) => {
      this.demandes = data;
      this.updateNombreDemandes(); 
    });
  }

  updateNombreDemandes(): void {
    this.nombreDemandes = this.demandes.length;
  }

  startAutoRefresh(): void {
    this.refreshInterval = setInterval(() => {
      this.getDemandes(); 
      this.updateNombreDemandes(); 
    }, 1000); 
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval); 
  }


  approuverDemande(demande: any): void {
    this.UsersService.approuverDemande(demande).subscribe(response => {
      console.log(demande);
      this.demandes = this.demandes.filter(d => d.id !== demande.id);
      this.confirmationMessage = 'La demande de  été approuvée';
      this.confirmationClass = 'alert-success';
    });
  }

  rejeterDemande(demande: any): void {
    this.UsersService.rejeterDemande(demande).subscribe(response => {
      console.log(response);
      this.demandes = this.demandes.filter(d => d.id !== demande.id);
      this.confirmationMessage = 'La demande a été refusée';
      this.confirmationClass = 'alert-danger';
    });
  }
}
