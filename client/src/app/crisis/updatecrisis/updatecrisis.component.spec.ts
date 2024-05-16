import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecrisisComponent } from './updatecrisis.component';

describe('UpdatecrisisComponent', () => {
  let component: UpdatecrisisComponent;
  let fixture: ComponentFixture<UpdatecrisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecrisisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatecrisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
