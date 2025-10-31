import { bootstrapApplication } from '@angular/platform-browser';  //bootstrapApplication is a function that bootstraps the application
import { provideRouter } from  '@angular/router';  //provideRouter is a function that provides the router configuration
import { Routes } from '@angular/router';  //Routes is a type that defines the routes of the application
import { AppComponent } from './app/app';
import { TaskList } from './app/task-list/task-list';
import { TaskListItem } from './app/task-list-item/task-list-item';
import { ModifyListItem } from './app/modify-list-item/modify-list-item';
import { PageNotFound } from './app/page-not-found/page-not-found';

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
    component: TaskListItem
  },
  //Create Route without id (opens empty form to add new task)
  {
    path: 'modify-list-item',
    component: ModifyListItem
  },
  //Modify List Item Route with dynamic parameter
  {
    path: 'modify-list-item/:id',
    component: ModifyListItem
  },
  //Wildcard route for 404 page - must be last
  {
    path: '**',
    component: PageNotFound
  }

];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));
