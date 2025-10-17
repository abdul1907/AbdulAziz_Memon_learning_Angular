import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  //constructor: Angular lifecycle hook that is called when the component is instantiated
  constructor() {
    console.log('Page Not Found component loaded - Route Guard placeholder ready');
  }
}
