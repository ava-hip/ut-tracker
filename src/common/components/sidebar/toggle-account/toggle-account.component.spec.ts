import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleAccountComponent } from './toggle-account.component';

describe('ToggleAccountComponent', () => {
  let component: ToggleAccountComponent;
  let fixture: ComponentFixture<ToggleAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
