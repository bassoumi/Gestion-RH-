import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DepartmentComponent } from './department/department.component';
import { InformatiqueComponent } from './department/informatique/informatique.component';
import { VenteComponent } from './department/vente/vente.component';
import { AchatComponent } from './department/achat/achat.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { DemandeConeeComponent } from './demande-congee/demande-conee.component';
import { DemandeConsulterComponent } from './demande-consulter/demande-consulter.component';
import { ChangerMotDePasseComponent } from './changer-mot-de-passe/changer-mot-de-passe.component';
import { HistoriqueComponent } from './historique/historique.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LesDemandesComponent } from './les-demandes/les-demandes.component';
import { FormationComponent } from './formation/formation.component';
import { ConsulterLesFormationsComponent } from './consulter-les-formations/consulter-les-formations.component';
import { EmployeeIntersseeComponent } from './employee-interssee/employee-interssee.component';
import { CapitalizeWordsPipe, TruncatePipe } from './truncate.pipe';






@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UpdateUserComponent,
    ViewUsersComponent,
    NavbarComponent,
    DepartmentComponent,
    InformatiqueComponent,
    VenteComponent,
    AchatComponent,
    LoginComponent,
    HomeComponent,
    MyprofileComponent,
    DemandeConeeComponent,
    DemandeConsulterComponent,
    ChangerMotDePasseComponent,
    HistoriqueComponent,
    DashboardAdminComponent,
    LesDemandesComponent,
    FormationComponent,
    ConsulterLesFormationsComponent,
    EmployeeIntersseeComponent,
    TruncatePipe,
    CapitalizeWordsPipe,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgxChartsModule,
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
