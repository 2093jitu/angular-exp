import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCoreComponent } from './view-core/view-core.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { BrowserNavigationGuard } from './guard/browser-navigation.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [BrowserNavigationGuard],
    children: [
      {
        path: 'login',
        component: AuthComponent
      }
    ]
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-core',
    component: ViewCoreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'emp',
    component: HomeLayoutComponent,
    //loadChildren:'../employee/emp.module#EmpModule'   
    loadChildren: () => import('../employee/emp.module').then(m => m.EmpModule),
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class CoreRoutingModule { }
