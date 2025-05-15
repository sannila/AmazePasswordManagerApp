import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LandingPageComponent } from './pages/dashboard/landing-page/landing-page.component';
import { CategoryComponent } from './pages/category/category.component';
import { CredentialStoreComponent } from './pages/credential-store/credential-store.component';
import { ActivityLogsComponent } from './pages/activity-logs/activity-logs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGaurd } from './helpers/auth.gaurd';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGaurd],
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
            },
            {
                path: 'category',
                component: CategoryComponent,
                title: 'Category'
            },
            {
                path: 'credentialStore',
                component: CredentialStoreComponent,
                title: 'Credential Store'
            },
            {
                path: 'activityLogs',
                component: ActivityLogsComponent,
                title: 'Activity Logs'
            },
            {
                path: 'profile',
                component: ProfileComponent,
                title: 'Profile'
            }
        ]
    }
];
