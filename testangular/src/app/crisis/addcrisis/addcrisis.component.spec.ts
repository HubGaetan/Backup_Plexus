import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcrisisComponent } from './addcrisis.component';

describe('AddcrisisComponent', () => {
  let component: AddcrisisComponent;
  let fixture: ComponentFixture<AddcrisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcrisisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcrisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
