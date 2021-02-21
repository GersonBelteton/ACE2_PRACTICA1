import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtletascoachComponent } from './atletascoach.component';

describe('AtletascoachComponent', () => {
  let component: AtletascoachComponent;
  let fixture: ComponentFixture<AtletascoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtletascoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtletascoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
