import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChartsComponent } from './table-charts.component';

describe('TableChartsComponent', () => {
  let component: TableChartsComponent;
  let fixture: ComponentFixture<TableChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
