import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailtabsComponent } from './detailtabs.component';

describe('DetailtabsComponent', () => {
  let component: DetailtabsComponent;
  let fixture: ComponentFixture<DetailtabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailtabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
