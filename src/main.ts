import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from  '@angular/router';
import { Routes } from '@angular/router';
import { AppComponent } from './app/app';

const routes: Routes = [

];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));
