import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentPage } from './login.component';

describe('LoginComponentPage', () => {
  let component: LoginComponentPage;
  let fixture: ComponentFixture<LoginComponentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponentPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
