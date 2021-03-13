import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewCoreComponent } from './core/view-core/view-core.component';
import { ShareModule } from './share/share.module';
import { ShareViewComponent } from './share/share-view/share-view.component';
import { CoreModule } from './core/core.module';
import { EmployeeComponent } from './employee/employee/employee.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
