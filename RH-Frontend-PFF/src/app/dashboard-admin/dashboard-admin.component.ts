import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import User from '../User';
import demande from '../demande';
import { AdminActionDemande } from '../adminactionDemande';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import request from '../request';
import { Color, ScaleType } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

  adminDemandes: AdminActionDemande[] = [];

  userData: any[] = [];
  demandeData: any[] = [];
  totalRequestsData: any[] = [];
  donutChartData: any[] = [];

  view: [number, number] = [700, 400];
  colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#7cb342', '#ef5350']
  };
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Status';
  yAxisLabel = 'Count';
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchAdminDemandes();
    this.prepareChartData(); // Initialisation des données pour le graphique des demandes
    this.prepareUserData().subscribe(data => { // Récupération et initialisation des données pour le graphique des utilisateurs
      this.userData = data;
    });
    this.fetchTotalRequestsData();
  }
  fetchAdminDemandes(): void {
    this.usersService.getAllDemandesAdmin().subscribe(data => {
      this.adminDemandes = data;
       console.log(data)
      this.prepareChartData();
    });
  }
  fetchTotalRequestsData(): void {
    this.usersService.getAllRequestAdmin().subscribe(data => {
      const requestsPerDay = this.getRequestsPerDay(data);
      this.totalRequestsData = this.prepareTotalRequestsChartData(requestsPerDay);
    });
  }

  prepareTotalRequestsChartData(requestsPerDay: { [key: string]: number }): any[] {
    return Object.keys(requestsPerDay).map(date => ({
      name: date,
      value: requestsPerDay[date]
    }));
  }


  getRequestsPerDay(demandes: request[]): { [key: string]: number } {
    return demandes.reduce((acc, demande) => {
      const date = new Date(demande.submitted_at).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 1;
      } else {
        acc[date]++;
      }
      return acc;
    }, {} as { [key: string]: number });
  }
  prepareChartData(): void {
    // Exemple de transformation des données pour un graphique à barres
    const statusCounts = this.getStatusCounts(); // Méthode à implémenter

    // Structure des données pour ngx-charts-bar-vertical
    this.demandeData = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));
  }

  getStatusCounts(): { [key: string]: number } {
    // Compter le nombre de demandes par statut
    const counts: { [key: string]: number } = {};
    this.adminDemandes.forEach(demande => {
      if (counts[demande.status]) {
        counts[demande.status]++;
      } else {
        counts[demande.status] = 1;
      }
    });
    return counts;
  }
  prepareUserData(): Observable<any[]> {
    return this.usersService.getUser().pipe(
      map(users => {
        // Transformation des données des utilisateurs en séries chronologiques pour le graphique
        const series = users.reduce((acc, user) => {
          const date = new Date(user.created_at).toISOString().split('T')[0]; // Extraction de la date au format YYYY-MM-DD
          if (!acc[date]) {
            acc[date] = 1;
          } else {
            acc[date]++;
          }
          return acc;
        }, {} as { [key: string]: number });

        const sortedSeries = Object.keys(series).sort().map(date => ({
          name: date,
          value: series[date]
        }));

        return [{
          name: 'Users',
          series: sortedSeries
        }];
      })
    );
  }
  
}
