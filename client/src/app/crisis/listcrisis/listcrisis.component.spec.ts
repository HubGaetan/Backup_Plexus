import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcrisisComponent } from './listcrisis.component';

describe('ListcrisisComponent', () => {
  let component: ListcrisisComponent;
  let fixture: ComponentFixture<ListcrisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListcrisisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListcrisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
