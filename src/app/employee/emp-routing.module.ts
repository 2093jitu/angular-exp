import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ViewCoreComponent } from '../core/view-core/view-core.component';

const routes: Routes = [
  {
    path: 'view-emp',
    component: EmployeeComponent,
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpRoutingModule { }
