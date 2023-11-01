import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { MobileViewComponent } from './components/mobile-view/mobile-view.component';

const routes: Routes = [
  // {
  //   path: '',
  //   resolve: { view: ViewResolver }
  // },
  {path:'',component:MobileViewComponent},
  { path: 'employees-list', component: EmployeesListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EmployeeDetailComponent },
  { path: 'read-employee/:id', component: EmployeeDetailComponent },
  { path: 'delete-employee/:id', component: EmployeeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
