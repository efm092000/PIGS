import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruiseCardComponent } from './cruise-card.component';

describe('CruiseTagComponent', () => {
  let component: CruiseCardComponent;
  let fixture: ComponentFixture<CruiseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CruiseCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CruiseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
