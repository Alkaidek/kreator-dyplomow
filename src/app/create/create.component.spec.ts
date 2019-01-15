import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { CreateComponent } from './create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule],
      declarations: [ CreateComponent ],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('chceck test func', () => {
    const h = 0;
    expect(component.test()).toEqual(0);
  });
  it('chceck test func', () => {
    const h = 0;
    expect(component.test()).not.toEqual(1);
  });
  it('chceck date', () => {
    expect(component.getCurrentDate()).toContain('2018');
  });
});
