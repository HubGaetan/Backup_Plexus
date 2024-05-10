import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcrisisComponent } from './itemcrisis.component';

describe('ItemcrisisComponent', () => {
  let component: ItemcrisisComponent;
  let fixture: ComponentFixture<ItemcrisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemcrisisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemcrisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
