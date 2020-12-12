import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser'

import { PostCreateComponent } from './post-create.component';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let de: DebugElement
  let el: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreateComponent ],
      imports: [
        FormsModule,
        FormGroup
      ]
    },)
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(PostCreateComponent);

      component = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;

    });
  });
});
