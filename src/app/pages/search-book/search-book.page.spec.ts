import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchBookPage } from './search-book.page';

describe('SearchBookPage', () => {
  let component: SearchBookPage;
  let fixture: ComponentFixture<SearchBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
