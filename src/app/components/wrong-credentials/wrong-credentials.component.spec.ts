import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongCredentialsComponent } from './wrong-credentials.component';

describe('WrongCredentialsComponent', () => {
  let component: WrongCredentialsComponent;
  let fixture: ComponentFixture<WrongCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrongCredentialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
