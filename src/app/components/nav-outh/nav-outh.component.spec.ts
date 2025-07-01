import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavOuthComponent } from './nav-outh.component';

describe('NavOuthComponent', () => {
  let component: NavOuthComponent;
  let fixture: ComponentFixture<NavOuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavOuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavOuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
