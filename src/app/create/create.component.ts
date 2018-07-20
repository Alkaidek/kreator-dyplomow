import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  bcgTemp: any;
  template: any;
  database: AngularFireDatabase;
  constructor(private db: AngularFireDatabase ) {
    db.list('/base64').valueChanges().subscribe(bcgTemp => {
      this.bcgTemp = bcgTemp;
    });
  }
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
  arrayFontColor = ['black', 'black', 'black', 'black', 'black'];
  bottom = 0;
  fontColor;
  arrayFontName = ['smallTxt', 'largeTxt', 'left', 'right', 'sFor', 'txtForWhat'];
  pdfFormat;

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
  getBase64formUrl() {
    const canvas = document.getElementById('imgCanvas') as HTMLCanvasElement  ;
    const img = document.getElementById('imgPdf100Fix') as HTMLImageElement;
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('img/png');
    return dataURL.replace('/^data:image/\(png|jpg);base64,/', '');
  }
  getDataFromDatabase() {
    this.db.list('/base64').valueChanges().subscribe(bcgTemp => {
      this.bcgTemp = bcgTemp;
      console.log(this.bcgTemp);
    });
  }
  generatePdf() {
    this.setPaddingFix();
    //console.log(document.getElementById('create').offsetWidth);
    //console.log(document.getElementById('create').offsetHeight);
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
    //txt
  }
  setPaddingFix() {
    document.getElementById('pdfForFix').style.marginLeft =  this.marginLeft + '%';
    document.getElementById('pdfForFix').style.marginRight = this.marginRight + '%';
    document.getElementById('pdfTxtFix').style.paddingTop = this.paddingTop + '%';
    document.getElementById('signFix').style.bottom = this.bottom + 'px';
    //txt
    this.setPadding();
  }
  getWandH() {
    console.log(document.getElementById('toPdf100').offsetWidth);
    console.log(document.getElementById('toPdf100').offsetHeight);
  }
}
