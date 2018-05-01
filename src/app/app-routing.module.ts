import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullComponent} from "./layouts/full/full.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {SymbolsComponent} from "./pages/symbols/symbols.component";

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'symbols', component: SymbolsComponent}
    ]
  },
  /*{
    path: '',
    component: BlankComponent,
    children: [
      {path: 'signup', component: SignupComponent, canActivate: [GuestGuardService]},
      {path: 'login', component: LoginComponent, canActivate: [GuestGuardService]},
    ]
  },*/
  {path: '**', redirectTo: '/dashboard'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
