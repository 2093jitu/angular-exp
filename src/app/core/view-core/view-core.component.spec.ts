import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoreComponent } from './view-core.component';

describe('ViewCoreComponent', () => {
  let component: ViewCoreComponent;
  let fixture: ComponentFixture<ViewCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
