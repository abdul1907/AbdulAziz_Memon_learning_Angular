import { TestBed } from '@angular/core/testing';  // Angulat main utility for testing
import { AppComponent } from './app';

describe('AppComponent', () => {  //Describe groups related test cases together 
  beforeEach(() => { // beforeEach runs before each test case to set up test environment
    TestBed.configureTestingModule({  // ConfigureTestingModule sets up a testing module with required dependencies
      imports: [AppComponent]
    });
  });
  
  // 'it' defines an individual test case

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // fixture is a wrapper for the component and its template
    const app = fixture.componentInstance; // componentInstance gives access to the actual component instance
    expect(app).toBeTruthy(); //expect makes assertions about the test results , toBeTruthy checks if the app instance is created successfully , i.e., it is not null or undefined , toBeFalsy would check the opposite
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); 
    fixture.detectChanges(); //detectChanges triggers change detection to update view
    const compiled = fixture.nativeElement as HTMLElement; // nativeElement give access to the DOM element of the component
    expect(compiled.querySelector('h1')?.textContent).toContain('🌊 TaskTide');
  });
});
