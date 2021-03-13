import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { EmpRoutingModule } from './emp-routing.module';



@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    EmpRoutingModule
  ],
  exports:[
    EmployeeComponent
  ]
})
export class EmpModule { }
