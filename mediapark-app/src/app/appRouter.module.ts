import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { DataComponent } from './data/data.component';
import { DataEditComponent } from './data/data-edit/data-edit.component';
import { DataDetailComponent } from './data/data-detail/data-detail.component';
import { DataColumnComponent } from './data/data-column/data-column.component';
import { AuthGuard } from './guards/auth-guard.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/data', pathMatch: 'full' },

    {
        path: 'data', canActivate: [AuthGuard], component: DataComponent, children: [
            // { path: '', component: DataDetailComponent },
            { path: 'new', component: DataDetailComponent },
            { path: 'new/column', component: DataColumnComponent },
            { path: ':id', component: DataDetailComponent },
            { path: 'edit/:id', component: DataEditComponent }
        ]
    },

    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SingupComponent },
]




@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})


export class AppRoutingModule {

}