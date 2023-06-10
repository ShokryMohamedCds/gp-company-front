import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcommentsComponent } from './allcomments.component';

describe('AllcommentsComponent', () => {
  let component: AllcommentsComponent;
  let fixture: ComponentFixture<AllcommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
