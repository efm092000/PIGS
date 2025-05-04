import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselInfoComponent } from './vessel-info.component';

describe('SelectComponent', () => {
  let component: VesselInfoComponent;
  let fixture: ComponentFixture<VesselInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VesselInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VesselInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
