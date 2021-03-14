import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorServiceService } from './core/service/token-interceptor-service.service'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ShareModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorServiceService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
