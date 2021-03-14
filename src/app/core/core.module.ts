import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { ViewCoreComponent } from './view-core/view-core.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { ShareModule } from '../share/share.module';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [ViewCoreComponent, HomeLayoutComponent, AuthComponent, LoginComponent],

  imports: [
    CoreRoutingModule,
    ShareModule
  ],
  exports: [
  ],
  providers: [AuthService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorServiceService,
    //   multi: true
    // }
  ]
})
export class CoreModule { }
