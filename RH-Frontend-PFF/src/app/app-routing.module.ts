import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DepartmentComponent } from './department/department.component';
import { InformatiqueComponent } from './department/informatique/informatique.component';
import { VenteComponent } from './department/vente/vente.component';
import { AchatComponent } from './department/achat/achat.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './super-user.guard'
import { HomeComponent } from './home/home.component';
import { UserGuard } from './user.guard';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { DemandeConeeComponent } from './demande-congee/demande-conee.component';
import { DemandeConsulterComponent } from './demande-consulter/demande-consulter.component';
import { ChangerMotDePasseComponent } from './changer-mot-de-passe/changer-mot-de-passe.component';
import { HistoriqueComponent } from './historique/historique.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { LesDemandesComponent } from './les-demandes/les-demandes.component';
import { FormationComponent } from './formation/formation.component';
import { ConsulterLesFormationsComponent } from './consulter-les-formations/consulter-les-formations.component';
import { EmployeeIntersseeComponent } from './employee-interssee/employee-interssee.component';



const routes: Routes = [
  { path: 'viewAll', component: ViewUsersComponent, canActivate: [AuthGuard] },
  { path: 'myprofile', component: MyprofileComponent, canActivate: [UserGuard] },
  { path: 'myprofile/PasswordRest', component: ChangerMotDePasseComponent, canActivate: [UserGuard] },
  { path: 'myprofile/historique', component: HistoriqueComponent, canActivate: [UserGuard] },
  { path: 'demande', component: DemandeConsulterComponent, canActivate: [AuthGuard] },
  { path: 'myprofile/congé', component: DemandeConeeComponent, canActivate: [UserGuard] },
  { path: 'home', component: HomeComponent, canActivate: [UserGuard]},
  { path: 'add', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: 'Department', component: DepartmentComponent, canActivate: [AuthGuard] },
  { path: 'Department/informatique', component: InformatiqueComponent, canActivate: [AuthGuard] },
  { path: 'Department/vente', component: VenteComponent, canActivate: [AuthGuard] },
  { path: 'Department/achat', component: AchatComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardAdminComponent },
  { path: 'les-Demandes', component: LesDemandesComponent },
  { path: 'add-formation', component: FormationComponent },
  { path: 'formation', component: ConsulterLesFormationsComponent },
  { path: 'employee-interssee', component: EmployeeIntersseeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
