import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalLabelComponent } from './global-label.component';

describe('GlobalLabelComponent', () => {
  let component: GlobalLabelComponent;
  let fixture: ComponentFixture<GlobalLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
