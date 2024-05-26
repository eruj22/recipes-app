import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeOverviewPageComponent } from './home-overview.page';

describe('HomeOverviewComponent', () => {
  let component: HomeOverviewPageComponent;
  let fixture: ComponentFixture<HomeOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOverviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
