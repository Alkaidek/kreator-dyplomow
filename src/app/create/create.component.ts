import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {getLocaleMonthNames} from '@angular/common';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  bcgTemp: any;
  tmpImg: any;
  constructor(db: AngularFireDatabase ) {
    db.list('/bcgTemplate').valueChanges().subscribe(bcgTemp => {
      this.bcgTemp = bcgTemp;
      console.log(this.bcgTemp);
      for ( let n = 0; n < 2; n++) {
        console.log('dsadsa dsada das' + this.bcgTemp[n]);
        this.tmpImg = document.getElementById('img' + n ) as HTMLImageElement;
        this.tmpImg.src = this.bcgTemp[n];
      }
    });
  }
  forWho = '';
  forWhat = '';
  imgSrc = '../../assets/img/0.png';
  imgSrcFix = '0';
  footer = 'Kielce, dnia ';
  paddingTop = 0;
  marginLeft = 15;
  marginRight = 15;
  arrayFontSize = [300, 150, 250, 120, 200]
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
    //alert('Małe tła wypełniane z firebase, tło #toPdf100Fix z plików assets/img!!!!');
  }
  takeBcg(n, imgSrc, marginLeft, marginRight, paddingTop, bottom) {
    document.getElementById('toPdf100').style.background = n;
    this.imgSrc = this.bcgTemp[imgSrc];
    this.imgSrcFix = '' + (imgSrc + 1);
    document.getElementById('pdfFor').style.marginLeft =  marginLeft + '%';
    document.getElementById('pdfFor').style.marginRight = marginRight + '%';
    document.getElementById('pdfFor').style.paddingTop = paddingTop + '%';
    document.getElementById('sign').style.bottom = bottom + 'px';
    //ukryty pdf
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
  generatePdf() {
    //if (document.getElementById('create').offsetWidth > 900 ||  document.getElementById('create').offsetHeight > 950) {
    //  this.pdfFormat = 'a4';
    //} else {
    //  this.pdfFormat = 'a4';
    //}
    console.log(document.getElementById('create').offsetWidth);
    console.log(document.getElementById('create').offsetHeight);
    const elementToPrint = document.getElementById('toPdf100Fix');
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addHTML(elementToPrint, () => {
      pdf.save('generaterdDiploma.pdf');
    });
  }
  setPadding() {
    document.getElementById('pdfFor').style.marginLeft =  this.marginLeft + '%';
    document.getElementById('pdfFor').style.marginRight = this.marginRight + '%';
    document.getElementById('pdfTxt').style.paddingTop = this.paddingTop + '%';
    document.getElementById('sign').style.bottom = this.bottom + 'px';
    //txt
    document.getElementById('smallTxt').style.fontSize =  this.arrayFontSize[3] + '%';
    document.getElementById('largeTxt').style.fontSize = this.arrayFontSize[0] + '%';
    document.getElementById('left').style.fontSize = this.arrayFontSize[1] + '%';
    document.getElementById('right').style.fontSize = this.arrayFontSize[1] + '%';
    document.getElementById('sFor').style.fontSize = this.arrayFontSize[2] + '%';
    document.getElementById('txtForWhat').style.fontSize = this.arrayFontSize[4] + '%';
    for ( let i = 0; i < this.arrayFontName.length; i++ ) {
      document.getElementById(this.arrayFontName[i]).style.color = this.fontColor;
    }
  }
  setPaddingFix() {
    document.getElementById('pdfForFix').style.marginLeft =  this.marginLeft + '%';
    document.getElementById('pdfForFix').style.marginRight = this.marginRight + '%';
    document.getElementById('pdfTxtFix').style.paddingTop = this.paddingTop + '%';
    document.getElementById('signFix').style.bottom = this.bottom + 'px';
    //txt
    document.getElementById('smallTxtFix').style.fontSize =  this.arrayFontSize[3] + '%';
    document.getElementById('largeTxtFix').style.fontSize = this.arrayFontSize[0] + '%';
    document.getElementById('leftFix').style.fontSize = this.arrayFontSize[1] + '%';
    document.getElementById('rightFix').style.fontSize = this.arrayFontSize[1] + '%';
    document.getElementById('sForFix').style.fontSize = this.arrayFontSize[2] + '%';
    document.getElementById('txtForWhatFix').style.fontSize = this.arrayFontSize[4] + '%';
    for ( let i = 0; i < this.arrayFontName.length; i++ ) {
      document.getElementById(this.arrayFontName[i] + 'Fix').style.color = this.fontColor;
    }
    this.setPadding();
  }
  getWandH() {
    console.log(document.getElementById('toPdf100').offsetWidth);
    console.log(document.getElementById('toPdf100').offsetHeight);
  }
}
