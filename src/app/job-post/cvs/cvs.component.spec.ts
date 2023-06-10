import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVSComponent } from './cvs.component';

describe('CVSComponent', () => {
  let component: CVSComponent;
  let fixture: ComponentFixture<CVSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CVSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
