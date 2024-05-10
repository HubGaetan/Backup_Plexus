import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecrisisComponent } from './homecrisis.component';

describe('HomecrisisComponent', () => {
  let component: HomecrisisComponent;
  let fixture: ComponentFixture<HomecrisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomecrisisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomecrisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
