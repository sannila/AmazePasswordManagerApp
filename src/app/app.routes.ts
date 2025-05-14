import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LandingPageComponent } from './pages/dashboard/landing-page/landing-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,        
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'landingPage', pathMatch: 'full'
            },
            {
                path: 'landingPage',
                component: LandingPageComponent,
                title: "Dashboard"
            },
            {
                path: 'user',
                component: UsersComponent,
                title: 'User'
            }
        ]
    }
];
