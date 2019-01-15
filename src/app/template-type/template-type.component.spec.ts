import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTypeComponent } from './template-type.component';

describe('TemplateTypeComponent', () => {
  let component: TemplateTypeComponent;
  let fixture: ComponentFixture<TemplateTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
