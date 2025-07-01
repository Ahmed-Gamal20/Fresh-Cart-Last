import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBlanckComponent } from './nav-blanck.component';

describe('NavBlanckComponent', () => {
  let component: NavBlanckComponent;
  let fixture: ComponentFixture<NavBlanckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBlanckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBlanckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
