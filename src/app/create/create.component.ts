import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {AngularFireDatabase} from 'angularfire2/database';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {checkDateInRange} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {
  public isCollapsed = [true, true, true, true, true];
  auth = 'block';
  bcgTemp: any;
  template: any;
  database: AngularFireDatabase;
  length: Number;
  bool = 'block';
  constructor(private db: AngularFireDatabase ) {
    db.list('/base64').valueChanges().subscribe(bcgTemp => {
      this.bcgTemp = bcgTemp;
    });
    db.list('/template/' + this.schoolNr + '' + this.name).valueChanges().subscribe(template => {
      this.template = template;
      console.log(this.template);
      this.length = this.template.length;
      if ( this.length === 0) {
        this.bool = 'none';
      }
    });
    //db.list('/template').remove(this.schoolNr + '' + this.name);
  }
  arrayScroll = [1, 2, 3];
  lastValue = 1;
  schoolNr = '29';
  name = 'MateuszB';
  base64Tmp = '1';
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
  marginLeft = 0;
  marginRight = 0;
  bottom = 0;
  arrayFontSize = [300, 150, 250, 120, 200];
  arrayFontName = ['title', 'forWho', 'forWhat', 'footer', 'sign1', 'sign2'];
  arrayFontNameId = ['largeTxt', 'sFor', 'txtForWhat', 'smallTxt', 'left', 'right'];
  arrayFontFamili = ['Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial'];
  arrayFontColor = ['black', 'black', 'black', 'black', 'black'];
  postsWithArray = [
    {
      nameOfTemplate: '',
      paddingTop: 0,
      marginLeft: 0,
      marginRight: 0,
      bottom: 0,
      arrayFontSize: [0, 0, 0, 0, 0],
      arrayFontColor: ['black', 'black', 'black', 'black', 'black'],
      arrayFontFamili: ['Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial'],
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
  takeBcg(n, imgSrc) {
    console.log('ten sie podnosi: ' + imgSrc);
    console.log('a ten opada: ' + this.lastValue);
    document.getElementById('bcg' + (this.lastValue + 1) ).style.transform = 'scale(0.8,0.8)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.border = 'black 1px solid';
    this.lastValue = imgSrc;
    document.getElementById('bcg' + (imgSrc + 1)).style.transform = 'scale(0.99,0.99)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.webkitTransform = 'scale(0.99,0.99)';
    document.getElementById('bcg' + (imgSrc + 1)).style.border = '#3aaaff 3px solid';
    this.base64Tmp = imgSrc;
    document.getElementById('toPdf100').style.background = n;
    this.imgSrc = '' + (imgSrc + 1);
    this.imgSrcFix = this.bcgTemp[imgSrc];
    this.base64 = '../../assets/img/' + (imgSrc + 1 ) + '.png';
    switch( imgSrc ) {
      case 0:
        this.paddingTop = 10;
        this.marginLeft = 5;
        this.marginRight = 5;
        this.bottom = 0;
        break;
      case 1:
        this.paddingTop = 25;
        this.marginLeft = 16;
        this.marginRight = 16;
        this.bottom = 24;
        break;
      case 2:
        this.paddingTop = 22;
        this.marginLeft = 15;
        this.marginRight = 15;
        this.bottom = 0;
        break;
      case 3:
        this.paddingTop = 7;
        this.marginLeft = 7;
        this.marginRight = 7;
        this.bottom = 0;
    }
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
    const date = new Date();
    let day = '' + date.getDate();
    const month = date.getMonth() + 1;
    let monthStr = '';
    let hours = '' + date.getHours();
    let min = '' + date.getMinutes();
    if ( date.getDate() < 10) {
      day = '0' + day;
    }
    if ( (date.getMonth() )  < 10) {
      monthStr = '0' + month;
    }
    if ( (date.getHours() )  < 10) {
      hours = '0' + hours;
    }
    if ( (date.getMinutes() )  < 10) {
      min = '0' + min;
    }
    this.postsWithArray[n].nameOfTemplate = '' +   day + ' ' + monthStr + ' ' + date.getFullYear() + ' ' +  hours + ':' + min;
    this.postsWithArray[n].paddingTop = this.paddingTop;
    this.postsWithArray[n].marginLeft = this.marginLeft;
    this.postsWithArray[n].marginRight = this.marginRight;
    this.postsWithArray[n].bottom = this.bottom;
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
        setTimeout( () => {
      this.db.database
        .ref('/template')
        .child(this.schoolNr + '' + this.name)
        .child('' +   day + ' ' + monthStr + ' ' + date.getFullYear() + ' ' +  date.getHours() + ':' + date.getMinutes() )
        .set(this.postsWithArray[0]);
      alert('Twój szoblon został zapisany! Otrzył on równiez unikatowy numer, który nalezy zapamiętać: ' + this.length);
    }, 500 );
  }
  takeFontForEle(font, element) {
    document.getElementById(this.arrayFontNameId[element]).style.fontFamily = font;
    document.getElementById(this.arrayFontNameId[element] + 'Fix').style.fontFamily = font;
    this.arrayFontFamili[element] = font;
    if (element === 4) {
      this.takeFontForEle(font, 5);
    }
  }
  setUserData() {
    const select = document.getElementById('selectTemplate') as HTMLSelectElement;
    console.log(select.selectedIndex);
    this.paddingTop = this.template[select.selectedIndex].paddingTop;
    this.marginLeft = this.template[select.selectedIndex].marginLeft;
    this.marginRight = this.template[select.selectedIndex].marginRight;
    this.bottom = this.template[select.selectedIndex].bottom;
    this.setPaddingFix();
    this.imgSrcFix = this.bcgTemp[this.template[select.selectedIndex].img];
    for (let i = 0; i < this.template[select.selectedIndex].arrayFontSize.length; i++ ) {
      console.log(' ' + this.template[select.selectedIndex].arrayFontSize[i]);
      this.arrayFontSize[i] = this.template[select.selectedIndex].arrayFontSize[i];
    }
    for (let i = 0; i < this.template[select.selectedIndex].arrayFontColor.length; i++ ) {
      this.arrayFontColor[i] =  this.template[select.selectedIndex].arrayFontColor[i];
    }
    for (let i = 0; i < this.template[select.selectedIndex].arrayFontFamili.length; i++ ) {
      document.getElementById(this.arrayFontNameId[i]).style.fontFamily =  this.template[select.selectedIndex].arrayFontFamili[i];
      document.getElementById(this.arrayFontNameId[i] + 'Fix').style.fontFamily =  this.template[select.selectedIndex].arrayFontFamili[i];
    }
  }
  moveLeft() {
    const btn =  document.getElementById('rightDirect') as HTMLButtonElement;
    const btn2 =  document.getElementById('leftDirect') as HTMLButtonElement;
    for ( let i = 0; i < 3; i++ ) {
      if ((this.arrayScroll[i] - 3 < (this.bcgTemp.length + 1)) && ((this.arrayScroll[i] - 3 ) > 0)) {
        document.getElementById('bcg' + (this.arrayScroll[i] - 3)).style.display = 'inline-block';
        btn.disabled = false;
      } else if ((this.arrayScroll[i] - 3 ) < 0 ) {
        btn2.disabled = true;
      }
      this.arrayScroll[i] = this.arrayScroll[i] - 3;
    }
    //console.log( this.arrayScroll[0] + '< = 1?' );
    if ( this.arrayScroll[0] <= 1 ) {
      btn2.disabled = true;
    }
  }
  moveRight() {
    const btn =  document.getElementById('rightDirect') as HTMLButtonElement;
    const btn2 =  document.getElementById('leftDirect') as HTMLButtonElement;
    for ( let i = 0; i < 3; i++ ) {
      if ((this.arrayScroll[i] < (this.bcgTemp.length + 1)) && this.arrayScroll[i] > 0) {
        btn2.disabled = false;
        if ( (this.arrayScroll[i] + 3) < (this.bcgTemp.length + 1 )) {
          document.getElementById('bcg' + this.arrayScroll[i]).style.display = 'none';
        }
      } else if (this.arrayScroll[i] > (this.bcgTemp.length + 1)) {
        btn.disabled = true;
      }
      this.arrayScroll[i] = this.arrayScroll[i] + 3;
      console.log('hej to ja: ' + this.arrayScroll[i]);
    }
    //console.log('wieksze?: ' + this.arrayScroll[2] + '>=' + this.bcgTemp.length  );
    if ( this.arrayScroll[2] >= this.bcgTemp.length ) {
      btn.disabled = true;
    }
  }
  showMore(n) {
    if ( this.isCollapsed[n]) {
      document.getElementById('card' + n).style.display = 'inline-block';
      this.isCollapsed[n] = false;
    } else {
      document.getElementById('card' + n).style.display = 'none';
      this.isCollapsed[n] = true;
    }
  }
}
