import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  constructor() { }
  forWho = '';
  forWhat = '';
  imgSrc = '0';
  footer = 'Kielce, dnia 17.07.2018r.';
  paddingTop = 0;
  marginLeft = 15;
  marginRight = 15;
  arrayFontSize = [300, 150, 250, 120, 200]
  bottom = 0;
  fontColor;
  arrayFontName = ['smallTxt', 'largeTxt', 'left', 'right', 'sFor', 'txtForWhat'];
  pdfFormat;

  ngOnInit() {
  }
  takeBcg(n, imgSrc, marginLeft, marginRight, paddingTop, bottom) {
    document.getElementById('toPdf100').style.background = n;
    this.imgSrc = '' + imgSrc;
    document.getElementById('pdfFor').style.marginLeft =  marginLeft + '%';
    document.getElementById('pdfFor').style.marginRight = marginRight + '%';
    document.getElementById('pdfFor').style.paddingTop = paddingTop + '%';
    document.getElementById('sign').style.bottom = bottom + 'px';
    this.marginRight = marginRight;
    this.marginLeft = marginLeft;
  }
  takeFont(n) {
    document.getElementById('toPdf100').style.fontFamily = n;
  }
  generatePdf() {
    if (document.getElementById('create').offsetWidth > 900 ||  document.getElementById('create').offsetHeight > 950) {
      this.pdfFormat = 'a4';
    } else {
      this.pdfFormat = 'a5';
    }
    console.log(document.getElementById('create').offsetWidth);
    console.log(document.getElementById('create').offsetHeight);
    const elementToPrint = document.getElementById('toPdf100');
    const pdf = new jsPDF('p', 'pt', this.pdfFormat);
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
}
