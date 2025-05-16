import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtTokenInterceptor } from './helpers/jwt-token.interceptor';
import { errorHandlerInterceptor } from './helpers/error-handler.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([jwtTokenInterceptor, errorHandlerInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
            theme: {
                preset: Aura
            }
        })
  ]
};
