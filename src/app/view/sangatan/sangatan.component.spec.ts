import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SangatanComponent } from './sangatan.component';

describe('SangatanComponent', () => {
  let component: SangatanComponent;
  let fixture: ComponentFixture<SangatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SangatanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SangatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
