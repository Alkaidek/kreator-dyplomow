import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {AngularFireDatabase} from 'angularfire2/database';
import {MatSnackBar} from '@angular/material';
import * as fileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import {DataService} from '../data.service';
import { templateCoordinates } from '../template.js';
import { templateComponentStrings } from '../allText.js';

@Component({
  selector: 'app-template-type',
  templateUrl: './template-type.component.html',
  styleUrls: ['./template-type.component.sass']
})
export class TemplateTypeComponent implements OnInit {
  arraySelectFontFamili = [ 'Abril Fatface', 'Aladin', 'Allura', 'Anton', 'Dancing Script', 'Lato',
    'Merriweather', 'Montserrat', 'Open Sans', 'Oswald', 'Ranga', 'Roboto', 'Rubik', 'Ubuntu', 'Varela Round'
  ];
  userImg =
    [];
  templateComponentStrings = templateComponentStrings;
  percentLeft = [100, 100, 100];
  percentRight = [100, 100, 100];
  percentHeight = [80, 80, 80];
  userImgBase64 = [];
  userTxt = [];
  imgMAClogoFrame = '../../assets/img/MAClogoFrame.jpg';
  currImg = -1;
  bcgDisplay = ['block', 'block', 'block', 'block'];
  template: any;
  bool = 'block';
  imagesAnimal = ['../../assets/img/animal/1.png',
    '../../assets/img/animal/2.png',
    '../../assets/img/animal/3.png',
    '../../assets/img/animal/4.png'];
  imagesEmocje = [];
  imagesGeografia = [];
  imagesLiteratura = [];
  imagesMatematyka = [];
  imagesMuzyka = [];
  imagesPolska = [];
  imagesRosliny = [];
  imagesSport = [];
  imagesSwieta = [];
  imagesSzachy = [];
  imagesZwierzeta = [];
  emocjeHeight = 11;
  geografiaHeight = 11;
  literaturaHeight = 11;
  matematykaHeight = 11;
  muzykaHeight = 11;
  polskaHeight = 11;
  roslinyHeight = 11;
  sportHeight = 11;
  swietaHeight = 11;
  szachyHeight = 11;
  zwierzetaHeight = 11;
  textFieldArray = ['', '', '', '', ''];
  footer = '';
  onLoadBool = false;
  constructor(private db: AngularFireDatabase, public snackBar: MatSnackBar, private _dataService: DataService) {
    this.setDate();
    for ( let i = 1; i < 50; i++ ) {
      this.imagesMatematyka.push('../../assets/img/matematyka/' + i);
    }
    this.matematykaHeight = this.setHeightElement(this.imagesMatematyka);
    for ( let i = 1; i < 55; i++ ) {
      this.imagesMuzyka.push('../../assets/img/muzyka/' + i );
    }
    this.muzykaHeight = this.setHeightElement(this.imagesMuzyka);
    for ( let i = 1; i < 13; i++ ) {
      this.imagesPolska.push('../../assets/img/polska/' + i );
    }
    this.polskaHeight = this.setHeightElement(this.imagesPolska);
    for ( let i = 1; i < 42; i++ ) {
      this.imagesSport.push('../../assets/img/sport/' + i );
    }
    this.sportHeight = this.setHeightElement(this.imagesSport);
    for ( let i = 1; i < 51; i++ ) {
      this.imagesSwieta.push('../../assets/img/swieta/' + i);
    }
    this.swietaHeight = this.setHeightElement(this.imagesSwieta);
    for ( let i = 1; i < 19; i++ ) {
      this.imagesSzachy.push('../../assets/img/szachy/' + i);
    }
    this.szachyHeight = this.setHeightElement(this.imagesSzachy);
    for ( let i = 1; i < 80; i++ ) {
      this.imagesZwierzeta.push('../../assets/img/zwierzeta/' + i);
    }
    this.zwierzetaHeight = this.setHeightElement(this.imagesZwierzeta);
    for ( let i = 1; i < 34; i++ ) {
      this.imagesRosliny.push('../../assets/img/rosliny/' + i);
    }
    this.roslinyHeight = this.setHeightElement(this.imagesRosliny);

    for ( let i = 1; i < 44; i++ ) {
      this.imagesEmocje.push('../../assets/img/emocje/' + i);
    }
    this.emocjeHeight = this.setHeightElement(this.imagesEmocje);
    for ( let i = 1; i < 40; i++ ) {
      this.imagesGeografia.push('../../assets/img/geografia/' + i );
    }
    this.geografiaHeight = this.setHeightElement(this.imagesGeografia);
    for ( let i = 1; i < 39; i++ ) {
      this.imagesLiteratura.push('../../assets/img/literatura/' + i);
    }
    this.literaturaHeight = this.setHeightElement(this.imagesLiteratura);
  }
  MACblue = '#25408f';
  whiteColor = 'white';
  maxWidthUserTxtFieldTop = 80;
  maxWidthUserTxtFieldRight = 30;
  maxWidthTxtFieldTop = 80;
  maxWidthTxtFieldRight = 80;
  currentBaseTemplate = -1;
  bcgBtnDisable = true;
  frmBtnDisable = true;
  tmpBtnDisable = true;
  boolDisableUserImgFields = true;
  hidebox = true;
  actualTxt = '';
  landscape = 'inline-block';
  currentStep = 0;
  bcgColor = '#ffffff';
  base64Tmp = '';
  base64 = '';
  forWho = '';
  forWhat = '';
  sign1 = '';
  sign2 = '';
  sign3 = '';
  title = '';
  imgSrcFix = '../../assets/img/0.png';
  imgSrcFrame = '../../assets/img/0.png';
  paddingTop = 10;
  marginLeft = [1, 0, 0, 0];
  marginRight = [0, 0, 0, 0];
  paddingTopFooter = 12;
  bottom = 0;
  multiple = 4.5;
  arrayFontSize = [3, 0.9, 2, 0.8, 2];
  arrayFontNameId = ['largeTxt', 'sFor', 'txtForWhat', 'smallTxt', 'left', 'right', 'center'];
  arrayFontFamili = ['Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans'];
  arrayFontColor = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
  rotate = [];
  imgWidth = [];
  imgHeight = [];
  imgTop = [];
  imgLeft = [];
  scheme = 0;
  txtTop = [35];
  txtLeft = [0];
  txtRight = [0];
  txtSize = [3];
  txtStyle = ['normal'];
  txtWeight = ['normal'];
  txtVariant  = ['normal'];
  txtAlign = ['center'];
  txt = [];
  txtShadow = [0];
  txtShadowColor = ['#8c8e91'];
  currentTxt = 0;
  txtFieldColor = ['#000000', '#000000', '#000000', '#000000', '#000000'];
  txtFieldFontFamili = ['Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans'];
  txtFieldTop = [35, 35, 35, 35, 35];
  txtFieldLeft = [0, 0, 0, 0, 0];
  txtFieldRight = [0, 0, 0, 0, 0];
  txtFieldSize = [3, 3, 3, 3, 3];
  txtFieldStyle = ['normal', 'normal', 'normal', 'normal', 'normal'];
  txtFieldWeight = ['normal', 'normal', 'normal', 'normal', 'normal'];
  txtFieldVariant  = ['normal', 'normal', 'normal', 'normal', 'normal'];
  txtFieldAlign = ['center', 'center', 'center', 'center', 'center'];
  txtFieldShadow = [0, 0, 0, 0, 0];
  txtFieldShadowColor = ['#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91'];
  txtField = ['', '', '', '', ''];
  shadowLarge = ['0px 0px', '0px 0px', '0px 0px'];
  shadowSmall = '0% 0%';
  txtColor = [];
  txtColorText = '';
  txtFontFamili = [];
  bcgRotateX = 1;
  bcgRotateY = 1;
  frmRotateX = 1;
  frmRotateY = 1;
  txtFontFamiliText = '';
  currentFontFamili = 0;
  letterSpacingForWho = 0;
  btnDirectLeftDisabled = true;
  btnDirectRightDisabled = false;
  checkboxSizeAttach = true;
  checkboxSizeAttachValue = 0;
  imageFrameWidth = 100;
  imageFrameWidthLandscape = 100;
  imageFrameWidthFix = 100;
  imageFrameWidthLandscapeFix = 100;
  scroll = (): void => {
    const imgMAClogo = document.getElementById('MAClogo') as HTMLImageElement;
    if ( window.scrollY > 50 ) {
      imgMAClogo.style.width = '6.875vh';
      imgMAClogo.style.height = '5vh';
      document.getElementById('logoBox').style.height = '5vh';
      const stepper = document.querySelector('.mat-horizontal-stepper-header-container') as HTMLElement;
      stepper.style.top = '5vh' ;
      const buttonStepper = document.getElementsByClassName('directButtonContainter');
      document.getElementById('directBcg').style.top = '5vh';
      for ( let i = 0; i < buttonStepper.length; i++) {
        const element = buttonStepper[i] as HTMLElement;
        element.style.top = '7vh' ;
      }
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
      document.getElementById('directBcg').style.top = '8vh';
      const stepper = document.querySelector('.mat-horizontal-stepper-header-container') as HTMLElement;
      stepper.style.top = '8vh' ;
      const buttonStepper = document.getElementsByClassName('directButtonContainter');
      for ( let i = 0; i < buttonStepper.length; i++) {
        const element = buttonStepper[i] as HTMLElement;
        element.style.top = '10vh' ;
      }
      const elements = document.getElementsByClassName('logoText') as any;
      for ( let i = 0; i < elements.length; i++ ) {
        elements[i].style.marginTop = '10px';
      }
    }
  }
  ngOnInit() {
    this.setOnInitData();
    this.addScrollListener();
  }
  setDate() {
    const date = new Date();
    let day = '' + date.getDate();
    const month = date.getMonth() + 1;
    let monthStr = '';
    if ( date.getDate() < 10) {
      day = '0' + day;
    }
    if ( (date.getMonth() + 1 )  < 10) {
      monthStr = '0' + month;
    }
    this.footer = this.footer + day + '.' + monthStr + '.' + date.getFullYear() + ' r.';
  }
  addScrollListener() {
    window.addEventListener('scroll', this.scroll, true);
  }
  setOnInitData() {
    setTimeout( () => {
      this.scheme = 30;
      this.landscapeOff(2);
      const width = document.getElementById('toPdf100').offsetWidth;
      console.log(': ' + ( 794 / width) );
      this.multiple = (794 / width );
      this.imageFrameWidth = document.getElementById('pdfFor').offsetWidth * 0.14;
      this.imageFrameWidthLandscape = document.getElementById('pdfForlandscape').offsetWidth * 0.1;
      this.imageFrameWidthFix = document.getElementById('pdfForFix').offsetWidth * 0.14;
      this.imageFrameWidthLandscapeFix = document.getElementById('pdfForLandscapeFix').offsetWidth * 0.1;
    }, 150);
    return this.multiple;
  }
  setTextFiledArray(n) {
    this.textFieldArray = [];
    let index;
    for ( let i = 0; i < n; i++) {
      index = i + 1;
      this.textFieldArray.push('Pole ' + index);
    }
  }
  setTextFiledText(n) {
    this.txtField = [];
    let index;
    for ( let i = 0; i < n; i++) {
      index = i + 1;
      this.txtField.push('Pole ' + index);
      setTimeout(  () => {
        this.setMaxWidthForTxtField(i);
      }, 100);
    }
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
        pdf.autoPrint();
        window.open(pdf.output('bloburl'), '_blank');
        pdf.save(this.getCurrentDate() + '.pdf');
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
        pdf.autoPrint();
        window.open(pdf.output('bloburl'), '_blank');
        pdf.save(this.getCurrentDate() + '.pdf');
        document.getElementById('spinner').style.display = 'none';
      });
    }
  }
  createArrayToSend() {
    const msg =  this.getCurrentDate();
    this.openSnackBar( templateComponentStrings.a66 + msg,  'ok' );
    this.saveData( msg );
  }
  setHeightElement(array) {
    let divide = array.length / 5;
    let varibleHeight;
    if ( divide > Math.round(divide)) {
      divide = divide + 0.5;
    }
    varibleHeight = Math.round(divide) * 10 + Math.round(divide);
    if ( window.screen.width < 1300) {
      varibleHeight = varibleHeight + 7;
    } else if ( window.screen.width < 1600 && window.screen.width > 1300 ) {
      varibleHeight = varibleHeight;
    }
    return varibleHeight;
  }
  setUserData(template) {
    try {
      this.resetSettings();
      /*const select = document.getElementById('selectTemplate') as HTMLSelectElement;*/
      this.landscape = template.landscape;
      if (this.landscape === 'none') {
        this.landscapeOff(2);
      } else {
        this.landscapeOff(1);
      }
      if ( template.img === '' || template.img === '../../assets/img/0.png') {
        this.imgSrcFix =  '../../assets/img/0.png';
      } else {
        this.imgSrcFix = template.img;
      }
      this.base64Tmp = template.img;
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
        setTimeout(() => {
          this.setUserImgFrame(this.currImg);
        }, 500 );
      }
      try {
        if ( template.txtTop.length > 0) {
          for ( let i = 0; i < template.txtTop.length; i++) {
            this.addTxtWithCustomValue(template.txtUser[i], template.txtTop[i],
              template.txtLeft[i], template.txtRight[i], template.txtSize[i], template.txtColor[i], template.txtFontFamili[i],
              template.txtStyle[i], template.txtWeight[i], template.txtVariant[i], template.txtAlign[i],
              template.txtShadow[i],  template.txtShadowColor[i]);
          }
        }
      } catch (e) {
        console.log('Old UserTxt Element');
      }
      try {
        this.txtFieldColor = template.txtFieldColor;
        this.txtFieldFontFamili = template.txtFieldFontFamili;
        this.txtFieldTop = template.txtFieldTop;
        this.txtFieldLeft = template.txtFieldLeft;
        this.txtFieldRight = template.txtFieldRight;
        this.txtFieldSize = template.txtFieldSize;
        this.txtFieldStyle = template.txtFieldStyle;
        this.txtFieldWeight = template.txtFieldWeight;
        this.txtFieldVariant  = template.txtFieldVariant;
        this.txtFieldAlign = template.txtFieldAlign;
        this.txtFieldShadow = template.txtFieldShadow;
        this.txtFieldShadowColor = template.txtFieldShadowColor;
        this.txtField = template.txtField;
        this.setTextFiledArray(template.txtField.length);
        this.setAllButtonColor();
      } catch (e) {
        console.log('Something goes wrong');
      }
    } catch (err) {
      this.resetSettings();
      this.openSnackBar(templateComponentStrings.a67, 'ok');
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
    this.setTextFiledArray(0);
    this.setTextFiledText(0);
    this.textFieldArray = ['', '', '', '', ''];
    this.onLoadBool = false;
    this.txtAlign = [];
    this.tmpBtnDisable = true;
    this.bcgBtnDisable = true;
    this.frmBtnDisable = true;
    this.boolDisableUserImgFields = true;
    this.hidebox = true;
    this.landscape = '';
    this.landscape = 'none';
    this.imgSrcFix =  '../../assets/img/0.png';
    this.base64Tmp = '';
    this.userImg = [];
    this.rotate = [];
    this.imgWidth = [];
    this.imgHeight = [];
    this.imgTop = [];
    this.imgLeft = [];
    this.userImgBase64 = [];
    this.currImg = -1;
    this.txtTop = [35];
    this.txtLeft = [0];
    this.txtRight = [0];
    this.txtSize = [3];
    this.txtStyle = ['normal'];
    this.txtWeight = ['normal'];
    this.txtVariant  = ['normal'];
    this.txtAlign = ['center'];
    this.txtShadow = [0];
    this.txtShadowColor = ['#8c8e91'];
    this.currentTxt = 0;
    this.userTxt = [''];
    this.txtFontFamili = ['Open Sans'];
    this.txtFontFamiliText = '';
    this.imgSrcFrame = '../../assets/img/0.png';
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
      const width = document.getElementById('toPdf100').offsetWidth;
      console.log(': ' + ( 794 / width) );
      this.multiple = (794 / width );
      this.resetSettings();
    } else {
      this.resetSettings();
      this.landscape = 'inline-block';
      setTimeout( () => {
        const width = document.getElementById('toPdf100Landscape').offsetHeight;
        console.log(': ' + ( 794 / width) );
        this.multiple = (794 / width );
      }, 100);
      const element = document.getElementById('toPdf100Landscape');
      element.classList.remove('rotateInDownRight');
    }
  }
  add() {
    this.openSnackBar(templateComponentStrings.a66, 'ok');
    this.boolDisableUserImgFields = false;
    this.userImg.push(this.userImg.length);
    this.rotate.push(0);
    this.imgTop.push(0);
    this.imgLeft.push(0);
    this.currImg = this.userImg.length - 1;
    this.imgHeight.push(10);
    this.imgWidth.push(10);
    setTimeout(() => {
      this.setUserImgFrame(this.currImg);
      const img = document.getElementById('imgToChange2' + this.currImg) as HTMLImageElement;
      let prop =  img.naturalWidth;
      prop = prop / img.naturalHeight;
      let multipleHeight;
      let multipleWidth;
      if ( (this.landscape === 'inline-block') ) {
        multipleHeight = document.getElementById('pdfForlandscape').offsetHeight;
        multipleWidth = document.getElementById('pdfForlandscape').offsetWidth;
      } else {
        multipleHeight = document.getElementById('pdfFor').offsetHeight;
        multipleWidth = document.getElementById('pdfFor').offsetWidth;
      }
      const propPdfFor = multipleWidth / multipleHeight;
      this.imgWidth[this.currImg] = 10 * (prop / propPdfFor);
    }, 200 );
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
  getCurrentDate() {
    const date = new Date();
    let day = '' + date
      .getDate();
    const month = date
      .getMonth() + 1;
    let monthStr = '' + month;
    let hours = '' + date
      .getHours();
    let min = '' + date
      .getMinutes();
    if ( date.getDate() < 10) {
      day = '0' + day;
    }
    if ( (date.getMonth() + 1 )  < 10) {
      monthStr = '0' + month;
    }
    if ( (date.getHours() )  < 10) {
      hours = '0' + hours;
    }
    if ( (date.getMinutes() )  < 10) {
      min = '0' + min;
    }
    const msg =  '' + date.getFullYear() + '.' + monthStr + '.' + day + '_' + hours + ':' + min;
    return msg;
  }
  saveData(date) {
    const blob = new Blob( [this.createFileToSave()], {type: 'text/json'});
    const result = fileSaver.saveAs(blob, 'template' + date + '.MACtemplate');
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
      + '"img" : "'
      +  this.imgSrcFix + '", '
      + '"landscape" : "'
      + this.landscape + '", '
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
      + this.createTextToJSON(this.userTxt).replace(/(\r\n\t|\n|\r\t)/gm, 'NEWLINE' ) + '],'
      + '"txtColor" : [ '
      + this.createTextToJSON(this.txtColor) + '],'
      + '"txtFontFamili" : [ '
      + this.createTextToJSON(this.txtFontFamili) + '],'
      + '"txtShadow" : [ '
      + this.createTextToJSON(this.txtShadow) + '],'
      + '"txtShadowColor" : [ '
      + this.createTextToJSON(this.txtShadowColor) + '],'

      + '"txtFieldTop" : [ '
      + this.createTextToJSON(this.txtFieldTop) + '],'
      + '"txtFieldLeft" : [ '
      + this.createTextToJSON(this.txtFieldLeft) + '],'
      + '"txtFieldRight" : [ '
      + this.createTextToJSON(this.txtFieldRight) + '],'
      + '"txtFieldSize" : [ '
      + this.createTextToJSON(this.txtFieldSize) + '],'
      + '"txtFieldStyle" : [ '
      + this.createTextToJSON(this.txtFieldStyle) + '],'
      + '"txtFieldWeight" : [ '
      + this.createTextToJSON(this.txtFieldWeight) + '],'
      + '"txtFieldVariant" : [ '
      + this.createTextToJSON(this.txtFieldVariant) + '],'
      + '"txtFieldAlign" : [ '
      + this.createTextToJSON(this.txtFieldAlign) + '],'
      + '"txtField" : [ '
      + this.createTextToJSON(this.txtField) + '],'
      + '"txtFieldColor" : [ '
      + this.createTextToJSON(this.txtFieldColor) + '],'
      + '"txtFieldFontFamili" : [ '
      + this.createTextToJSON(this.txtFieldFontFamili) + '],'
      + '"txtFieldShadow" : [ '
      + this.createTextToJSON(this.txtFieldShadow) + '],'
      + '"txtFieldShadowColor" : [ '
      + this.createTextToJSON(this.txtFieldShadowColor) + ']'
      + ' }';
    return txt;
  }
  onSelectFile(event) {
    try {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      let txt: any;
      document.getElementById('spinner').style.display = 'block';
      reader.onload = ()  => {
        setTimeout( () => {
          txt = reader.result;
          this.jsonToArray(txt);
        }, 30);
      };
    } catch (err) {
      this.resetSettings();
      this.openSnackBar(templateComponentStrings.a69, 'ok');
    }
  }
  fileUpload(event: any) {
    if (event.target.files[0].size / 1024 < 2049 && event.target.files) {
      const rmvBtn = document.getElementById('rmvImg') as HTMLButtonElement;
      rmvBtn.disabled = false;
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader() as any;
        reader.onload = (event2: any) => {
          this.add();
          this.userImgBase64.push(event2.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      this.openSnackBar(templateComponentStrings.a70, 'ok');
    }
  }
  jsonToArray(txt) {
    try {
      const obj = JSON.parse(txt);
      this.setUserData(obj);
    } catch (err) {
      this.resetSettings();
      this.openSnackBar(templateComponentStrings.a69, 'ok');
    }
    document.getElementById('spinner').style.display = 'none';
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
    this.txtFontFamili.push('Open Sans');
    this.txtStyle.push('normal');
    this.txtWeight.push('normal');
    this.txtVariant.push('normal');
    this.setWhiteColor('fontStyle5');
    this.setWhiteColor('fontVariant5');
    this.setWhiteColor('fontWeight5');
    this.txtAlign.push('left');
    this.txtShadow.push(0);
    this.txtShadowColor.push('#8c8e91');
    this.setTxtAlignWithoutPossitionChange(this.txtAlign[this.currentTxt]);
  }
  shadowOnOffForUserTextField(): Number {
    if ( this.txtShadow[this.currentTxt] > 0) {
      this.txtShadow[this.currentTxt] = 0;
    } else {
      this.txtShadow[this.currentTxt] = 4;
    }
    return this.txtShadow[this.currentTxt];
  }
  shadowOnOffForTextField(i): Number {
    if ( this.txtFieldShadow[i] > 0) {
      this.txtFieldShadow[i] = 0;
    } else {
      this.txtFieldShadow[i] = 4;
    }
    return this.txtFieldShadow[i];
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
  addTxtWithCustomValue(actualTxt, top, left, right, size, color, fontfamili, style, weight, variant, align, shadow, shadowColor) {
    if ( this.currentTxt === -1 ) {
      this.hidebox = false;
    }
    this.actualTxt = actualTxt.split('NEWLINE').join('\n');
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
    this.txtShadow.push(shadow);
    this.txtShadowColor.push(shadowColor);
    this.setTxtAlignWithoutPossitionChange(this.txtAlign[this.currentTxt]);
  }
  setFontFamili(n) {
    this.txtFontFamili[this.currentTxt] = this.arraySelectFontFamili[n];
  }
  setFontFamiliForTxtField(n, i) {
    this.txtFieldFontFamili[i] = this.arraySelectFontFamili[n];
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
  setTxtFieldStyle(n) {
    if (this.txtFieldStyle[n] === 'italic') {
      this.txtFieldStyle[n] = 'normal';
    } else {
      this.txtFieldStyle[n] = 'italic';
    }
    this.setButtonColor('fontStyle6' + n);
    this.setMaxWidthForTxtField(n);
  }
  setTxtFieldWeight(n) {
    if (this.txtFieldWeight[n] === 'bold') {
      this.txtFieldWeight[n] = 'normal';
    } else {
      this.txtFieldWeight[n] = 'bold';
    }
    this.setButtonColor('fontWeight6' + n);
    this.setMaxWidthForTxtField(n);
  }
  setTxtFieldVariant(n) {
    if (this.txtFieldVariant[n] === 'small-caps') {
      this.txtFieldVariant[n] = 'normal';
    } else {
      this.txtFieldVariant[n] = 'small-caps';
    }
    this.setButtonColor('fontVariant6' + n);
    this.setMaxWidthForTxtField(n);
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
      /*    this.txtLeft[this.currentTxt] = 0;*/
      this.setWhiteColor('alignCenter5');
      this.setBlueColor('alignLeft5');
      this.setWhiteColor('alignRight5');
      this.txtLeft[this.currentTxt] = 0;
      this.txtRight[this.currentTxt] = 0;
      console.log(this.txtAlign[this.currentTxt]);
    } else if (value === 'right') {
      this.txtAlign[this.currentTxt] = 'right';
      /* this.txtLeft[this.currentTxt] = this.setMaxWidthForUserTxt();*/
      this.setWhiteColor('alignCenter5');
      this.setWhiteColor('alignLeft5');
      this.setBlueColor('alignRight5');
      this.txtLeft[this.currentTxt] = 0;
      this.txtRight[this.currentTxt] = 0;
      console.log(this.txtAlign[this.currentTxt]);
    } else {
      this.txtAlign[this.currentTxt] = 'center';
      /*      this.txtLeft[this.currentTxt] = this.setMaxWidthForUserTxt() / 2;*/
      this.setBlueColor('alignCenter5');
      this.setWhiteColor('alignLeft5');
      this.setWhiteColor('alignRight5');
      this.txtLeft[this.currentTxt] = 0;
      this.txtRight[this.currentTxt] = 0;
      console.log(this.txtAlign[this.currentTxt]);
    }
  }
  setTxtFieldAlign(value, i) {
    if (value === 'left') {
      this.txtFieldAlign[i] = 'left';
      /*    this.txtLeft[this.currentTxt] = 0;*/
      this.setWhiteColor('alignCenter6' + i);
      this.setBlueColor('alignLeft6' + i);
      this.setWhiteColor('alignRight6' + i);
      this.txtFieldLeft[i] = 0;
      this.txtFieldRight[i] = 0;
      console.log(this.txtFieldAlign[i]);
    } else if (value === 'right') {
      this.txtFieldAlign[i] = 'right';
      this.setWhiteColor('alignCenter6' + i);
      this.setWhiteColor('alignLeft6' + i);
      this.setBlueColor('alignRight6' + i);
      this.txtFieldLeft[i] = 0;
      this.txtFieldRight[i] = 0;
      console.log(this.txtFieldAlign[i]);
    } else {
      this.txtFieldAlign[i] = 'center';
      /*      this.txtLeft[this.currentTxt] = this.setMaxWidthForUserTxt() / 2;*/
      this.setBlueColor('alignCenter6' + i);
      this.setWhiteColor('alignLeft6' + i);
      this.setWhiteColor('alignRight6' + i);
      this.txtFieldLeft[i] = 0;
      this.txtFieldRight[i] = 0;
      console.log(this.txtFieldAlign[i]);
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
    for (let i = 0; i < this.txtField.length; i++) {
      if (this.txtFieldStyle[i] === 'normal') {
        this.setWhiteColor('fontStyle6' + i);
      } else {
        this.setBlueColor('fontStyle6' + i);
      }
      if (this.txtFieldWeight[i] === 'normal') {
        this.setWhiteColor('fontWeight6' + i);
      } else {
        this.setBlueColor('fontWeight6' + i);
      }
      if (this.txtFieldVariant[i] === 'normal') {
        this.setWhiteColor('fontVariant6' + i);
      } else {
        this.setBlueColor('fontVariant6' + i);
      }
      if (i < 4) {
        if (this.txtFieldAlign[i] === 'center') {
          this.setWhiteColor('alignLeft6' + i);
          this.setWhiteColor('alignRight6' + i);
          this.setBlueColor('alignCenter6' + i);
        } else if (this.txtFieldAlign[i] === 'left' ) {
          this.setBlueColor('alignLeft6' + i);
          this.setWhiteColor('alignRight6' + i);
          this.setWhiteColor('alignCenter6' + i);
        } else {
          this.setWhiteColor('alignLeft6' + i);
          this.setBlueColor('alignRight6' + i);
          this.setWhiteColor('alignCenter6' + i);
        }
      }
    }
  }
  setProportion() {
    const img = document.getElementById('imgToChange2' + this.currImg) as HTMLImageElement;
    let prop =  img.naturalWidth;
    prop = prop / img.naturalHeight;
    let multipleHeight;
    let multipleWidth;
    if ( (this.landscape === 'inline-block') ) {
      multipleHeight = document.getElementById('pdfForlandscape').offsetHeight;
      multipleWidth = document.getElementById('pdfForlandscape').offsetWidth;
    } else {
      multipleHeight = document.getElementById('pdfFor').offsetHeight;
      multipleWidth = document.getElementById('pdfFor').offsetWidth;
    }
    const propPdfFor = multipleWidth / multipleHeight;
    this.imgWidth[this.currImg] = 10 * (prop / propPdfFor);
  }
  setImg(n, name) {
    this.onLoadBool = true;
    const rmvBtn = document.getElementById('rmvImg') as HTMLButtonElement;
    console.log('name: ' + name);
    rmvBtn.disabled = false;
    if (name === 'Animal') {
      this.userImgBase64.push(this.imagesAnimal[n]);
    } else if (name === 'Sport') {
      /*this.userImgBase64.push(this.imagesSport[n] + '.png');
      this.add();*/
      this._dataService.getSport2Img(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
    } else if (name === 'Emocje') {
      /*this.userImgBase64.push(this.imagesEmocje[n] + '.png');
      this.add();*/
      this._dataService.getSportImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
    } else if (name === 'Geografia') {
      /*  this.userImgBase64.push(this.imagesGeografia[n] + '.png');*/
      this._dataService.getGeografiaImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      /*this.add();*/
    } else if (name === 'Literatura') {
      /*this.userImgBase64.push(this.imagesLiteratura[n] + '.png');*/
      this._dataService.getLiteraturaImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      /*this.add();*/
    } else if (name === 'Matematyka') {
      /*this.userImgBase64.push(this.imagesMatematyka[n]);*/
      /*this.userImgBase64.push(this.imagesMatematyka[n] + '.png');*/
      this._dataService.getMatematykaImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      /*this.add();*/
    } else if (name === 'Muzyka') {
      /*     this.userImgBase64.push(this.imagesMuzyka[n] + '.png');*/
      this._dataService.getMuzykaImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      /* this.add();*/
    } else if (name === 'Rosliny') {
      /* this.userImgBase64.push(this.imagesRosliny[n] + '.png');*/
      this._dataService.getRoslinyImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      /*this.add();*/
    } else if (name === 'Polska') {
      /*this.userImgBase64.push(this.imagesPolska[n] + '.png');*/
      this._dataService.getPolskaImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      /*this.add();*/
    } else if (name === 'Swieta') {
      /*      this.userImgBase64.push(this.imagesSwieta[n] + '.png');*/
      this._dataService.getSwietaImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      /*this.add();*/
    } else if (name === 'Szachy') {
      /*this.userImgBase64.push(this.imagesSzachy[n] + '.png');*/
      this._dataService.getSzachyImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      /*this.add();*/
    } else if (name === 'Zwierzeta') {
      /*this.userImgBase64.push(this.imagesZwierzeta[n] + '.png');*/
      this._dataService.getZwierzetaImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      /*this.add();*/
    } else if (name === 'Literatura') {
      /*this.userImgBase64.push(this.imagesLiteratura[n] + '.png');*/
      this._dataService.getLiteraturaImg(n)
        .subscribe(sport => {
          this.userImgBase64.push(sport);
          this.add();
        });
      // this.add();
    }
  }
  resetTxtField() {
    this.textFieldArray = ['Pole 1', 'Pole 2', 'Pole 3', 'Pole 4', 'Pole 5'];
    this.txtFieldColor = ['#000000', '#000000', '#000000', '#000000', '#000000'];
    this.txtFieldFontFamili = ['Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans'];
    this.txtFieldTop = [35, 35, 35, 35, 35];
    this.txtFieldLeft = [0, 0, 0, 0, 0];
    this.txtFieldRight = [0, 0, 0, 0, 0];
    this.txtFieldSize = [3, 3, 3, 3, 3];
    this.txtFieldStyle = ['normal', 'normal', 'normal', 'normal', 'normal'];
    this.txtFieldWeight = ['normal', 'normal', 'normal', 'normal', 'normal'];
    this.txtFieldVariant  = ['normal', 'normal', 'normal', 'normal', 'normal'];
    this.txtFieldAlign = ['center', 'center', 'center', 'center', 'center'];
    this.txtFieldShadow = [0, 0, 0, 0, 0];
    this.txtFieldShadowColor = ['#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91'];
    this.txtField = ['', '', '', '', ''];
  }
  baseTemplate(n, landscape, field) {
    this.landscapeOff(landscape);
    this.resetTxtField();
    this.setTextFiledArray(field);
    this.setTextFiledText(field);
    document.getElementById('spinner').style.display = 'block';
    try {
      this.txtFieldTop = templateCoordinates[n - 1][0];
      this.txtFieldRight = templateCoordinates[n - 1][2];
      this.txtFieldLeft = templateCoordinates[n - 1][1];
      this.txtFieldSize = templateCoordinates[n - 1][3];
      this.imgSrcFix = '../../assets/baseData/' + n + '.png';
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
      this.openSnackBar(templateComponentStrings.a69, 'ok');
    }
    document.getElementById('spinner').style.display = 'none';
  }
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
    console.log('margin l: ' + this.marginLeft +
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
    console.log('font1' + this.currentTxt);
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
    this.maxWidthUserTxtFieldRight = Math.round(percent  - 5);
    console.log('margines' + this.maxWidthUserTxtFieldTop );
    console.log('' + this.currentTxt );
    console.log('txtR: ' +  this.txtLeft[this.currentTxt] + ' max: ' +  this.maxWidthUserTxtFieldRight);
    if ( this.txtLeft[this.currentTxt] > this.maxWidthUserTxtFieldRight) {
      console.log('txtR: ' +  this.txtLeft[this.currentTxt] + ' max: ' +  this.maxWidthUserTxtFieldRight);
      this.txtLeft[this.currentTxt] = 0;
    }
    return Math.round(percent - 1);
  }
  setMaxWidthForTxtField(n) {
    let percent = 100 - ( document.getElementById('fontField1' + n).offsetWidth /
      document.getElementById('toPdf100').offsetWidth * 100);
    if ( (this.landscape === 'inline-block') ) {
      percent = 100 - ( document.getElementById('fontField2' + n).offsetWidth /
        document.getElementById('toPdf100Landscape').offsetWidth * 100);
    }
    let percentTop = 100 - ( document.getElementById('fontField1' + n).offsetHeight /
      document.getElementById('toPdf100').offsetHeight * 100);
    if ( (this.landscape === 'inline-block') ) {
      percentTop = 100 - ( document.getElementById('fontField2' + n).offsetHeight /
        document.getElementById('toPdf100Landscape').offsetHeight * 100);
    }
    console.log(document.getElementById('fontField1' + n).offsetWidth + ' : ' +  document.getElementById('toPdf100').offsetWidth);
    this.maxWidthTxtFieldTop = Math.round(percentTop - 1);
    this.maxWidthTxtFieldRight = Math.round(percent / 2 - 1);
    console.log('margines' + this.maxWidthTxtFieldTop );
    console.log('txtR: ' +  this.txtFieldLeft[n] + ' max: ' +  this.maxWidthTxtFieldRight);
    if ( this.txtFieldLeft[n] > this.maxWidthTxtFieldRight) {
      console.log('txtR: ' +  this.txtFieldLeft[n] + ' max: ' +  this.maxWidthTxtFieldRight);
      this.txtFieldLeft[n] = 0;
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
  checkDirectButtonValue(n, stepperIndex) {
    console.log('stepperValue: ' + stepperIndex);
    console.log('n: ' + n);
    if ( stepperIndex === 3 ) {
      this.btnDirectRightDisabled = true;
      document.getElementById('btnDirectRight').style.right = '-200px';
      document.getElementById('btnDirectRight').style.opacity = '0';

    } else {
      this.btnDirectRightDisabled = false;
      document.getElementById('btnDirectRight').style.right = '0px';
      document.getElementById('btnDirectRight').style.opacity = '1';
    }
    if (  stepperIndex === 0 ) {
      this.btnDirectLeftDisabled = true;
      document.getElementById('btnDirectLeft').style.left = '-200px';
      document.getElementById('btnDirectLeft').style.opacity = '0';
    } else {
      this.btnDirectLeftDisabled = false;
      document.getElementById('btnDirectLeft').style.left = '0px';
      document.getElementById('btnDirectLeft').style.opacity = '1';
    }
  }
  imageResizeWithProportionsWidth() {
    if ( this.checkboxSizeAttach ) {
      this.checkboxSizeAttachValue = this.imgWidth[this.currImg] - 10;
      const img = document.getElementById('imgToChange2' + this.currImg) as HTMLImageElement;
      let prop =  img.naturalHeight;
      prop = prop / img.naturalWidth;
      let multipleHeight;
      let multipleWidth;
      if ( (this.landscape === 'inline-block') ) {
        multipleHeight = document.getElementById('pdfForlandscape').offsetHeight;
        multipleWidth = document.getElementById('pdfForlandscape').offsetWidth;
      } else {
        multipleHeight = document.getElementById('pdfFor').offsetHeight;
        multipleWidth = document.getElementById('pdfFor').offsetWidth;
      }
      const propPdfFor = multipleWidth / multipleHeight;
      if ( this.imgWidth[this.currImg] * prop * propPdfFor > 100 ) {
        this.imgHeight[this.currImg] = 100;
        prop =  img.naturalWidth;
        prop = prop / img.naturalHeight;
        this.imgWidth[this.currImg] = this.imgHeight[this.currImg] * prop / propPdfFor;
      } else {
        this.imgHeight[this.currImg] = this.imgWidth[this.currImg] * prop * propPdfFor;
      }
      if ((Number(this.imgHeight[this.currImg]) + Number(this.imgTop[this.currImg]))  > 100 ) {
        this.imgTop[this.currImg] = 0;
      }
    }
  }
  imageResizeWithProportionsHeight() {
    if ( this.checkboxSizeAttach ) {
      this.checkboxSizeAttachValue = this.imgWidth[this.currImg] - 10;
      const img = document.getElementById('imgToChange2' + this.currImg) as HTMLImageElement;
      let prop =  img.naturalWidth;
      prop = prop / img.naturalHeight;
      let multipleHeight;
      let multipleWidth;
      if ( (this.landscape === 'inline-block') ) {
        multipleHeight = document.getElementById('pdfForlandscape').offsetHeight;
        multipleWidth = document.getElementById('pdfForlandscape').offsetWidth;
      } else {
        multipleHeight = document.getElementById('pdfFor').offsetHeight;
        multipleWidth = document.getElementById('pdfFor').offsetWidth;
      }
      const propPdfFor = multipleWidth / multipleHeight;
      if ( this.imgHeight[this.currImg] * prop / propPdfFor > 100) {
        this.imgWidth[this.currImg] = 100;
        prop =  img.naturalHeight;
        prop = prop / img.naturalWidth;
        this.imgHeight[this.currImg] = this.imgWidth[this.currImg] * prop * propPdfFor;
      } else {
        this.imgWidth[this.currImg] = this.imgHeight[this.currImg] * prop / propPdfFor;
      }
      if ((Number(this.imgWidth[this.currImg]) + Number(this.imgLeft[this.currImg]))  > 100 ) {
        this.imgLeft[this.currImg] = 0;
      }
    }
  }
  chcekProportions() {
    if ( this.onLoadBool ) {
      console.log('check');
      const img = document.getElementById('imgToChange2' + this.currImg) as HTMLImageElement;
      let prop =  img.naturalWidth;
      prop = prop / img.naturalHeight;
      let multipleHeight;
      let multipleWidth;
      if ( (this.landscape === 'inline-block') ) {
        multipleHeight = document.getElementById('pdfForlandscape').offsetHeight;
        multipleWidth = document.getElementById('pdfForlandscape').offsetWidth;
      } else {
        multipleHeight = document.getElementById('pdfFor').offsetHeight;
        multipleWidth = document.getElementById('pdfFor').offsetWidth;
      }
      const propPdfFor = multipleWidth / multipleHeight;
      this.imgWidth[this.currImg] = 10 * (prop / propPdfFor);
    }
  }
}
