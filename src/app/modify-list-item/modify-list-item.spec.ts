import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyListItem } from './modify-list-item';

describe('ModifyListItem', () => {
  let component: ModifyListItem;
  let fixture: ComponentFixture<ModifyListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
