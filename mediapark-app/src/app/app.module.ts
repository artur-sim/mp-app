import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './appRouter.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserAuthService } from './services/auth.service';
import { DataComponent } from './data/data.component';
import { DataComponentService } from './services/data.service';
import { DataEditComponent } from './data/data-edit/data-edit.component';
import { SortPipe } from './pipes/sort.pipe';
import { DataDetailComponent } from './data/data-detail/data-detail.component';
import { DataColumnComponent } from './data/data-column/data-column.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DataListComponent } from './data/data-list/data-list.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    DataComponent,
    DataEditComponent,
    SortPipe,
    DataDetailComponent,
    DataColumnComponent,
    DataListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UserAuthService, DataComponentService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
