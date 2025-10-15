import { bootstrapApplication } from '@angular/platform-browser';  //bootstrapApplication is a function that bootstraps the application
import { provideRouter } from  '@angular/router';  //provideRouter is a function that provides the router configuration
import { Routes } from '@angular/router';  //Routes is a type that defines the routes of the application
import { AppComponent } from './app/app';

const routes: Routes = [
  //Home Route
  {
    path: '',
    loadComponent: () => import('./app/app').then(m => m.AppComponent)
  },
  //Task List Route
  {
    path: 'task-list',
    loadComponent: () => import('./app/task-list/task-list').then(m => m.TaskList)
  },
  //Task Detail Route
  {
    path: 'task-detail/:id',
    loadComponent: () => import('./app/task-list-item/task-list-item').then(m => m.TaskListItem)
  },
  //Task Form Route
  {
    path: 'task-form',
    loadComponent: () => import('./app/task-form/task-form').then(m => m.TaskForm)
  }

];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));
