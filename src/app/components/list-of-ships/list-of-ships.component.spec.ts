import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfShipsComponent } from './list-of-ships.component';

describe('ListOfShipsComponent', () => {
  let component: ListOfShipsComponent;
  let fixture: ComponentFixture<ListOfShipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfShipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
