import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesOverviewComponent } from './countries-overview.component';

describe('CountriesOverviewComponent', () => {
  let component: CountriesOverviewComponent;
  let fixture: ComponentFixture<CountriesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
