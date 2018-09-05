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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('chceck h3 element', function() {
    setTimeout( () => {
      const result = document.getElementById('DOMtest').innerHTML;
      expect(result).toBe('Wybierz ramkę dyplomu');
    }, 1000);
  } );
  it('chceck btnDirectLeft element with DOM', function() {
    setTimeout( () => {
      const result = document.getElementById('btnDirectLeft').style.left;
      expect(result).toBe('-200px');
    }, 1000);
  } );
  it('chceck btnDirectLeft element with DOM', function() {
    setTimeout( () => {
      const result = document.getElementById('btnDirectLeft').style.opacity;
      expect(result).toEqual('0');
    }, 1000);
  } );
  it('chceck src attribute of .imgO2 usisng: indexOF', function() {
    setTimeout( () => {
      const result = document.getElementById('imgO2').getAttribute('src');
      expect(result.indexOf('.png') !== -1).toBe(true);
    }, 1000);
  } );
  it('chceck src attribute of .imgO2 using: toContain', function() {
    setTimeout( () => {
      const result = document.getElementById('imgO2').getAttribute('src');
      expect(result).toContain('.png');
    }, 1000);
  } );
  it('chceck btnDirectLeft > element > attribute > style > opacity after set it on 1', function() {
    setTimeout( () => {
      document.getElementById('btnDirectLeft').style.opacity = '1';
      const result = document.getElementById('btnDirectLeft').style.opacity;
      expect(result).toEqual('1');
    }, 1000);
  } );
  it('chceck scheme30 element Angular attribute', function() {
    setTimeout( () => {
      const result = document.getElementById('scheme30').getAttribute('click');
      console.log('attribute scheme30 ' + result);
      expect('' + result).not.toBeNull();
    });
  } );
  describe('test',  () => {
    it ( 'return 0 ', () => {
      const result = component.test();
      expect(result).toBe(0);
    });
  });
  it( 'chceck btnDirectRight > class conatin mat-mini-fab', function () {
    setTimeout( () => {
      expect(document.getElementById( 'btnDirectRight').getAttribute('class')).toContain('mat-mini-fab');
    });
  });
  xit( 'chceck btnDirectRight > class conatin, with ERROR', function () {
    setTimeout( () => {
      expect(document.getElementById( 'btnDirectRight').getAttribute('class')).toContain('kontrolny ERROR');
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
  describe('A spy', function() {
    beforeEach(function () {
      spyOn(component, 'rotateBcgX');
      component.rotateBcgX();
      component.rotateBcgX();
      component.rotateBcgX();
      component.rotateBcgX();
    });

    it('tracks that function was called', function () {
      expect(component.rotateBcgX).toHaveBeenCalled();
    });
  });
  describe('A spy for setTextAlignLeft', function() {
    let i = 0;
    beforeEach(function () {
      spyOn(component, 'setTextAlignLeft');
      i = 0;
      component.setTextAlignLeft(0);
      i++;
      component.setTextAlignLeft(1);
      i++;
      component.setTextAlignLeft(2);
      i++;
      component.setTextAlignLeft(3);
      i++;
      component.setTextAlignLeft(5);
      i++;
    });

    it('tracks that function was called', function () {
      expect(component.setTextAlignLeft).toHaveBeenCalled();
    });
    it('expect 0', function () {
      expect(component.setTextAlignLeft).toHaveBeenCalledWith(0);
    });
    it('expect 2', function () {
      expect(component.setTextAlignLeft).toHaveBeenCalledWith(2);
    });
    it('expect 1', function () {
      expect(component.setTextAlignLeft).toHaveBeenCalledWith(1);
    });
    it('expect 4 times function call', function () {
      console.log('i: ' + i);
      expect(component.setTextAlignLeft).toHaveBeenCalledTimes(i);
    });
  });
});

