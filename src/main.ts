import { bootstrapApplication } from '@angular/platform-browser';  //bootstrapApplication is a function that bootstraps the application
import { provideRouter } from  '@angular/router';  //provideRouter is a function that provides the router configuration
import { Routes} from '@angular/router';  //Routes is a type that defines the routes of the application
import { AppComponent } from './app/app';
import { TaskList } from './app/task-list/task-list';
import { InMemoryDataService } from './app/services/in-memory-data-service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';  
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

const routes: Routes = [
  //Home route - loads TaskList in AppComponent's router-outlet
  {
    path: '',
    redirectTo: '/task-list',
    pathMatch: 'full'
  },
  //Task List Route
  {
    path: 'task-list',
    component: TaskList
  },
  //Task Detail Route with dynamic parameter
  {
    path: 'task-detail/:id',
    loadComponent: () => import('./app/task-list-item/task-list-item').then(m => m.TaskListItem)
  },
  //Create Route without id (opens empty form to add new task)
  {
    path: 'modify-list-item',
    loadComponent: () => import('./app/modify-list-item/modify-list-item').then(m => m.ModifyListItem)
  },
  //Modify List Item Route with dynamic parameter
  {
    path: 'modify-list-item/:id',
    loadComponent: () => import('./app/modify-list-item/modify-list-item').then(m => m.ModifyListItem)
  },
  //Wildcard route for 404 page - must be last
  {
    path: '**',
    loadComponent: () => import('./app/page-not-found/page-not-found').then(m => m.PageNotFound)
  }

];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    importProvidersFrom(
      (HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 1000 }))
    )
  ]
})
  .catch((err) => console.error(err));
