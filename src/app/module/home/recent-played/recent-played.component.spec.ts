import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPlayedComponent } from './recent-played.component';

describe('RecentPlayedComponent', () => {
  let component: RecentPlayedComponent;
  let fixture: ComponentFixture<RecentPlayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPlayedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
