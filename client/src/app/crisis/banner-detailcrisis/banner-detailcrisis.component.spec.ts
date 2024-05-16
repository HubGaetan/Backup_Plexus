import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDetailcrisisComponent } from './banner-detailcrisis.component';

describe('BannerDetailcrisisComponent', () => {
  let component: BannerDetailcrisisComponent;
  let fixture: ComponentFixture<BannerDetailcrisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerDetailcrisisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerDetailcrisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
