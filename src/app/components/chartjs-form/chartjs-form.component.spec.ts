import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartjsFormComponent } from './chartjs-form.component';

describe('ChartjsFormComponent', () => {
  let component: ChartjsFormComponent;
  let fixture: ComponentFixture<ChartjsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartjsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartjsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
