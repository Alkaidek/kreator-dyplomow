import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {AngularFireDatabase} from 'angularfire2/database';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {
  public isCollapsed = [true, true, true, true, true];
  bcgTemp: any;
  template: any;
  database: AngularFireDatabase;
  firebase: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase ) {
    db.list('/base64').valueChanges().subscribe(bcgTemp => {
      this.bcgTemp = bcgTemp;
    });
    //db.list('/template').remove(this.schoolNr + '' + this.name);
  }
  schoolNr = '29';
  name = 'MateuszB';
  base64Tmp = '';
  base64 = '';
  forWho = '';
  forWhat = '';
  sign1 = 'Dyrektor';
  sign2 = 'Wychowawca';
  title = 'Dyplom';
  imgSrc = '../../assets/img/0.png';
  imgSrcFix = '../../assets/img/0.png';
  footer = 'Kielce, dnia ';
  paddingTop = 0;
  marginLeft = 15;
  marginRight = 15;
  arrayFontSize = [300, 150, 250, 120, 200];
  arrayFontName = ['title', 'forWho', 'forWhat', 'footer', 'sign1', 'sign2'];
  arrayFontNameId = ['largeTxt', 'sFor', 'txtForWhat', 'smallTxt', 'left', 'right'];
  arrayFontFamili = ['Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial'];
  arrayFontColor = ['black', 'black', 'black', 'black', 'black'];
  bottom = 0;
  fontColor;
  pdfFormat;
  postsWithArray = [
    {
      nameOfTemplate: '',
      paddingTop: 0,
      marginLeft: 0,
      marginRight: 0,
      bottom: 0,
      forWho: '',
      forWhat: '',
      sign1: '',
      sign2: '',
      title: '',
      footer: '',
      arrayFontSize: [
        0,
        0,
        0,
        0,
        0
      ],
      arrayFontColor: [
        'black',
        'black',
        'black',
        'black',
        'black'
      ],
      arrayFontFamili: [
        'Arial',
        'Arial',
        'Arial',
        'Arial',
        'Arial',
        'Arial'
      ],
      img: ''
    }
  ];

  ngOnInit() {
    const date = new Date();
    let day = '' + date.getDate();
    const month = date.getMonth() + 1;
    let monthStr = '';
    if ( date.getDate() < 10) {
      day = '0' + day;
    }
    if ( (date.getMonth() )  < 10) {
      monthStr = '0' + month;
    }
    this.footer = this.footer + day + '.' + monthStr + '.' + date.getFullYear() + ' r.';
  }
  takeBcg(n, imgSrc, marginLeft, marginRight, paddingTop, bottom) {
    this.base64Tmp = imgSrc;
    document.getElementById('toPdf100').style.background = n;
    this.imgSrc = '' + (imgSrc + 1);
    this.imgSrcFix = this.bcgTemp[imgSrc];
    console.log(this.bcgTemp[imgSrc]);
    document.getElementById('pdfFor').style.marginLeft =  marginLeft + '%';
    document.getElementById('pdfFor').style.marginRight = marginRight + '%';
    document.getElementById('pdfFor').style.paddingTop = paddingTop + '%';
    document.getElementById('sign').style.bottom = bottom + 'px';
    //ukryty pdf
    this.base64 = '../../assets/img/' + (imgSrc + 1 ) + '.png';
    document.getElementById('toPdf100Fix').style.background = n;
    document.getElementById('pdfForFix').style.marginLeft =  marginLeft + '%';
    document.getElementById('pdfForFix').style.marginRight = marginRight + '%';
    document.getElementById('pdfForFix').style.paddingTop = paddingTop + '%';
    document.getElementById('signFix').style.bottom = bottom + 'px';
    this.marginRight = marginRight;
    this.marginLeft = marginLeft;
  }
  takeFont(n) {
    document.getElementById('toPdf100').style.fontFamily = n;
    document.getElementById('toPdf100Fix').style.fontFamily = n;

  }
  doItPlease() {
    const can = document.getElementById('imgCanvas') as HTMLCanvasElement;
    const img = document.getElementById('imgPdf100Fix') as HTMLImageElement;
    const ctx = can.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const encodedBase = can.toDataURL();
    this.base64 = encodedBase;
  }

  getDataFromDatabase() {
    this.db.list('/base64').valueChanges().subscribe(bcgTemp => {
      this.bcgTemp = bcgTemp;
      console.log(this.bcgTemp);
    });
  }
  generatePdf() {
    const elementToPrint = document.getElementById('toPdf100Fix');
    const pdf = new jsPDF('p', 'pt', 'a4', true);
    pdf.internal.scaleFactor = 1;
    pdf.addHTML(elementToPrint, () => {
      pdf.save('generaterdDiploma.pdf');
      pdf.autoPrint();
    });
    this.createArrayToSend(0);
  }
  getDate(n) {
    this.database.list('/template').valueChanges().subscribe(template => {
      this.template = template;
      console.log(this.template);
      for ( let h = 0; h < template.length; h++) {
        console.log('Data: ' + h + ' : ' + this.bcgTemp[h]);
      }
    });
  }
  setPadding() {
    document.getElementById('pdfFor').style.marginLeft =  this.marginLeft + '%';
    document.getElementById('pdfFor').style.marginRight = this.marginRight + '%';
    document.getElementById('pdfTxt').style.paddingTop = this.paddingTop + '%';
    document.getElementById('sign').style.bottom = this.bottom + 'px';
  }
  setPaddingFix() {
    document.getElementById('pdfForFix').style.marginLeft =  this.marginLeft + '%';
    document.getElementById('pdfForFix').style.marginRight = this.marginRight + '%';
    document.getElementById('pdfTxtFix').style.paddingTop = this.paddingTop + '%';
    document.getElementById('signFix').style.bottom = this.bottom + 'px';
    this.setPadding();
  }
  getWandH() {
    console.log(document.getElementById('toPdf100').offsetWidth);
    console.log(document.getElementById('toPdf100').offsetHeight);
  }
  createArrayToSend(n) {
    this.postsWithArray[n].nameOfTemplate = 'abc';
    this.postsWithArray[n].paddingTop = this.paddingTop;
    this.postsWithArray[n].marginLeft = this.marginLeft;
    this.postsWithArray[n].marginRight = this.marginRight;
    this.postsWithArray[n].bottom = this.bottom;
    this.postsWithArray[n].forWho = this.forWho;
    this.postsWithArray[n].forWhat = this.forWhat;
    this.postsWithArray[n].sign1 = this.sign1;
    this.postsWithArray[n].sign2 = this.sign2;
    this.postsWithArray[n].title = this.title;
    this.postsWithArray[n].footer = this.footer;
    for (let i = 0; i < this.arrayFontSize.length; i++ ) {
      this.postsWithArray[n].arrayFontSize[i] = this.arrayFontSize[i];
    }
    for (let i = 0; i < this.arrayFontColor.length; i++ ) {
      this.postsWithArray[n].arrayFontColor[i] = this.arrayFontColor[i];
    }
    for (let i = 0; i < this.arrayFontFamili.length; i++ ) {
      this.postsWithArray[n].arrayFontFamili[i] = this.arrayFontFamili[i];
    }
    this.postsWithArray[n].img = this.base64Tmp;
    console.log(this.postsWithArray);
    let length = 0;
    this.db.list('/template/' + this.schoolNr + '' + this.name).valueChanges().subscribe(template => {
      this.template = template;
      console.log(this.template);
      length = this.template.length;
    });
    setTimeout( () => {
      this.db.database.ref('/template').child(this.schoolNr + '' + this.name).child('' +  length ).set(this.postsWithArray[0]);
      alert('Twój szoblon został zapisany! Otrzył on równiez unikatowy numer który nalezy zapamiętać: ' + length);
    }, 2000 );
  }
  takeFontForEle(font, element) {
    document.getElementById(this.arrayFontNameId[element]).style.fontFamily = font;
    document.getElementById(this.arrayFontNameId[element] + 'Fix').style.fontFamily = font;
    this.arrayFontFamili[element] = font;
    if (element === 4) {
      this.takeFontForEle(font, 5);
    }
  }
}
