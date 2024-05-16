import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCouranteComponent } from './main-courante.component';

describe('MainCouranteComponent', () => {
  let component: MainCouranteComponent;
  let fixture: ComponentFixture<MainCouranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCouranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCouranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
