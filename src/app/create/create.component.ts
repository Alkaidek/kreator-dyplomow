import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {AngularFireDatabase} from 'angularfire2/database';
import {MatSnackBar} from '@angular/material';
import * as fileSaver from 'file-saver';
import html2canvas from 'html2canvas';

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
  percentLeft = [100, 100, 100];
  percentRight = [100, 100, 100];
  percentHeight = [80, 80, 80];
  userImgBase64 = [];
  userTxt = [];
  imgMAClogoFrame = '../../assets/img/MAClogoFrame.jpg';
  currImg = -1;
  bcgDisplay = ['block', 'block', 'block', 'block'];
  auth = 'block';
  bcgTemp = [];
  template: any;
  coordinatesTemplate = [];
  frames = [];
  bool = 'block';
  imagesSport = ['../../assets/img/sport/sport1.png',
    '../../assets/img/sport/sport2.png',
    '../../assets/img/sport/sport3.png',
    '../../assets/img/sport/sport4.png'];
  imagesAnimal = ['../../assets/img/animal/1.png',
    '../../assets/img/animal/2.png',
    '../../assets/img/animal/3.png',
    '../../assets/img/animal/4.png'];
  sportHeight = 11;
  animalHeight = 11;
  constructor(private db: AngularFireDatabase, public snackBar: MatSnackBar) {
    db.list('/base64').valueChanges().subscribe(bcgTemp => {
      for (let i = 0; i < bcgTemp.length; i++) {
        this.bcgTemp.push('' + bcgTemp[i] );
      }
    });
    db.list('/images/sport').valueChanges().subscribe(sport => {
      for (let i = 0; i < sport.length; i++) {
        this.imagesSport.push('' + sport[i] );
        this.setHeightSport(this.imagesSport);
      }
    });
    db.list('/images/animal').valueChanges().subscribe(animal => {
      for (let i = 0; i < animal.length; i++) {
        this.imagesAnimal.push('' + animal[i] );
        this.setHeightAnimal(this.imagesAnimal);
      }
    });
    db.list('/frame').valueChanges().subscribe(frames => {
      for (let i = 0; i < frames.length; i++) {
        this.frames.push('' + frames[i] );
      }
    });
    db.list('/base64tmp').valueChanges().subscribe(coordinatesTemplate => {
      for (let i = 0; i < coordinatesTemplate.length; i++) {
        this.coordinatesTemplate.push('' + coordinatesTemplate[i] );
      }
    });
  }
  MACblue = '#25408f';
  whiteColor = 'white';
  maxWidthUserTxtFieldTop = 80;
  maxWidthUserTxtFieldRight = 80;
  currentBaseTemplate = -1;
  bcgBtnDisable = true;
  frmBtnDisable = true;
  tmpBtnDisable = true;
  boolDisableUserImgFields = true;
  hidebox = true;
  actualTxt = '';
  landscape = 'inline-block';
  currentStep = 0;
  arrayScroll = [1, 2, 3];
  arrayScrollFrame = [1, 2, 3];
  bcgColor = '#ffffff';
  lastValue = 1;
  lastValueFrame = 1;
  base64Tmp = '';
  base64TmpFrame = '';
  base64 = '';
  forWho = '\n';
  forWhat = '\n';
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
  paddingTopFooter = 12;
  bottom = 0;
  multiple = 4.5;
  arrayFontSize = [3, 0.9, 2, 0.8, 2];
  arrayFontNameId = ['largeTxt', 'sFor', 'txtForWhat', 'smallTxt', 'left', 'right', 'center'];
  arrayFontFamili = ['Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial', 'Arial'];
  arrayFontColor = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
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
  txtStyle = [];
  txtWeight = [];
  txtVariant  = [];
  txtAlign = [];
  txt = [];
  currentTxt = -1;
  shadowColor = ['#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91'];
  shadowLarge = ['0px 0px', '0px 0px', '0px 0px'];
  shadowLargeFix = ['0px 0px', '0px 0px', '0px 0px'];
  shadowSmall = '0% 0%';
  shadowSmallFix = '0% 0%';
  txtColor = [];
  disp = 'block';
  txtColorText = '';
  txtFontFamili = [];
  bcgRotateX = 1;
  bcgRotateY = 1;
  frmRotateX = 1;
  frmRotateY = 1;
  txtFontFamiliText = '';
  arraySelectFontFamili = ['Arial', 'Century Gothic', 'AbrilFatface', 'Aladin', 'Allura', 'Georgia',
    'Times New Roman', 'Comic Sans MS', 'Arial Black', 'Impact', 'Lucida Console', 'Lucida Sans Unicode',
    'Courier New', 'Copperplate Gothic Light', 'Palatino Linotype', 'Tahoma', 'Trebuchet MS', 'Verdana'];
  currentFontFamili = 0;
  letterSpacing = 0;
  letterSpacingForWho = 0;
  fontStyle = ['normal', 'normal', 'normal', 'normal', 'normal'];
  fontWeight  = ['normal', 'normal', 'normal', 'normal', 'normal'];
  fontVariant  = ['normal', 'normal', 'normal', 'normal', 'normal'];
  textAlign = ['center', 'center', 'center', 'center', 'center'];
  scroll = (): void => {
    const imgMAClogo = document.getElementById('MAClogo') as HTMLImageElement;
    if ( window.scrollY > 50 ) {
      imgMAClogo.style.width = '6.875vh';
      imgMAClogo.style.height = '5vh';
      document.getElementById('logoBox').style.height = '5vh';
      const stepper = document.querySelector('.mat-horizontal-stepper-header-container') as HTMLElement;
      stepper.style.top = '5vh' ;
      /*document.getElementById('fbLogo').style.height = '3vh';
      document.getElementById('ytLogo').style.height = '3vh';
      document.getElementById('fbLogo').style.width = '3vh';
      document.getElementById('ytLogo').style.width = '3vh';
      document.getElementById('fbLogo').style.marginTop = '10px';
      document.getElementById('ytLogo').style.marginTop = '10px';*/
      document.getElementById('logoBox').style.fontSize = '1.3vh';
      document.getElementById('logoBox').style.paddingTop = '0.5vh';
      const elements = document.getElementsByClassName('logoText') as any;
      for ( let i = 0; i < elements.length; i++ ) {
        elements[i].style.marginTop = '5px';
      }
    }
    if ( window.scrollY === 0 ) {
      imgMAClogo.style.width = '11vh';
      imgMAClogo.style.height = '8vh';
      document.getElementById('logoBox').style.height = '8vh';
      document.getElementById('logoBox').style.fontSize = '2vh';
      document.getElementById('logoBox').style.paddingTop = '0vh';
      const stepper = document.querySelector('.mat-horizontal-stepper-header-container') as HTMLElement;
      stepper.style.top = '8vh' ;
      /*document.getElementById('fbLogo').style.marginTop = '16px';
      document.getElementById('ytLogo').style.marginTop = '16px';
      document.getElementById('fbLogo').style.height = '4.5vh';
      document.getElementById('ytLogo').style.height = '4.5vh';
      document.getElementById('fbLogo').style.width = '4.5vh';
      document.getElementById('ytLogo').style.width = '4.5vh';*/
      const elements = document.getElementsByClassName('logoText') as any;
      for ( let i = 0; i < elements.length; i++ ) {
        elements[i].style.marginTop = '10px';
      }
    }
  }
  ngOnInit() {
    this.cookies();
    this.session();
    this.setOnInitData();
    this.addScrollListener();
    this.setPaddingAnchor();
  }
  setPaddingAnchor() {
    setTimeout( () => {
      this.checkWidth(0);
      this.checkWidth(1);
      this.checkWidth(2);
    }, 300);
  }
  /*checkArray() {
    console.log('array');
    console.log(this.sport);
    console.log(this.sport[0].sport);
  }*/
  addScrollListener() {
    window.addEventListener('scroll', this.scroll, true);
  }
  session() {
    if (typeof(Storage) !== 'undefined') {
      console.log('ok');
      /*localStorage*/
      console.log('sesja:bofore: ' + localStorage.getItem('key'));
      if ( localStorage.getItem('key') === null ) {
        console.log('Go Away bad Hacker!');
      }
      localStorage.setItem(
        'key', 'MaBla93' + Math.floor(Math.random() * 999 ) + 1 + 'LocalStorage' + Math.floor(Math.random() * 999 ) + 1 );
      console.log('sesja:after: ' + localStorage.getItem('key'));
      /*sessionStorage*/
      console.log('sesja:before: ' + sessionStorage.getItem('key'));
      if ( localStorage.getItem('key') === 'null' ) {
        console.log('Go Away bad Hacker!');
      }
      sessionStorage.setItem(
        'key', 'MaBla93' + Math.floor(Math.random() * 999 ) + 1 + 'SessionStorage' + Math.floor(Math.random() * 999 ) + 1 );
      console.log('sesja:after: ' + sessionStorage.getItem('key'));
    } else {
      console.log('sorry');
    }
  }
  cookies() {
    /*console.log('ciasteczka: ' + document.cookie);*/
    /*const d = new Date();
    d.setTime(d.getTime() + ( 2 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = 'email=' + this.email + ';' + expires + ';path=/';
    console.log('email=' + this.email + ';' + expires + ';path=/');*/
    const value = '; ' + document.cookie;
    const parts = value.split('; CookiesPrivagles=');
    if ( parts.length === 2 ) {
      this.disp = parts.pop().split(';').shift();
    }
    console.log('ciasteczka: ' + document.cookie);
  }
  setOnInitData() {
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
      /*document.getElementById('scheme30').style.boxShadow = '0px 0px 40px #eb008b, 2px 2px 10px #c109ea, -2px -2px 10px #c109ea';*/
      document.getElementById('scheme30').style.filter = 'grayscale(0%)';
      document.getElementById('scheme30').style.opacity = '1';
      this.scheme = 30;
      this.landscapeOff(2);
      const width = document.getElementById('toPdf100').offsetWidth;
      console.log('wartosć: ' + ( 2480 / width) );
      this.multiple = (2480 / width );
    }, 500);
    return this.multiple;
  }
  highlightBcg(imgSrc) {
    this.lastValue = imgSrc;
    console.log('up' + this.lastValue);
    document.getElementById('img' + (imgSrc )).style.boxShadow = '5px 5px rgba(0, 0, 15, 0.2)';
    document.getElementById('img' + (this.lastValue) ).style.webkitTransform = 'scale(0.90,0.9)';
    document.getElementById('img' + (imgSrc )).style.border = '#3aaaff 3px solid';
    this.lastValue = 0;
  }
  downgradeBcg(imgSrc) {
    console.log('down' + this.lastValue);
    document.getElementById('img' + (imgSrc) ).style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';
    document.getElementById('img' + (imgSrc) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('img' + (imgSrc ) ).style.border = 'white 1px solid';
  }
  highlightFrame(imgSrc) {
    this.lastValueFrame = imgSrc;
    document.getElementById('frm' + (imgSrc )).style.transform = 'scale(0.9,0.9)';
    document.getElementById('frm' + (imgSrc ) ).style.webkitTransform = 'scale(0.9,0.9)';
    document.getElementById('frm' + (imgSrc ) ).style.boxShadow = '5px 5px rgba(0, 0, 15, 0.2)';
    document.getElementById('frm' + (imgSrc )).style.border = '#3aaaff 3px solid';
    this.lastValueFrame = 0;
  }
  downgradeFrame() {
    console.log('down' + this.lastValueFrame);
    document.getElementById('frm' + (this.lastValueFrame ) ).style.transform = 'scale(0.8,0.8)';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.border = 'white 1px solid';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.boxShadow = ' 0px 0px rgba(0, 0, 15, 0.2)';
  }
  takeBcg(imgSrc) {
    this.bcgBtnDisable = false;
    document.getElementById('img' + (this.lastValue) ).style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';
    document.getElementById('img' + (this.lastValue) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('img' + (this.lastValue ) ).style.border = 'white 1px solid';
    this.lastValue = imgSrc;
    document.getElementById('img' + (imgSrc )).style.boxShadow = '5px 5px rgba(0, 0, 15, 0.2)';
    document.getElementById('img' + (this.lastValue) ).style.webkitTransform = 'scale(0.90,0.9)';
    document.getElementById('img' + (imgSrc )).style.border = '#3aaaff 3px solid';
    this.base64Tmp = imgSrc;
    this.imgSrc = '' + (imgSrc + 1);
    this.imgSrcFix = this.bcgTemp[imgSrc];
    this.base64 = '../../assets/img/' + (imgSrc + 1 ) + '.png';
    switch ( imgSrc ) {
      case imgSrc:
        console.log('number' + imgSrc);
        console.log('Array' + this.coordinatesTemplate[imgSrc]);
        this.paddingTop = Number(this.coordinatesTemplate[imgSrc][0]);
        this.paddingTopForWho = Number(this.coordinatesTemplate[imgSrc][0]) + 10;
        this.paddingTopForWhat = Number(this.coordinatesTemplate[imgSrc][0]) + 20;
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
    this.frmBtnDisable = false;
    document.getElementById('frm' + (this.lastValueFrame ) ).style.transform = 'scale(0.8,0.8)';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.border = 'white 1px solid';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.boxShadow = ' 0px 0px rgba(0, 0, 15, 0.2)';
    this.lastValueFrame = imgSrc;
    document.getElementById('frm' + (imgSrc )).style.transform = 'scale(0.9,0.9)';
    document.getElementById('frm' + (imgSrc ) ).style.webkitTransform = 'scale(0.9,0.9)';
    document.getElementById('frm' + (imgSrc ) ).style.boxShadow = '5px 5px rgba(0, 0, 15, 0.2)';
    document.getElementById('frm' + (imgSrc )).style.border = '#3aaaff 3px solid';
    this.base64TmpFrame = imgSrc;
    this.imgSrc = '' + (imgSrc );
    this.imgSrcFrame = this.frames[imgSrc];
    this.imgMAClogoFrame = '../../assets/img/0.png';
  }
  generateHQualityPdf() {
    document.getElementById('spinner').style.display = 'block';
    this.generatePdf();
  }
  generatePdf() {
    if (this.landscape !== 'inline-block') {
      const data =  document.getElementById('toPdf100Fix');
      html2canvas(data).then(canvas => {
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.deletePage(1);
        pdf.addPage(imgWidth, imgHeight);
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('TwojDyplom.pdf');
        document.getElementById('spinner').style.display = 'none';
      });
    } else {
      const data =  document.getElementById('toPdf100LandscapeFix');
      html2canvas(data).then(canvas => {
        const imgWidth = 297;
        const pageHeight = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.deletePage(1);
        pdf.addPage(imgWidth, imgHeight);
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('TwojDyplom.pdf');
        document.getElementById('spinner').style.display = 'none';
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
  setHeightSport(array) {
    const divide = array.length / 5;
    if ( divide >= 0 && divide < 1) {
      this.sportHeight  = 11;
    }
    if ( divide >= 1 && divide < 2) {
      this.sportHeight  = 22;
    }
    if ( divide >= 2 && divide < 3) {
      this.sportHeight  = 33;
    }
  }
  setHeightAnimal(array) {
    const divide = array.length / 5;
    if ( divide >= 0 && divide < 1) {
      this.animalHeight  = 11;
    }
    if ( divide >= 1 && divide < 2) {
      this.animalHeight  = 22;
    }
    if ( divide >= 2 && divide < 3) {
      this.animalHeight  = 33;
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
      this.shadowColor[0] =  template.shadowColor[0];
      this.shadowColor[1] =  template.shadowColor[1];
      this.shadowColor[2] =  template.shadowColor[2];
      this.shadowColor[3] =  template.shadowColor[3];
      this.shadowColor[4] =  template.shadowColor[4];
      this.shadowLarge[0] =  template.shadowLarge[0];
      this.shadowLarge[1] =  template.shadowLarge[1];
      this.shadowLarge[2] =  template.shadowLarge[2];
      this.shadowLarge[3] =  template.shadowLarge[3];
      this.setShadowFix(template);
      this.fontStyle[0] =  template.fontStyle[0];
      this.fontStyle[1] =  template.fontStyle[1];
      this.fontStyle[2] =  template.fontStyle[2];
      this.fontStyle[3] =  template.fontStyle[3];
      this.fontStyle[4] =  template.fontStyle[4];
      this.fontWeight[0] =  template.fontWeight[0];
      this.fontWeight[1] =  template.fontWeight[1];
      this.fontWeight[2] =  template.fontWeight[2];
      this.fontWeight[3] =  template.fontWeight[3];
      this.fontWeight[4] =  template.fontWeight[4];
      this.fontVariant[0] =  template.fontVariant[0];
      this.fontVariant[1] =  template.fontVariant[1];
      this.fontVariant[2] =  template.fontVariant[2];
      this.fontVariant[3] =  template.fontVariant[3];
      this.fontVariant[4] =  template.fontVariant[4];
      try {
        this.bcgRotateX = template.bcgRotateX;
        this.bcgRotateY = template.bcgRotateY;
        this.frmRotateX = template.frmRotateX;
        this.frmRotateY = template.frmRotateY;
      } catch (e) {
        console.log('no rotate here');
      }
      try {
        this.textAlign[0] = template.textAlign[0];
        this.textAlign[1] = template.textAlign[1];
        this.textAlign[2] = template.textAlign[2];
        this.textAlign[3] = template.textAlign[3];
        this.textAlign[4] = template.textAlign[4];
      } catch (e) {
        console.log('no text Aling here');
      }
      this.paddingTopFooter = template.paddingTopFooter;
      this.shadowSmall =  template.shadowSmall;
      this.letterSpacing = template.letterSpacing;
      this.letterSpacingForWho = template.letterSpacingForWho;
      this.bottom = template.bottom;
      this.imgSrcFrame = template.frame;
      if ( this.imgSrcFrame === '../../assets/img/0.png' ) {
        this.downgradeFrame();
        this.imgMAClogoFrame = '../../assets/img/MAClogoFrame.jpg';
      } else {
        this.imgMAClogoFrame = '../../assets/img/0.png';
        this.frmBtnDisable = false;
        for ( let i = 0; i < this.frames.length; i++ ) {
          if (this.imgSrcFrame === this.frames[i]) {
            this.downgradeFrame();
            this.highlightFrame(i);
            const tmp = this.frames[i]
            this.frames[i] = this.frames[0];
            this.frames[0] = tmp;
          }
        }
      }
      if ( template.img === '' || template.img === '../../assets/img/0.png') {
        this.downgradeBcg(this.lastValue);
        this.imgSrcFix =  '../../assets/img/0.png';
      } else {
        this.imgSrcFix = template.img;
        this.bcgBtnDisable = false;
        for ( let i = 0; i < this.bcgTemp.length; i++ ) {
          if (this.imgSrcFix === this.bcgTemp[i]) {
            this.downgradeBcg(this.lastValue);
            this.highlightBcg(i);
            const tmp = this.bcgTemp[i]
            this.bcgTemp[i] = this.bcgTemp[0];
            this.bcgTemp[0] = tmp;
          }
        }
      }
      this.base64Tmp = template.img;
      for (let i = 0; i < template.arrayFontSize.length; i++ ) {
        console.log(' ' + template.arrayFontSize[i]);
        this.arrayFontSize[i] = template.arrayFontSize[i];
      }
      for (let i = 0; i < template.arrayFontColor.length; i++ ) {
        this.arrayFontColor[i] =  template.arrayFontColor[i];
      }
      this.arrayFontFamili = [template.arrayFontFamili[0], template.arrayFontFamili[1], template.arrayFontFamili[2],
        template.arrayFontFamili[3], template.arrayFontFamili[4], template.arrayFontFamili[5], template.arrayFontFamili[6]];
      this.title =  template.title.replace('NEWLINE', '\n' );
      /*this.forWho =  template.forWho.replace('NEWLINE', '\n' );*/
      this.forWho =  template.forWho.split('NEWLINE').join('\n');
      this.forWhat =  template.forWhat.split('NEWLINE').join('\n');
      this.sign1 =  template.sign1.split('NEWLINE').join('\n');
      this.sign2 = template.sign2.split('NEWLINE').join('\n');
      this.sign3 = template.sign3.split('NEWLINE').join('\n');
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
        this.boolDisableUserImgFields = false;
      }
      try {
        if ( template.txtTop.length > 0) {
          for ( let i = 0; i < template.txtTop.length; i++) {
            this.addTxtWithCustomValue(template.txtUser[i], template.txtTop[i],
              template.txtLeft[i], template.txtRight[i], template.txtSize[i], template.txtColor[i], template.txtFontFamili[i],
              template.txtStyle[i], template.txtWeight[i], template.txtVariant[i], template.txtAlign[i]);
            this.setUserTxtFiledProperty(i);
          }
        }
      } catch (e) {
        console.log('Old UserTxt Element');
      }
      this.setAllButtonColor();
    } catch (err) {
      this.resetSettings();
      this.openSnackBar('Nie udało się wczytać szablonu! Plik może być niepoprawny, uszkodzony lub niekompatybilny!', 'ok');
    }
    document.getElementById('spinner').style.display = 'none';
  }
  resetSettings() {
    try {
      document.getElementById('base' + this.currentBaseTemplate ).style.transform = 'scale(0.9,0.9)';
      document.getElementById('base' + this.currentBaseTemplate).style.filter = 'grayscale(100%)';
    } catch (err) {
      console.log('no element');
    }
    this.txtAlign = [];
    this.tmpBtnDisable = true;
    this.txtStyle = [];
    this.txtWeight = [];
    this.txtVariant  = [];
    this.shadowLarge = ['0px 0px', '0px 0px', '0px 0px'];
    this.shadowLargeFix = ['0px 0px', '0px 0px', '0px 0px'];
    this.shadowSmall = '0px 0px';
    this.shadowSmallFix = '0px 0px';
    this.bcgRotateX = 1;
    this.bcgRotateY = 1;
    this.frmRotateX = 1;
    this.frmRotateY = 1;
    this.bcgBtnDisable = true;
    this.frmBtnDisable = true;
    this.boolDisableUserImgFields = true;
    this.hidebox = true;
    this.imgMAClogoFrame = '../../assets/img/MAClogoFrame.jpg';
    this.letterSpacing = 0;
    this.letterSpacingForWho = 0;
    this.bcgColor = '#ffffff';
    this.landscape = '';
    this.landscapeOff(2);
    this.setScheme(30);
    this.paddingTopFooter = 12;
    this.textAlign = ['center', 'center', 'center', 'center', 'center'];
    this.fontStyle = ['normal', 'normal', 'normal', 'normal', 'normal'];
    this.fontWeight  = ['normal', 'normal', 'normal', 'normal', 'normal'];
    this.fontVariant  = ['normal', 'normal', 'normal', 'normal', 'normal'];
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
    this.txtColorText = '';
    this.userTxt = [];
    this.txtFontFamili = [];
    this.txtFontFamiliText = '';
    this.imgSrcFrame = '../../assets/img/0.png';
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
    }
    if ( this.arrayScrollFrame[2] >= this.frames.length ) {
      btn.disabled = true;
    }
  }
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
      document.getElementById('scheme30').style.transform = 'scale(0.9,0.9)';
      document.getElementById('sign3').style.display = 'none';
      /*document.getElementById('scheme50').style.boxShadow = '0px 0px 40px #eb008b, 2px 2px 10px #c109ea, -2px -2px 10px #c109ea';
      document.getElementById('scheme30').style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';*/
      document.getElementById('scheme50').style.filter = 'grayscale(0%)';
      document.getElementById('scheme30').style.filter = 'grayscale(100%)';
      document.getElementById('scheme50').style.opacity = '1';
      document.getElementById('scheme30').style.opacity = '0.5';
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
      document.getElementById('sign3').style.display = 'inline-block';
      document.getElementById('scheme50').style.filter = 'grayscale(100%)';
      document.getElementById('scheme30').style.filter = 'grayscale(0%)';
      /*document.getElementById('scheme30').style.boxShadow = '0px 0px 40px #eb008b, 2px 2px 10px #c109ea, -2px -2px 10px #c109ea';
      document.getElementById('scheme50').style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';*/
      document.getElementById('scheme30').style.opacity = '1';
      document.getElementById('scheme50').style.opacity = '0.5';
      this.scheme = 30;
    }
  }
  add() {
    this.boolDisableUserImgFields = false;
    this.userImg.push(this.userImg.length);
    this.rotate.push(0);
    this.imgWidth.push(10);
    this.imgHeight.push(10);
    this.imgTop.push(0);
    this.imgLeft.push(0);
    this.currImg = this.userImg.length - 1;
    setTimeout(() => {
        this.setUserImgFrame(this.currImg);
      }, 500 );
  }
  removeImg() {
    this.userImg.pop();
    this.userImgBase64.splice(this.currImg, 1);
    this.rotate.splice(this.currImg, 1);
    this.imgWidth.splice(this.currImg, 1);
    this.imgHeight.splice(this.currImg, 1);
    this.imgTop.splice(this.currImg, 1);
    this.imgLeft.splice(this.currImg, 1);
    this.currImg = this.userImg.length - 1;
    this.setUserImgFrame(this.currImg);
    if ( this.currImg === -1 ) {
      this.boolDisableUserImgFields = true;
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  saveData(date) {
    const blob = new Blob( [this.createFileToSave()], {type: 'text/json'});
    const result = fileSaver.saveAs(blob, 'template' + date + '.MACproject');
    return result.readyState;
  }
  createTextToJSON(name): String {
    let txt = '';
    for ( let i = 0; i < name.length; i ++) {
      if (i !== name.length - 1) {
        txt = txt + '"' + name[i] + '", ';
      } else {
        txt = txt + '"' + name[i] + '" ';
      }
    }
    return txt;
  }
  createFileToSave() {
    const txt = '{"arrayFontColor" : [ '
      + this.createTextToJSON(this.arrayFontColor) + '],'
      + ' "arrayFontFamili" : [ '
      + this.createTextToJSON(this.arrayFontFamili) + '],'
      + ' "arrayFontSize" : ['
      + this.createTextToJSON(this.arrayFontSize) + '],'
      + '"bottom" : "' + this.bottom + '", '
      + '"paddingTopFooter" : "' + this.paddingTopFooter + '", '
      + '"bcgRotateX" : "' + this.bcgRotateX + '", '
      + '"bcgRotateY" : "' + this.bcgRotateY + '", '
      + '"frmRotateX" : "' + this.frmRotateX + '", '
      + '"frmRotateY" : "' + this.frmRotateY + '", '
      + '"marginLeft" : [ '
      + this.createTextToJSON(this.marginLeft) + '],'
      + '"marginRight" : [ '
      + this.createTextToJSON(this.marginRight) + '],'
      + '"shadowColor" : [ '
      + this.createTextToJSON(this.shadowColor) + '],'
      + '"shadowLarge" : [ '
      + this.createTextToJSON(this.shadowLarge) + '],'
      + '"fontStyle" : [ '
      + this.createTextToJSON(this.fontStyle) + '],'
      + '"fontWeight" : [ '
      + this.createTextToJSON(this.fontWeight) + '],'
      + '"fontVariant" : [ '
      + this.createTextToJSON(this.fontVariant) + '],'
      + '"textAlign" : [ '
      + this.createTextToJSON(this.textAlign) + '],'
      + '"shadowSmall" : "'
      +  this.shadowSmall + '", '
      + '"letterSpacing" : "'
      + this.letterSpacing + '", '
      + '"letterSpacingForWho" : "'
      + this.letterSpacingForWho + '", '
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
      + this.createTextToJSON(this.userImgBase64) + '],'
      + '"userImgRotate" : [ '
      + this.createTextToJSON(this.rotate) + '],'
      + '"userImgWidth" : [ '
      + this.createTextToJSON(this.imgWidth) + '],'
      + '"userImgHeight" : [ '
      + this.createTextToJSON(this.imgHeight) + '],'
      + '"userImgLeft" : [ '
      + this.createTextToJSON(this.imgLeft) + '],'
      + '"userImgTop" : [ '
      + this.createTextToJSON(this.imgTop) + '],'
      + '"txtTop" : [ '
      + this.createTextToJSON(this.txtTop) + '],'
      + '"txtLeft" : [ '
      + this.createTextToJSON(this.txtLeft) + '],'
      + '"txtRight" : [ '
      + this.createTextToJSON(this.txtRight) + '],'
      + '"txtSize" : [ '
      + this.createTextToJSON(this.txtSize) + '],'
      + '"txtStyle" : [ '
      + this.createTextToJSON(this.txtStyle) + '],'
      + '"txtWeight" : [ '
      + this.createTextToJSON(this.txtWeight) + '],'
      + '"txtVariant" : [ '
      + this.createTextToJSON(this.txtVariant) + '],'
      + '"txtAlign" : [ '
      + this.createTextToJSON(this.txtAlign) + '],'
      + '"txtUser" : [ '
      + this.createTextToJSON(this.userTxt) + '],'
      + '"txtColor" : [ '
      + this.createTextToJSON(this.txtColor) + '],'
      + '"txtFontFamili" : [ '
      + this.createTextToJSON(this.txtFontFamili) + '],'
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
  }
  fileUpload(event: any) {
    this.add();
    const rmvBtn = document.getElementById('rmvImg') as HTMLButtonElement;
    rmvBtn.disabled = false;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader() as any;
      reader.onload = (event2: any) => {
        this.userImgBase64.push(event2.target.result);
      };
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
    this.bcgRotateX = 1;
    this.bcgRotateY = 1;
    this.bcgBtnDisable = true;
    this.imgSrc = '../../assets/img/0.png';
    this.imgSrcFix = '../../assets/img/0.png';
    this.base64Tmp = '';
    this.bcgColor = '#ffffff';
    document.getElementById('img' + (this.lastValue ) ).style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';
    document.getElementById('img' + (this.lastValue ) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('img' + (this.lastValue ) ).style.border = 'white 1px solid';
  }
  resetFrame() {
    this.frmRotateX = 1;
    this.frmRotateY = 1;
    this.frmBtnDisable = true;
    this.imgSrcFrame = '../../assets/img/0.png';
    this.imgMAClogoFrame = '../../assets/img/MAClogoFrame.jpg';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.border = 'white 1px solid';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.boxShadow = ' 0px 0px rgba(0, 0, 15, 0.2)';
  }
  addTxt() {
    if ( this.currentTxt === -1 ) {
      this.hidebox = false;
    }
    this.actualTxt = '';
    this.currentTxt = this.userTxt.length;
    this.userTxt.push(this.actualTxt);
    this.txtTop.push(35);
    this.txtLeft.push(0);
    this.txtRight.push(0);
    this.txtSize.push(3);
    this.txtColor.push('#000000');
    this.txtFontFamili.push('Arial');
    this.txtStyle.push('normal');
    this.txtWeight.push('normal');
    this.txtVariant.push('normal');
    this.setWhiteColor('fontStyle5');
    this.setWhiteColor('fontVariant5');
    this.setWhiteColor('fontWeight5');
    this.txtAlign.push('left');
    this.setTxtAlignWithoutPossitionChange(this.txtAlign[this.currentTxt]);
  }
  setUserTxtFiledProperty(n) {
    if ( this.txtWeight[n] === 'normal' ) {
      this.setWhiteColor('fontWeight5');
    } else {
      this.setBlueColor('fontWeight5');
    }
    if ( this.txtStyle[n] === 'normal' ) {
      this.setWhiteColor('fontStyle5');
    } else {
      this.setBlueColor('fontStyle5');
    }
    if ( this.txtVariant[n] === 'normal' ) {
      this.setWhiteColor('fontVariant5');
    } else {
      this.setBlueColor('fontVariant5');
    }
    console.log('textAlign: ' + this.txtAlign + ' : ' + n);
    this.setTxtAlignWithoutPossitionChange(this.txtAlign[n]);
  }
  addTxtWithCustomValue(actualTxt, top, left, right, size, color, fontfamili, style, weight, variant, align) {
    if ( this.currentTxt === -1 ) {
      this.hidebox = false;
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
    this.txtStyle.push(style);
    this.txtWeight.push(weight);
    this.txtVariant.push(variant);
    this.txtAlign.push(align);
    this.setTxtAlignWithoutPossitionChange(this.txtAlign[this.currentTxt]);
  }
  setFontFamili(n) {
    this.txtFontFamili[this.currentTxt] = this.arraySelectFontFamili[n];
  }
  setFontFamiliForMainField(n, m) {
    this.arrayFontFamili[m] = this.arraySelectFontFamili[n];
    if (m === 3 ) {
      this.arrayFontFamili[4] = this.arraySelectFontFamili[n];
      this.arrayFontFamili[5] = this.arraySelectFontFamili[n];
    }
    setTimeout( () => {
      if (n === 0) {
        this.checkWidthWithCenter(0);
      } else if (n === 1) {
        this.checkWidthWithCenter(1);
      } else if (n === 2 ) {
        this.checkWidthWithCenter(2);
      }
    }, 300);
  }
  shadowOnOff(n, m) {
    if ( m === 0 ) {
      if ( this.shadowLarge[n] === '4px 4px 4px' ) {
        this.shadowLarge[n] = '0px 0px';
        this.shadowLargeFix[n] = '0px 0px';
      } else {
        this.shadowLarge[n] = '4px 4px 4px';
        this.shadowLargeFix[n] = '20px 20px 20px';
      }
    } else {
      if ( this.shadowSmall === '2px 2px 2px' ) {
        this.shadowSmall = '0px 0px';
        this.shadowSmallFix = '0px 0px';
      } else {
        this.shadowSmall = '2px 2px 2px';
        this.shadowSmallFix = '10px 10px 10px';
      }
    }
  }
  setShadowFix(temp) {
    for (let i = 0; i < temp.shadowLarge.length; i++ ) {
      if ( temp.shadowLarge[i] === '4px 4px 4px' ) {
        this.shadowLargeFix[i] = '20px 20px 20px';
      } else {
        this.shadowLargeFix[i] = '0px 0px';
      }
    }
    if ( temp.shadowSmall === '2px 2px 2px' ) {
      this.shadowSmallFix = '10px 10px 10px';
    } else {
      this.shadowSmallFix = '0px 0px';
    }
  }
  setFontStyle(n) {
    if (this.fontStyle[n] === 'italic') {
      this.fontStyle[n] = 'normal';
    } else {
      this.fontStyle[n] = 'italic';
    }
    this.setButtonColor('fontStyle' + n);
    setTimeout( () => {
      if (n === 0) {
        this.checkWidthWithCenter(0);
      } else if (n === 1) {
        this.checkWidthWithCenter(1);
      } else if (n === 2 ) {
        this.checkWidthWithCenter(2);
      }
    }, 300);
  }
  setTxtStyle() {
    if (this.txtStyle[this.currentTxt] === 'italic') {
      this.txtStyle[this.currentTxt] = 'normal';
    } else {
      this.txtStyle[this.currentTxt] = 'italic';
    }
    this.setButtonColor('fontStyle5');
    this.setMaxWidthForUserTxt();
  }
  setTxtWeight() {
    if (this.txtWeight[this.currentTxt] === 'bold') {
      this.txtWeight[this.currentTxt] = 'normal';
    } else {
      this.txtWeight[this.currentTxt] = 'bold';
    }
    this.setButtonColor('fontWeight5');
    this.setMaxWidthForUserTxt();
  }
  setTxtVariant() {
    if (this.txtVariant[this.currentTxt] === 'small-caps') {
      this.txtVariant[this.currentTxt] = 'normal';
    } else {
      this.txtVariant[this.currentTxt] = 'small-caps';
    }
    this.setButtonColor('fontVariant5');
    this.setMaxWidthForUserTxt();
  }
  setTxtAlign(value) {
    if (value === 'left') {
      this.txtAlign[this.currentTxt] = 'left';
      this.txtLeft[this.currentTxt] = 0;
      this.setWhiteColor('alignCenter5');
      this.setBlueColor('alignLeft5');
      this.setWhiteColor('alignRight5');
    } else if (value === 'right') {
      this.txtAlign[this.currentTxt] = 'right';
      this.txtLeft[this.currentTxt] = this.setMaxWidthForUserTxt();
      this.setWhiteColor('alignCenter5');
      this.setWhiteColor('alignLeft5');
      this.setBlueColor('alignRight5');
    } else {
      this.txtAlign[this.currentTxt] = 'center';
      this.txtLeft[this.currentTxt] = this.setMaxWidthForUserTxt() / 2;
      this.setBlueColor('alignCenter5');
      this.setWhiteColor('alignLeft5');
      this.setWhiteColor('alignRight5');
    }
  }
  setTxtAlignWithoutPossitionChange(value) {
    if (value === 'left') {
      this.txtAlign[this.currentTxt] = 'left';
      this.setWhiteColor('alignCenter5');
      this.setBlueColor('alignLeft5');
      this.setWhiteColor('alignRight5');
    } else if (value === 'right') {
      this.txtAlign[this.currentTxt] = 'right';
      this.setWhiteColor('alignCenter5');
      this.setWhiteColor('alignLeft5');
      this.setBlueColor('alignRight5');
    } else {
      this.txtAlign[this.currentTxt] = 'center';
      this.setBlueColor('alignCenter5');
      this.setWhiteColor('alignLeft5');
      this.setWhiteColor('alignRight5');
    }
  }
  setFontWeight(n) {
    if (this.fontWeight[n] === 'bold') {
      this.fontWeight[n] = 'normal';
    } else {
      this.fontWeight[n] = 'bold';
    }
    this.setButtonColor('fontWeight' + n);
    setTimeout( () => {
      if (n === 0) {
        this.checkWidthWithCenter(0);
      } else if (n === 1) {
        this.checkWidthWithCenter(1);
      } else if (n === 2 ) {
        this.checkWidthWithCenter(2);
      }
    }, 300);
  }
  setFontVariant(n) {
    if (this.fontVariant[n] === 'small-caps') {
      this.fontVariant[n] = 'normal';
    } else {
      this.fontVariant[n] = 'small-caps';
    }
    this.setButtonColor('fontVariant' + n);
    setTimeout( () => {
      if (n === 0) {
        this.checkWidthWithCenter(0);
      } else if (n === 1) {
        this.checkWidthWithCenter(1);
      } else if (n === 2 ) {
        this.checkWidthWithCenter(2);
      }
      }, 300);
  }
  setTextAlignLeft(n) {
    this.textAlign[n] = 'left';
    this.setWhiteColor('alignRight' + n);
    this.setWhiteColor('alignCenter' + n);
    this.setBlueColor('alignLeft' + n);
    if ( n === 2 ) {
      this.checkWidth(2);
    } else if ( n === 1) {
      this.checkWidth(1);
    } else if ( n === 0) {
      this.checkWidth(0);
    }
  }
  setTextAlignCenter(n) {
    this.textAlign[n] = 'center';
    this.setWhiteColor('alignRight' + n);
    this.setWhiteColor('alignLeft' + n);
    this.setBlueColor('alignCenter' + n);
    if ( n === 2 ) {
      this.checkWidth(2);
    } else if ( n === 1 ) {
      this.checkWidth(1);
    } else if ( n === 0 ) {
      this.checkWidth(0);
    }
  }
  setButtonColor(n) {
    if ( document.getElementById(n).style.background === 'white' || document.getElementById(n).style.background === '') {
      document.getElementById(n).style.background = this.MACblue;
      document.getElementById(n).style.color = 'white';
    } else {
      document.getElementById(n).style.background = 'white';
      document.getElementById(n).style.color = this.MACblue;
    }
  }
  setWhiteColor(n) {
    document.getElementById(n).style.background = 'white';
    document.getElementById(n).style.color = this.MACblue;
  }
  setBlueColor(n) {
    document.getElementById(n).style.background = this.MACblue;
    document.getElementById(n).style.color = 'white';
  }
  setAllButtonColor() {
    for (let i = 0; i < this.fontStyle.length; i++) {
      if (this.fontStyle[i] === 'normal') {
        this.setWhiteColor('fontStyle' + i);
      } else {
        this.setBlueColor('fontStyle' + i);
      }
      if (this.fontWeight[i] === 'normal') {
        this.setWhiteColor('fontWeight' + i);
      } else {
        this.setBlueColor('fontWeight' + i);
      }
      if (this.fontVariant[i] === 'normal') {
        this.setWhiteColor('fontVariant' + i);
      } else {
        this.setBlueColor('fontVariant' + i);
      }
      if (i < 4) {
        if (this.textAlign[i] === 'center') {
          this.setWhiteColor('alignLeft' + i);
          this.setWhiteColor('alignRight' + i);
          this.setBlueColor('alignCenter' + i);
        } else if (this.textAlign[i] === 'left' ) {
          this.setBlueColor('alignLeft' + i);
          this.setWhiteColor('alignRight' + i);
          this.setWhiteColor('alignCenter' + i);
        } else {
          this.setWhiteColor('alignLeft' + i);
          this.setBlueColor('alignRight' + i);
          this.setWhiteColor('alignCenter' + i);
        }
      }
    }
  }

  setTextAlignRight(n) {
    this.textAlign[n] = 'right';
    this.setWhiteColor('alignCenter' + n);
    this.setWhiteColor('alignLeft' + n);
    this.setBlueColor('alignRight' + n);
    if ( n === 2 ) {
      this.checkWidth(2);
    } else if ( n === 1) {
      this.checkWidth(1);
    } else if ( n === 0) {
      this.checkWidth(0);
    }
  }
  setImg(n, name) {
    this.add();
    const rmvBtn = document.getElementById('rmvImg') as HTMLButtonElement;
    rmvBtn.disabled = false;
    if (name === 'Animal') {
      this.userImgBase64.push(this.imagesAnimal[n]);
    } else if (name === 'Sport') {
      this.userImgBase64.push(this.imagesSport[n]);
    }
  }
  rotateBcgX() {
    this.bcgRotateX = this.bcgRotateX * -1;
  }
  rotateBcgY() {
    this.bcgRotateY = this.bcgRotateY * -1;
  }
  rotateFrmX() {
    this.frmRotateX = this.frmRotateX * -1;
  }
  rotateFrmY() {
    this.frmRotateY = this.frmRotateY * -1;
  }
  baseTemplate(n) {
    document.getElementById('spinner').style.display = 'block';
    try {
      const request = new XMLHttpRequest();
      request.open('GET', '../../assets/data/' + n + '.MACproject', false);
      request.send(null);
      const obj = JSON.parse(request.responseText);
      this.setUserData(obj);
      if ( this.currentBaseTemplate !== -1 ) {
        document.getElementById('base' + this.currentBaseTemplate ).style.transform = 'scale(0.9,0.9)';
        document.getElementById( 'base' + n ).style.transform = 'scale(1,1)';
        document.getElementById('base' + this.currentBaseTemplate).style.filter = 'grayscale(100%)';
        document.getElementById('base' + n).style.filter = 'grayscale(0%)';
      } else {
        document.getElementById( 'base' + n ).style.transform = 'scale(1,1)';
        document.getElementById('base' + n).style.filter = 'grayscale(0%)';
      }
      this.currentBaseTemplate = n;
      this.tmpBtnDisable = false;
    } catch (err) {
      this.resetSettings();
      this.openSnackBar('Nie udało się wczytać szablonu! Plik może być niekomaptybilny, uszkodzony lub przestarzały!', 'ok');
    }
    document.getElementById('spinner').style.display = 'none';
  }
  /*setCookies() {
    document.cookie = 'CookiesPrivagles=none; expires=Fri, 31 Dec 9999 23:59:59 GMT';
  }*/
  public checkWidth(n) {
    let percent;
    if ( (this.landscape === 'inline-block') ) {
      percent = 100 - ( document.getElementById(this.arrayFontNameId[n] + 'Landscape').offsetWidth /
        document.getElementById('toPdf100Landscape').offsetWidth * 100);
    } else {
      percent = 100 - ( document.getElementById(this.arrayFontNameId[n]).offsetWidth /
        document.getElementById('toPdf100').offsetWidth * 100);
    }
    let width  = ( document.getElementById(this.arrayFontNameId[n]).offsetWidth /
      document.getElementById('toPdf100').offsetWidth * 100);
    if ( (this.landscape === 'inline-block') ) {
      width  = ( document.getElementById(this.arrayFontNameId[n] + 'Landscape').offsetWidth /
        document.getElementById('toPdf100Landscape').offsetWidth * 100);
    }
    console.log('margin left ' + this.marginLeft +
      ' Width: ' + width + '   percent: ' + percent + ' stete: ' + this.marginLeft[n] +  width);
    width = Number(this.marginLeft[n]) + width;
    const widthRight = Number(this.marginRight[n]) + width;
    console.log(this.marginLeft + ' : ' + width + '   % ' + percent + 'stete: ' + width);
    if ( (width) > 100 || widthRight > 100 ) {
      this.marginLeft[n] = 0;
      this.marginRight[n] = 0;
    }
    this.percentLeft[n] = Math.round(percent - 1);
    this.percentRight[n] = Math.round(percent - 1);
  }
  checkWidthWithCenter(n) {
    let percent;
    let i = 1;
    if ( (this.landscape === 'inline-block') ) {
      percent = 100 - ( document.getElementById(this.arrayFontNameId[n] + 'Landscape').offsetWidth /
        document.getElementById('toPdf100Landscape').offsetWidth * 100);
    } else {
      percent = 100 - ( document.getElementById(this.arrayFontNameId[n]).offsetWidth /
        document.getElementById('toPdf100').offsetWidth * 100);
    }
    this.percentLeft[n] = Math.round(percent - 1);
    this.percentRight[n] = Math.round(percent - 1);
    let width  = ( document.getElementById(this.arrayFontNameId[n]).offsetWidth /
      document.getElementById('toPdf100').offsetWidth * 100);
    if ( (this.landscape === 'inline-block') ) {
      width  = ( document.getElementById(this.arrayFontNameId[n] + 'Landscape').offsetWidth /
        document.getElementById('toPdf100Landscape').offsetWidth * 100);
    }
    console.log(this.marginLeft + ' : ' + width + '   % ' + percent + 'stete: ' + this.marginLeft[n] +  width);
    width = Number(this.marginLeft[n]) + width;
    const widthRight = Number(this.marginRight[n]) + width;
    console.log(this.marginLeft + ' : ' + width + '   % ' + percent + 'stete: ' + width);
    if ( (width) > 98 || widthRight > 98 ) {
      this.marginLeft[n] = 0;
      this.marginRight[n] = 0;
      i = 0;
    }
    percent = 100 - ( document.getElementById(this.arrayFontNameId[n]).offsetHeight /
      document.getElementById('toPdf100').offsetHeight * 100);
    if ( (this.landscape === 'inline-block') ) {
      percent = 100 - ( document.getElementById(this.arrayFontNameId[n] + 'Landscape').offsetHeight /
        document.getElementById('toPdf100Landscape').offsetHeight * 100);
    }
    this.percentHeight[n] = Math.round(percent - 1);
    this.percentHeight[n] = Math.round(percent - 1);
    return i;
  }
  setHeightPercent(n) {
    let percent = 100 - ( document.getElementById(this.arrayFontNameId[n]).offsetHeight /
      document.getElementById('toPdf100').offsetHeight * 100);
    if ( (this.landscape === 'inline-block') ) {
      percent = 100 - ( document.getElementById(this.arrayFontNameId[n] + 'Landscape').offsetHeight /
        document.getElementById('toPdf100Landscape').offsetHeight * 100);
    }
    this.percentHeight[n] = Math.round(percent - 1);
    this.percentHeight[n] = Math.round(percent - 1);
  }
  setMaxWidthForUserTxt() {
    let percent = 100 - ( document.getElementById('font1' + this.currentTxt).offsetWidth /
      document.getElementById('toPdf100').offsetWidth * 100);
    if ( (this.landscape === 'inline-block') ) {
      percent = 100 - ( document.getElementById('font2' + this.currentTxt).offsetWidth /
        document.getElementById('toPdf100Landscape').offsetWidth * 100);
    }
    let percentTop = 100 - ( document.getElementById('font1' + this.currentTxt).offsetHeight /
      document.getElementById('toPdf100').offsetHeight * 100);
    if ( (this.landscape === 'inline-block') ) {
      percentTop = 100 - ( document.getElementById('font2' + this.currentTxt).offsetHeight /
        document.getElementById('toPdf100Landscape').offsetHeight * 100);
    }
    console.log(document.getElementById('font1' + this.currentTxt).offsetWidth + ' : ' +  document.getElementById('toPdf100').offsetWidth);
    this.maxWidthUserTxtFieldTop = Math.round(percentTop - 1);
    this.maxWidthUserTxtFieldRight = Math.round(percent - 1);
    console.log('margines' + this.maxWidthUserTxtFieldTop );
    console.log('txtR: ' +  this.txtLeft[this.currentTxt] + ' max: ' +  this.maxWidthUserTxtFieldRight);
    if ( this.txtLeft[this.currentTxt] > this.maxWidthUserTxtFieldRight) {
      console.log('txtR: ' +  this.txtLeft[this.currentTxt] + ' max: ' +  this.maxWidthUserTxtFieldRight);
      this.txtLeft[this.currentTxt] = 0;
    }
    return Math.round(percent - 1);
  }
  setUserImgFrame(n) {
    for (let i = 0; i <  this.imgTop.length; i ++ ) {
      if (i === n) {
        document.getElementById('imgToChange4' + i).style.border = '2px solid red';
        document.getElementById('imgToChange2' + i).style.border = '2px solid red';
      } else {
        document.getElementById('imgToChange4' + i).style.border = 'none';
        document.getElementById('imgToChange2' + i).style.border = 'none';
      }
    }
  }
  test() {
    return 0;
  }
}
