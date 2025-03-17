import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkuseComponent } from './monkuse.component';

describe('MonkuseComponent', () => {
  let component: MonkuseComponent;
  let fixture: ComponentFixture<MonkuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonkuseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonkuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
