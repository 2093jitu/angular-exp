import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCoreComponent } from './view-core/view-core.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthComponent } from './auth/auth.component';

const routes : Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: AuthComponent
      }
    ]
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'view-core',
    component: ViewCoreComponent,
  },
  {
    path: 'emp',
    component: HomeLayoutComponent,
    loadChildren:'../employee/emp.module#EmpModule'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class CoreRoutingModule { }
