import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPageComponent } from '@src/app/pages/books-page/books-page.component';

describe('BooksPageComponent', () => {
  let component: BooksPageComponent;
  let fixture: ComponentFixture<BooksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
