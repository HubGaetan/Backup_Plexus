import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcrisisComponent } from './detailcrisis.component';

describe('DetailcrisisComponent', () => {
  let component: DetailcrisisComponent;
  let fixture: ComponentFixture<DetailcrisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailcrisisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailcrisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
