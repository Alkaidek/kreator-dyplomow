import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { MaterialModule } from '../material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireDatabaseModule} from 'angularfire2/database';

const firebase = {
  apiKey: 'AIzaSyB2EVW_LFNCbihRQ29rZTYtYLT_Ni_AvT8',
  authDomain: 'dyplomator.firebaseapp.com',
  databaseURL: 'https://dyplomator.firebaseio.com',
  projectId: 'dyplomator',
  storageBucket: 'dyplomator.appspot.com',
  messagingSenderId: '633386395085'
};

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  const array = ['test1', 'test2', 'test3'];
  let originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      imports: [
        MaterialModule,
        NgbModule.forRoot(),
        FormsModule,
        AngularFireModule.initializeApp(firebase),
        AngularFireDatabaseModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 250000;
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  describe('test',  () => {
    it ( 'return 0 ', () => {
      const result = component.test();
      expect(result).toBe(0);
    });
  });
  describe('checkWidthWithCenter',  () => {
    it ( 'it should return 1 if element is not too big, or 0 if reset', () => {
      const result = component.checkWidthWithCenter(0);
      expect(result).toBe(1);
    });
  });
  describe('checkWidthWithCenter',  () => {
    it ( 'should be greater then 1', () => {
      const result = component.setOnInitData();
      expect(result).toBeGreaterThanOrEqual(1);
    });
  });

  describe('checkSaveData',  () => {
      it ( 'expect 0', () => {
        const result = component.saveData( '123' );
        expect(result).toBe(0);
      });
  });
});

