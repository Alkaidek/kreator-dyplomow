import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {AngularFireDatabase} from 'angularfire2/database';
import {MatSnackBar} from '@angular/material';
import * as fileSaver from 'file-saver';
import {tryCatch} from 'rxjs/internal-compatibility';

@Component({
  selector:
    'app-create',
  templateUrl:
    './create.component.html',
  styleUrls:
    [
      './create.component.sass'
    ]
})
export class CreateComponent implements OnInit {
  userImg =
    [];
  userImgBase64 = [];
  userTxt = [];
  userImgBase64txt = '';
  userImgRotatetxt = '';
  userImgWidthtxt = '';
  userImgHeighttxt = '';
  userImgMarginLefttxt = '';
  userImgMarginRigthtxt = '';
  currImg = -1;
  bcgDisplay = ['block', 'block', 'block', 'block'];
  auth = 'block';
  bcgTemp: any;
  template: any;
  coordinatesTemplate: any;
  frames: any;
  bool = 'block';
  constructor(private db: AngularFireDatabase, public snackBar: MatSnackBar) {
    db.list('/base64').valueChanges().subscribe(bcgTemp => {
      this.bcgTemp = bcgTemp;
    });
    /*db.list('/template/' + this.schoolNr + '' + this.name).valueChanges().subscribe(template => {
      this.template = template;
      this.template.reverse();
      console.log(this.template);
      this.length = this.template.length;
      if ( this.length === 0) {
        this.bool = 'none';
      }
    });*/
    db.list('/frame').valueChanges().subscribe(frames => {
      this.frames = frames;
    });
    db.list('/base64tmp').valueChanges().subscribe(coordinatesTemplate => {
      this.coordinatesTemplate = coordinatesTemplate;
    });
  }
  actualTxt = '';
  format = 'a4';
  landscape = 'inline-block';
  currentStep = 0;
  arrayScroll = [1, 2, 3];
  arrayScrollFrame = [1, 2, 3];
  bcgColor = '#c2f2cf';
  lastValue = 1;
  lastValueFrame = 1;
  base64Tmp = '';
  base64TmpFrame = '';
  base64 = '';
  forWho = '';
  forWhat = '';
  sign1 = 'Dyrektor\n................';
  sign2 = 'Wychowawca\n.......................';
  sign3 = 'Katecheta\n  ..................';
  title = 'Dyplom';
  imgSrc = '../../assets/img/0.png';
  imgSrcFix = '../../assets/img/0.png';
  imgSrcFrame = '../../assets/img/0.png';
  footer = 'Kielce, dnia ';
  paddingTop = 0;
  paddingTopForWho = 10;
  paddingTopForWhat = 20;
  marginLeft = [0, 0, 0, 0];
  marginRight = [0, 0, 0, 0];
  bottom = 0;
  arrayFontSize = [3, 0.9, 2, 0.8, 2];
  arrayFontNameId = ['largeTxt', 'sFor', 'txtForWhat', 'smallTxt', 'left', 'right', 'center'];
  arrayFontFamili = ['Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial'];
  arrayFontColor = ['black', 'black', 'black', 'black', 'black', 'black'];
  rotate = [];
  imgWidth = [];
  imgHeight = [];
  imgTop = [];
  imgLeft = [];
  scheme = 0;
  txtTop = [];
  txtLeft = [];
  txtRight = [];
  txtSize = [];
  currentTxt = -1;
  txtColor = [];
  txtTopText = '';
  txtLeftText = '';
  txtRightText = '';
  txtSizeText = '';
  txtUserText = '';
  txtColorText = '';
  txtFontFamili = [];
  txtFontFamiliText = '';
  arraySelectFontFamili = ['Arial', 'AbrilFatface', 'Aladin', 'Allura'];
  currentFontFamili = 0;
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
    setTimeout( () => {
      document.getElementById('scheme30').style.transform = 'scale(1,1)';
      document.getElementById('scheme30').style.border = 'rgba(87, 255, 0, 0.7) solid 3px';
      document.getElementById('scheme30').style.boxShadow = '5px 5px rgba(0, 0, 15, 0.2)';
      this.scheme = 30;
      this.landscapeOff(2);
      this.setFormat('A4');
    }, 500);
  }
  takeBcg(imgSrc) {
    console.log('ten sie podnosi: ' + imgSrc);
    console.log('a ten opada: ' + this.lastValue);
    document.getElementById('bcg' + (this.lastValue + 1) ).style.transform = 'scale(0.8,0.8)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.border = 'black 1px solid';
    this.lastValue = imgSrc;
    document.getElementById('bcg' + (imgSrc + 1)).style.transform = 'scale(0.99,0.99)';
    document.getElementById('bcg' + (imgSrc + 1)).style.boxShadow = '5px 5px rgba(0, 0, 15, 0.2)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.webkitTransform = 'scale(0.99,0.99)';
    document.getElementById('bcg' + (imgSrc + 1)).style.border = '#3aaaff 3px solid';
    this.base64Tmp = imgSrc;
    this.imgSrc = '' + (imgSrc + 1);
    this.imgSrcFix = this.bcgTemp[imgSrc];
    this.base64 = '../../assets/img/' + (imgSrc + 1 ) + '.png';
    switch ( imgSrc ) {
      case imgSrc:
        this.paddingTop = this.coordinatesTemplate[imgSrc][0];
        this.paddingTopForWho = this.coordinatesTemplate[imgSrc][0] + 10;
        this.paddingTopForWhat = this.coordinatesTemplate[imgSrc][0] + 20;
        this.marginLeft[3] = this.coordinatesTemplate[imgSrc][1];
        this.marginRight[3] = this.coordinatesTemplate[imgSrc][2];
        this.bottom = this.coordinatesTemplate[imgSrc][3];
        break;
      default:
        this.paddingTop = 10;
        this.paddingTopForWho = 20;
        this.paddingTopForWhat = 30;
        this.marginLeft[3] = 5;
        this.marginRight[3] = 5;
        this.bottom = 0;
    }
  }
  takeFrame(imgSrc) {
    document.getElementById('frmBox' + (this.lastValueFrame + 1) ).style.transform = 'scale(0.8,0.8)';
    document.getElementById('frmBox' + (this.lastValueFrame + 1) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('frmBox' + (this.lastValueFrame + 1) ).style.border = 'black 1px solid';
    document.getElementById('frmBox' + (this.lastValueFrame + 1) ).style.boxShadow = ' 0px 0px rgba(0, 0, 15, 0.2)';
    this.lastValueFrame = imgSrc;
    document.getElementById('frmBox' + (imgSrc + 1)).style.transform = 'scale(0.99,0.99)';
    document.getElementById('frmBox' + (imgSrc + 1) ).style.webkitTransform = 'scale(0.99,0.99)';
    document.getElementById('frmBox' + (imgSrc + 1) ).style.boxShadow = '5px 5px rgba(0, 0, 15, 0.2)';
    document.getElementById('frmBox' + (imgSrc + 1)).style.border = '#3aaaff 3px solid';
    this.base64TmpFrame = imgSrc;
    this.imgSrc = '' + (imgSrc + 1);
    this.imgSrcFrame = this.frames[imgSrc];
  }
  generatePdf() {
    if (this.landscape !== 'inline-block') {
      const elementToPrint = document.getElementById('toPdf100Fix');
      const pdf = new jsPDF('p', 'pt', this.format, true);
      pdf.internal.scaleFactor = 1;
      pdf.addHTML(elementToPrint, () => {
          pdf.save('wygenerowany dyplom.pdf');
          pdf.autoPrint();
        });
    } else {
      const elementToPrint = document.getElementById('toPdf100LandscapeFix');
      const pdf = new jsPDF('l', 'pt', this.format, true);
      pdf.internal.scaleFactor = 1;
      pdf.addHTML(elementToPrint, () => {
          pdf.save('wygenerowany dyplom.pdf');
          pdf.autoPrint();
        });
    }
  }
  createArrayToSend() {
    const date = new Date();
    let day = '' + date
      .getDate();
    const month = date
      .getMonth() + 1;
    let monthStr = '';
    let hours = '' + date
      .getHours();
    let min = '' + date
      .getMinutes();
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
    const msg =  ' ' + day + '.' + monthStr + '.' + date.getFullYear() + ' ' +  hours + ':' + min;
      this.openSnackBar( 'Twój szoblon został zapisany! Dodano go: ' + msg,  'ok' );
    this.saveData( msg );
  }
  takeFontForEle(font, element) {
    document.getElementById(this.arrayFontNameId[element]).style.fontFamily = font;
    document.getElementById(this.arrayFontNameId[element] + 'Fix').style.fontFamily = font;
    document.getElementById(this.arrayFontNameId[element] + 'LandscapeFix').style.fontFamily = font;
    document.getElementById(this.arrayFontNameId[element] + 'Landscape').style.fontFamily = font;
    this.arrayFontFamili[element] = font;
    if (element === 4) {
      this.takeFontForEle(font, 5);
      this.takeFontForEle(font, 6);
    }
  }
  setUserData(template) {
    try {
      this.resetSettings();
      /*const select = document.getElementById('selectTemplate') as HTMLSelectElement;*/
      this.bcgColor = template.bcgColor;
      this.landscape = template.landscape;
      if (this.landscape === 'none') {
        this.landscapeOff(2);
      } else {
        this.landscapeOff(1);
      }
      if ( template
        .scheme === '30' ) {
        this.setScheme(30);
      } else {
        this.setScheme(50);
      }
      this.paddingTop = template.paddingTop[0];
      this.paddingTopForWho = template.paddingTop[1];
      this.paddingTopForWhat = template.paddingTop[2];
      this.marginLeft[0] = template.marginLeft[0];
      this.marginLeft[1] = template.marginLeft[1];
      this.marginLeft[2] = template.marginLeft[2];
      this.marginLeft[3] = template.marginLeft[3];
      this.marginRight[3] = template.marginRight[3];
      this.marginRight[2] = template.marginRight[2];
      this.marginRight[1] = template.marginRight[1];
      this.marginRight[0] = template.marginRight[0];
      this.bottom = template.bottom;
      this.imgSrcFrame = template.frame;
      if ( template.img === '') {
        this.imgSrcFix =  '../../assets/img/0.png';
      } else {
        this.imgSrcFix = template.img;
      }
      this.base64Tmp = template.img;
      for (let i = 0; i < template.arrayFontSize.length; i++ ) {
        console.log(' ' + template.arrayFontSize[i]);
        this.arrayFontSize[i] = template.arrayFontSize[i];
      }
      for (let i = 0; i < template.arrayFontColor.length; i++ ) {
        this.arrayFontColor[i] =  template.arrayFontColor[i];
      }
      for (let i = 0; i < template.arrayFontFamili.length; i++ ) {
        document.getElementById(this.arrayFontNameId[i]).style.fontFamily =  template.arrayFontFamili[i];
        document.getElementById(this.arrayFontNameId[i] + 'Fix').style.fontFamily =  template.arrayFontFamili[i];
        document.getElementById(this.arrayFontNameId[i] + 'LandscapeFix').style.fontFamily =  template.arrayFontFamili[i];
        document.getElementById(this.arrayFontNameId[i] + 'Landscape').style.fontFamily =  template.arrayFontFamili[i];
        this.arrayFontFamili[i] = template.arrayFontFamili[i];
      }
      this.title =  template.title.replace('NEWLINE', '\n' );
      this.forWho =  template.forWho.replace('NEWLINE', '\n' );
      this.forWhat =  template.forWhat.replace('NEWLINE', '\n' );
      this.sign1 =  template.sign1.replace('NEWLINE', '\n' );
      this.sign2 = template.sign2.replace('NEWLINE', '\n' );
      this.sign3 = template.sign3.replace('NEWLINE', '\n' );
      this.footer = template.footer.replace('NEWLINE', '\n' );
      if ( template.userBcgBase64.length > 0) {
        for (let i = 0; i < template.userBcgBase64.length; i++) {
          this.userImg.push(this.userImg.length);
          this.rotate.push(template.userImgRotate[i]);
          this.imgWidth.push(template.userImgWidth[i]);
          this.imgHeight.push(template.userImgHeight[i]);
          this.imgTop.push(template.userImgTop[i]);
          this.imgLeft.push(template.userImgLeft[i]);
          this.userImgBase64.push(template.userBcgBase64[i]);
          this.currImg = this.userImg.length - 1;
        }
      }
      if ( template.txtTop.length > 0) {
        for ( let i = 0; i < template.txtTop.length; i++) {
          this.addTxtWithCustomValue(template.txtUser[i], template.txtTop[i],
            template.txtLeft[i], template.txtRight[i], template.txtSize[i], template.txtColor[i], template.txtFontFamili[i]);
        }
      } else {
        document.getElementById('hiddenBox').style.display = 'none';
      }
    } catch (err) {
      this.resetSettings();
      this.openSnackBar('Nie udało się wczytać szablonu! Plik może być niepoprawny, uszkodzony lub niekompatybilny!', 'ok');
    }
    document.getElementById('spinner').style.display = 'none';
  }
  resetSettings() {
    this.bcgColor = '#c2f2cf';
    this.landscape = '';
    this.landscapeOff(2);
    this.setScheme(30);
    this.paddingTop = 0;
    this.paddingTopForWho = 10;
    this.paddingTopForWhat = 20;
    this.marginLeft[0] = 0;
    this.marginLeft[1] = 0;
    this.marginLeft[2] = 0;
    this.marginLeft[3] = 0;
    this.marginRight[3] = 0;
    this.marginRight[2] = 0;
    this.marginRight[1] = 0;
    this.marginRight[0] = 0;
    this.bottom =  0;
    this.imgSrcFix =  '../../assets/img/0.png';
    this.base64Tmp = '';
    this.arrayFontSize = [ 3, 0.9, 2, 0.8, 2];
    this.arrayFontFamili = ['Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial'];
    this.arrayFontColor = ['black', 'black', 'black', 'black', 'black', 'black'];
    for (let i = 0; i < this.arrayFontFamili.length; i++ ) {
      document.getElementById(this.arrayFontNameId[i]).style.fontFamily =  'Arial';
      document.getElementById(this.arrayFontNameId[i] + 'Fix').style.fontFamily =  'Arial';
      document.getElementById(this.arrayFontNameId[i] + 'LandscapeFix').style.fontFamily =   'Arial';
      document.getElementById(this.arrayFontNameId[i] + 'Landscape').style.fontFamily =  'Arial';
    }
    this.title = 'Dyplom';
    this.forWho =  '';
    this.forWhat =  '';
    this.sign1 =  'Dyrektor\n................';
    this.sign2 = 'Wychowawca\n.......................';
    this.sign3 = 'Katecheta\n  ..................';
    this.footer = 'Kielce, dnia ';
    this.userImg = [];
    this.rotate = [];
    this.imgWidth = [];
    this.imgHeight = [];
    this.imgTop = [];
    this.imgLeft = [];
    this.userImgBase64 = [];
    this.currImg = -1;
    this.txtTop = [];
    this.txtLeft = [];
    this.txtRight = [];
    this.txtSize = [];
    this.currentTxt = -1;
    this.txtColor = [];
    this.txtTopText = '';
    this.txtLeftText = '';
    this.txtRightText = '';
    this.txtSizeText = '';
    this.txtUserText = '';
    this.txtColorText = '';
    this.userImgBase64txt = '';
    this.userImgRotatetxt = '';
    this.userImgWidthtxt = '';
    this.userImgHeighttxt = '';
    this.userImgMarginLefttxt = '';
    this.userImgMarginRigthtxt = '';
    this.userTxt = [];
    this.txtFontFamili = [];
    this.txtFontFamiliText = '';
  }
  moveLeft() {
    const btn =  document.getElementById('rightDirect') as HTMLButtonElement;
    const btn2 =  document.getElementById('leftDirect') as HTMLButtonElement;
    for ( let i = 0; i < 3; i++ ) {
      if ((this.arrayScroll[i] - 3 < (this.bcgTemp.length + 1)) && ((this.arrayScroll[i] - 3 ) > 0)) {
        document.getElementById('bcg' + (this.arrayScroll[i] - 3)).style.display = 'inline-block';
        if ((this.arrayScroll[i] < (this.bcgTemp.length + 1)) && this.arrayScroll[i] > 0 ) {
          document.getElementById('bcg' + (this.arrayScroll[i])).style.display = 'none';
        }
        btn.disabled = false;
      } else if ((this.arrayScroll[i] - 3 ) < 0 ) {
        btn2.disabled = true;
      }
      this.arrayScroll[i] = this.arrayScroll[i] - 3;
    }
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
          if (((this.arrayScroll[i] + 3) < (this.bcgTemp.length + 1)) && (this.arrayScroll[i] + 3) > 0) {
            document.getElementById('bcg' + (this.arrayScroll[i] + 3)).style.display = 'inline-block';
          }
        }
      } else if (this.arrayScroll[i] > (this.bcgTemp.length + 1)) {
        btn.disabled = true;
      }
      this.arrayScroll[i] = this.arrayScroll[i] + 3;
      console.log('hej to ja: ' + this.arrayScroll[i]);
    }
    if ( this.arrayScroll[2] >= this.bcgTemp.length ) {
      btn.disabled = true;
    }
  }
  moveLeftFrame() {
    const btn =  document.getElementById('rightDirectFrame') as HTMLButtonElement;
    const btn2 =  document.getElementById('leftDirectFrame') as HTMLButtonElement;
    for ( let i = 0; i < 3; i++ ) {
      if ((this.arrayScrollFrame[i] - 3 < (this.frames.length + 1)) && ((this.arrayScrollFrame[i] - 3 ) > 0)) {
        document.getElementById('frmBox' + (this.arrayScrollFrame[i] - 3)).style.display = 'inline-block';
        if ((this.arrayScrollFrame[i] < (this.frames.length + 1)) && this.arrayScrollFrame[i] > 0 ) {
          document.getElementById('frmBox' + (this.arrayScrollFrame[i])).style.display = 'none';
        }
        btn
          .disabled = false;
      } else if ((this.arrayScrollFrame[i] - 3 ) < 0 ) {
        btn2.disabled = true;
      }
      this.arrayScrollFrame[i] = this.arrayScrollFrame[i] - 3;
    }
    if ( this.arrayScrollFrame[0] <= 1 ) {
      btn2.disabled = true;
    }
  }
  moveRightFrame() {
    const btn =  document.getElementById('rightDirectFrame') as HTMLButtonElement;
    const btn2 =  document.getElementById('leftDirectFrame') as HTMLButtonElement;
    for ( let i = 0; i < 3; i++ ) {
      if ((this.arrayScrollFrame[i] < (this.frames.length + 1)) && this.arrayScrollFrame[i] > 0) {
        btn2.disabled = false;
        if ( (this.arrayScrollFrame[i] + 3) < (this.frames.length + 1 )) {
          document.getElementById('frmBox' + this.arrayScrollFrame[i]).style.display = 'none';
          if (((this.arrayScrollFrame[i] + 3) < (this.frames.length + 1)) && (this.arrayScrollFrame[i] + 3) > 0) {
            document.getElementById('frmBox' + (this.arrayScrollFrame[i] + 3)).style.display = 'inline-block';
          }
        }
      } else if (this.arrayScrollFrame[i] > (this.frames.length + 1)) {
        btn.disabled = true;
      }
      this.arrayScrollFrame[i] = this.arrayScrollFrame[i] + 3;
      console.log('hej to ja: ' + this.arrayScrollFrame[i]);
    }
    if ( this.arrayScrollFrame[2] >= this.frames.length ) {
      btn.disabled = true;
    }
  }
  /*showMore() {
    const x = document.createElement('IMG');
    x.setAttribute('src', '../../assets/img/icon3.png');
    x.setAttribute('style', 'background-size: cover; position: absolute; z-index: 0;');
    x.setAttribute('id', 'imgToChange2');
    document.getElementById('pdfForlandscape').appendChild(x);
  }*/
  set0degress() {
    this.rotate[this.currImg] = 0;
  }
  resetImg() {
    this.rotate[this.currImg] = 0;
    this.imgLeft[this.currImg] = 0;
    this.imgTop[this.currImg] = 0;
    this.imgWidth[this.currImg] = 10;
    this.imgHeight[this.currImg] = 10;
  }
  right(n) {
    const btn =  document.getElementById('btnLeft') as HTMLButtonElement;
    const btn2 =  document.getElementById('btnRight') as HTMLButtonElement;
    this.bcgDisplay[n] = 'none';
    this.bcgDisplay[n + 1] = 'block';
    this.currentStep = this.currentStep + 1;
    if (n === 0) {
      this.bool = 'none';
    }
    btn
      .disabled = false;
    if (this.currentStep === 3) {
      btn2.disabled = true;
    }
  }
  left(n) {
    const btn =  document.getElementById('btnLeft') as HTMLButtonElement;
    const btn2 =  document.getElementById('btnRight') as HTMLButtonElement;
    this.bcgDisplay[n] = 'none';
    this.bcgDisplay[n - 1] = 'block';
    this.currentStep = this.currentStep  - 1;
    if (n === 1) {
      this.bool = 'block';
    }
    btn2
      .disabled = false;
    if (this.currentStep === 0) {
      btn.disabled = true;
    }
  }
  landscapeOff(n) {
      if (n === 2) {
        this.landscape = 'none';
        document.getElementById('imgO2').style.filter = 'grayscale(0%)';
        document.getElementById('imgO1').style.filter = 'grayscale(100%)';
        document.getElementById('imgO2').style.transform = 'rotate(90deg) scale(1, 1)';
        document.getElementById('imgO1').style.transform = 'scale(.9, .9)';
      } else {
        this.landscape = 'inline-block';
        const element = document.getElementById('toPdf100Landscape');
        element.classList.remove('rotateInDownRight');
        document.getElementById('imgO2').style.filter = 'grayscale(100%)';
        document.getElementById('imgO1').style.filter = 'grayscale(0%)';
        document.getElementById('imgO2').style.transform = 'rotate(90deg) scale(.9, .9)';
        document.getElementById('imgO1').style.transform = 'scale(1, 1)';
      }
  }
  setScheme(n) {
    if (n === 50) {
      document.getElementById('centerLandscape').style.display = 'none';
      document.getElementById('rightLandscape').style.width = n + '%';
      document.getElementById('leftLandscape').style.width = n + '%';
      document.getElementById('centerLandscapeFix').style.display = 'none';
      document.getElementById('rightLandscapeFix').style.width = n + '%';
      document.getElementById('leftLandscapeFix').style.width = n + '%';
      document.getElementById('centerFix').style.display = 'none';
      document.getElementById('rightFix').style.width = n + '%';
      document.getElementById('leftFix').style.width = n + '%';
      document.getElementById('center').style.display = 'none';
      document.getElementById('right').style.width = n + '%';
      document.getElementById('left').style.width = n + '%';
      document.getElementById('scheme' + n).style.transform = 'scale(1,1)';
      document.getElementById('scheme' + n).style.border = 'rgba(87, 255, 0, 0.7) solid 3px';
      document.getElementById('scheme30').style.border = 'rgba(255,0,255,0.0) solid 3px';
      document.getElementById('scheme30').style.transform = 'scale(0.9,0.9)';
      document.getElementById('sign3').style.display = 'none';
      document.getElementById('scheme50').style.boxShadow = '5px 5px rgba(0, 0, 15, 0.2)';
      document.getElementById('scheme30').style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';
      this.scheme = 50;
    } else {
      document.getElementById('centerLandscape').style.display = 'inline-block';
      document.getElementById('rightLandscape').style.width = n + '%';
      document.getElementById('leftLandscape').style.width = n + '%';
      document.getElementById('centerLandscapeFix').style.display = 'inline-block';
      document.getElementById('rightLandscapeFix').style.width = n + '%';
      document.getElementById('leftLandscapeFix').style.width = n + '%';
      document.getElementById('centerFix').style.display = 'inline-block';
      document.getElementById('rightFix').style.width = n + '%';
      document.getElementById('leftFix').style.width = n + '%';
      document.getElementById('center').style.display = 'inline-block';
      document.getElementById('right').style.width = n + '%';
      document.getElementById('left').style.width = n + '%';
      document.getElementById('scheme50').style.transform = 'scale(0.9,0.9)';
      document.getElementById('scheme30').style.transform = 'scale(1,1)';
      document.getElementById('scheme' + n).style.border = 'rgba(87, 255, 0, 0.7) solid 3px';
      document.getElementById('scheme50').style.border = 'rgba(255,0,255,0.0) solid 3px';
      document.getElementById('sign3').style.display = 'inline-block';
      document.getElementById('scheme30').style.boxShadow = '5px 5px rgba(0, 0, 15, 0.2)';
      document.getElementById('scheme50').style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';
      this.scheme = 30;
    }
  }
  add() {
   this.userImg.push(this.userImg.length);
   this.rotate.push(0);
   this.imgWidth.push(10);
   this.imgHeight.push(10);
   this.imgTop.push(0);
   this.imgLeft.push(0);
   this.currImg = this.userImg.length - 1;
  }
  removeImg() {
    this.imgHeight[this.currImg] = 0;
    this.imgWidth[this.currImg] = 0;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  saveData(date) {
    const blob = new Blob( [this.createFileToSave()], {type: 'text/json'});
    fileSaver.saveAs(blob, 'template' + date + '.MACproject');
  }
  resetFiled() {
    this.userImgRotatetxt = '';
    this.userImgWidthtxt = '';
    this.userImgHeighttxt = '';
    this.userImgMarginLefttxt = '';
    this.userImgMarginRigthtxt = '';
    this.userImgBase64txt = '';
    this.txtTopText =  '';
    this.txtLeftText = '';
    this.txtRightText = '';
    this.txtSizeText = '';
    this.txtUserText = '';
    this.txtColorText = '';
    this.txtFontFamiliText = '';
  }
  createFileToSave() {
    console.log('font famili: ' + this.txtFontFamili);
    this.resetFiled();
    for ( let i = 0; i < this.userImgBase64.length; i ++) {
      if ( i !== this.rotate.length - 1 ) {
        this.userImgRotatetxt = this.userImgRotatetxt + '"' + this.rotate[i] +  '", ';
        this.userImgWidthtxt = this.userImgWidthtxt + '"' + this.imgWidth[i] +  '", ';
        this.userImgHeighttxt = this.userImgHeighttxt + '"' + this.imgHeight[i] +  '", ';
        this.userImgMarginLefttxt = this.userImgMarginLefttxt + '"' + this.imgLeft[i] +  '", ';
        this.userImgMarginRigthtxt = this.userImgMarginRigthtxt + '"' + this.imgTop[i] +  '", ';
        this.userImgBase64txt = this.userImgBase64txt + '"' +  this.userImgBase64[i] +  '", ';
      } else {
        this.userImgRotatetxt = this.userImgRotatetxt + '"' + this.rotate[i] +  '" ';
        this.userImgWidthtxt = this.userImgWidthtxt + '"' + this.imgWidth[i] +  '" ';
        this.userImgHeighttxt = this.userImgHeighttxt + '"' + this.imgHeight[i] +  '" ';
        this.userImgMarginLefttxt = this.userImgMarginLefttxt + '"' + this.imgLeft[i] +  '" ';
        this.userImgMarginRigthtxt = this.userImgMarginRigthtxt + '"' + this.imgTop[i] +  '" ';
        this.userImgBase64txt = this.userImgBase64txt + '"' +  this.userImgBase64[i] +  '" ';
      }
    }
    for ( let i = 0; i < this.userTxt.length; i ++) {
      if (i !== this.userTxt.length - 1) {
        this.txtTopText = this.txtTopText + '"' + this.txtTop[i] + '", ';
        this.txtLeftText = this.txtLeftText + '"' + this.txtLeft[i] + '", ';
        this.txtRightText = this.txtRightText + '"' + this.txtRight[i] + '", ';
        this.txtSizeText = this.txtSizeText + '"' + this.txtSize[i] + '", ';
        this.txtUserText = this.txtUserText + '"' + this.userTxt[i] + '", ';
        this.txtColorText = this.txtColorText + '"' + this.txtColor[i] + '", ';
        this.txtFontFamiliText = this.txtFontFamiliText + '"' + this.txtFontFamili[i] + '", ';
        console.log('font famili: ' + this.txtFontFamili[i]);
      } else {
        this.txtTopText = this.txtTopText + '"' + this.txtTop[i] + '" ';
        this.txtLeftText = this.txtLeftText + '"' + this.txtLeft[i] + '" ';
        this.txtRightText = this.txtRightText + '"' + this.txtRight[i] + '" ';
        this.txtSizeText = this.txtSizeText + '"' + this.txtSize[i] + '" ';
        this.txtUserText = this.txtUserText + '"' + this.userTxt[i] + '" ';
        this.txtColorText = this.txtColorText + '"' + this.txtColor[i] + '" ';
        this.txtFontFamiliText = this.txtFontFamiliText + '"' + this.txtFontFamili[i] + '" ';
        console.log('font famili: ' + this.txtFontFamili[i]);
      }
    }
    const txt = '{"arrayFontColor" : [ "'
      + this.arrayFontColor[0] + '", "'
      + this.arrayFontColor[1] + '", "'
      + this.arrayFontColor[2] + '", "'
      + this.arrayFontColor[3] + '", "'
      + this.arrayFontColor[4] + '", "'
      + this.arrayFontColor[5]
      + '"], "arrayFontFamili" : [ "'
      + this.arrayFontFamili[0] + '", "'
      + this.arrayFontFamili[1] + '", "'
      + this.arrayFontFamili[2] + '", "'
      + this.arrayFontFamili[3] + '", "'
      + this.arrayFontFamili[4] + '", "'
      + this.arrayFontFamili[5] + '"],'
      + ' "arrayFontSize" : ['
      + this.arrayFontSize[0] + ', '
      + this.arrayFontSize[1] + ', '
      + this.arrayFontSize[2] + ', '
      + this.arrayFontSize[3] + ', '
      + this.arrayFontSize[4] + '], '
      + '"bottom" : "' + this.bottom + '", '
      + '"marginLeft" : [ "'
      + this.marginLeft[0] + '", "'
      + this.marginLeft[1] + '", "'
      + this.marginLeft[2] + '", "'
      + this.marginLeft[3] + '" ], '
      + '"marginRight" : [ "'
      + this.marginRight[0] + '", "'
      + this.marginRight[1] + '", "'
      + this.marginRight[2] + '", "'
      + this.marginRight[3] + '" ], '
      + '"paddingTop" : [ "'
      + this.paddingTop + '", "'
      + this.paddingTopForWho + '", "'
      + this.paddingTopForWhat + '" ], '
      + '"img" : "'
      +  this.imgSrcFix + '", '
      + '"bcgColor" : "'
      + this.bcgColor + '", '
      + '"landscape" : "'
      + this.landscape + '", '
      + '"title" : "'
      + this.title.replace(/(\r\n\t|\n|\r\t)/gm, 'NEWLINE' ) + '", '
      + '"forWho" : "'
      + this.forWho.replace(/(\r\n\t|\n|\r\t)/gm, 'NEWLINE') + '", '
      + '"forWhat" : "'
      + this.forWhat.replace(/(\r\n\t|\n|\r\t)/gm, 'NEWLINE') + '", '
      + '"sign1" : "'
      + this.sign1.replace(/(\r\n\t|\n|\r\t)/gm, 'NEWLINE') + '", '
      + '"sign2" : "'
      + this.sign2.replace(/(\r\n\t|\n|\r\t)/gm, 'NEWLINE') + '", '
      + '"sign3" : "'
      + this.sign3.replace(/(\r\n\t|\n|\r\t)/gm, 'NEWLINE') + '", '
      + '"footer" : "'
      + this.footer.replace(/(\r\n\t|\n|\r\t)/gm, 'NEWLINE') + '", '
      + '"userBcgBase64" : [ '
      + this.userImgBase64txt + '],'
      + '"userImgRotate" : [ '
      + this.userImgRotatetxt + '],'
      + '"userImgWidth" : [ '
      + this.userImgWidthtxt + '],'
      + '"userImgHeight" : [ '
      + this.userImgHeighttxt + '],'
      + '"userImgLeft" : [ '
      + this.userImgMarginLefttxt + '],'
      + '"userImgTop" : [ '
      + this.userImgMarginRigthtxt + '],'
      + '"txtTop" : [ '
      + this.txtTopText + '],'
      + '"txtLeft" : [ '
      + this.txtLeftText + '],'
      + '"txtRight" : [ '
      + this.txtRightText + '],'
      + '"txtSize" : [ '
      + this.txtSizeText + '],'
      + '"txtUser" : [ '
      + this.txtUserText + '],'
      + '"txtColor" : [ '
      + this.txtColorText + '],'
      + '"txtFontFamili" : [ '
      + this.txtFontFamiliText + '],'
      + '"frame" : "'
      + this.imgSrcFrame + '", '
      + '"scheme" : "'
      + this.scheme
      + '" }';
    return txt;
  }
  onSelectFile(event) {
    try {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      let txt: any;
      document.getElementById('spinner').style.display = 'block';
      reader.onload = function () {
        txt = reader.result;
      };
      setTimeout( () => {
        this.jsonToArray(txt);
      }, 500);
    } catch (err) {
      this.resetSettings();
      this.openSnackBar('Nie udało się wczytać szablonu! Plik może być niepoprawny, uszkodzony lub niekompatybilny!', 'ok');
    }
    document.getElementById('spinner').style.display = 'none';
  }
  fileUpload(event: any) {
    this.add();
    const rmvBtn = document.getElementById('rmvImg') as HTMLButtonElement;
    rmvBtn.disabled = false;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader() as any;
      console.log('1');
      reader.onload = (event2: any) => {
        console.log('2');
        this.userImgBase64.push(event2.target.result);
      };
      console.log('3');
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  jsonToArray(txt) {
    try {
      const obj = JSON.parse(txt);
      this.setUserData(obj);
    } catch (err) {
      this.resetSettings();
      this.openSnackBar('Nie udało się wczytać szablonu! Plik może być niepoprawny, uszkodzony lub niekompatybilny!', 'ok');
    }
    document.getElementById('spinner').style.display = 'none';
  }
  resetBcg() {
    this.imgSrc = '../../assets/img/0.png';
    this.imgSrcFix = '../../assets/img/0.png';
    this.base64Tmp = '';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.transform = 'scale(0.8,0.8)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('bcg' + (this.lastValue + 1) ).style.border = 'black 1px solid';
  }
  resetFrame() {
    this.imgSrcFrame = '../../assets/img/0.png';
    document.getElementById('frmBox' + (this.lastValueFrame + 1) ).style.transform = 'scale(0.8,0.8)';
    document.getElementById('frmBox' + (this.lastValueFrame + 1) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('frmBox' + (this.lastValueFrame + 1) ).style.border = 'black 1px solid';
    document.getElementById('frmBox' + (this.lastValueFrame + 1) ).style.boxShadow = ' 0px 0px rgba(0, 0, 15, 0.2)';
  }
  setFormat(n) {
    this.format = n;
    document.getElementById('size' + n ).style.transform = 'scale(1,1)';
    if ( n === 'A4') {
      document.getElementById('sizeA5' ).style.transform = 'scale(0.8,0.8)';
    } else {
      document.getElementById('sizeA4').style.transform = 'scale(0.8, 0.8)';
    }
  }
  addTxt() {
    if ( this.currentTxt === -1 ) {
      document.getElementById('hiddenBox').style.display = 'inline-block';
    }
    this.actualTxt = '';
    this.currentTxt = this.currentTxt + 1;
    this.userTxt.push(this.actualTxt);
    this.txtTop.push(0);
    this.txtLeft.push(0);
    this.txtRight.push(0);
    this.txtSize.push(0.8);
    this.txtColor.push('#000000');
    this.txtFontFamili.push('Arial');
  }
  addTxtWithCustomValue(actualTxt, top, left, right, size, color, fontfamili) {
    if ( this.currentTxt === -1 ) {
      document.getElementById('hiddenBox').style.display = 'inline-block';
    }
    this.actualTxt = actualTxt;
    this.currentTxt = this.currentTxt + 1;
    this.userTxt.push(this.actualTxt);
    this.txtTop.push(top);
    this.txtLeft.push(left);
    this.txtRight.push(right);
    this.txtSize.push(size);
    this.txtColor.push(color);
    this.txtFontFamili.push(fontfamili);
  }
  setFontFamili(n) {
    console.log('to jest n:' +  n);
    this.txtFontFamili[this.currentTxt] = this.arraySelectFontFamili[n];
    console.log(this.txtFontFamili[this.currentTxt]);
    console.log('font famili: ' + this.txtFontFamili);


  }
}
