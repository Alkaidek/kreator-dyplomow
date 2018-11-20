import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {AngularFireDatabase} from 'angularfire2/database';
import {MatSnackBar} from '@angular/material';
import * as fileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import {DataService} from '../data.service';
import { coordinates } from '../coordinates.js';
import { createComponentStrings } from '../allText.js';
import {CdkDragEnd} from '@angular/cdk/drag-drop';


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
  arraySelectFontFamili = [ 'Abril Fatface', 'Aladin', 'Allura', 'Anton', 'Dancing Script', 'Lato',
    'Merriweather', 'Montserrat', 'Open Sans', 'Oswald', 'Ranga', 'Roboto', 'Rubik', 'Ubuntu', 'Varela Round'
    ];
  userImg =
    [];
  createComponentStrings = createComponentStrings;
  percentLeft = [100, 100, 100];
  percentRight = [100, 100, 100];
  percentHeight = [80, 80, 80];
  userImgBase64 = [];
  userTxt = ['\n'];
  imgMAClogoFrame = '../../assets/img/MAClogoFrame.jpg';
  currImg = -1;
  bcgDisplay = ['block', 'block', 'block', 'block'];
  bcgTemp = [];
  template: any;
  frames = [];
  frame1 = [];
  frame2 = [];
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
  footer = createComponentStrings.a88;
  onLoadBool = false;
  bcgColorDisabled = false;
  constructor(private db: AngularFireDatabase, public snackBar: MatSnackBar, private _dataService: DataService) {
    this.setDate();
    /*stworzenie tablic zawierających odniesienia do kolejnych obrazków.
    * element tablicy[i] = ../../assets/img/[kategoria],
    * z roz. jpg to miniaturki,
    * z .png to orginały (full HD)*/
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
   /* this._dataService.getTemplates()
      .subscribe(tmp => {
        for (let i = 0; i < tmp[0].templates.length; i++) {
          this.coordinatesTemplate.push( tmp[0].templates[i] );
        }
      });*/
   /*stworzenie tablicy zawierającej odniesienia do obrazków będących tłami dyplomu*/
    for ( let i = 1; i < 27; i++ ) {
      this.bcgTemp.push('../../assets/img/bcg/' + i );
    }
    /*stworzenie tablicy zawierajacej odniesienia do obrazków będących ramkami dyplmu (PIONOWE!)*/
    for ( let i = 1; i < 37; i++ ) {
      this.frame1.push('../../assets/img/frame/' + i + '.png');
    }
    for ( let i = 37; i < 61; i++ ) {
      this.frame2.push('../../assets/img/frame2/' + i + '.png');
    }
    /*stworzenie tablicy zawierajacej odniesienia do obrazków będących ramkami dyplmu (POZIOME!)*/
    this.createFramesArray(this.frame1, this.frame2);
    /*this._dataService.getTemplates()
      .subscribe(tmp => {
        for (let i = 0; i < tmp[0].fonts.length; i++) {
          this.arraySelectFontFamili.push( tmp[0].fonts[i] );
        }
      });*/
  }
  editBoxShow = 'none';
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
  sign1 = createComponentStrings.a88;
  sign2 = createComponentStrings.a89;
  sign3 = createComponentStrings.a90;
  title = createComponentStrings.a91;
  imgSrc = '../../assets/img/0.png';
  imgSrcFix = '../../assets/img/0.png';
  imgSrcFrame = '../../assets/img/0.png';
  paddingTop = 10;
  paddingTopForWho = 20;
  paddingTopForWhat = 30;
  marginLeft = [1, 0, 0, 0, 0];
  marginRight = [0, 0, 0, 0, 0];
  paddingTopFooter = -10;
  bottom = 0;
  multiple = 4.5;
  arrayFontSize = [3, 0.9, 2, 0.8, 2];
  arrayFontNameId = ['largeTxt', 'sFor', 'txtForWhat', 'smallTxt', 'left', 'right', 'center'];
  arrayFontFamili = ['Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans'];
  arrayFontColor = ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'];
  rotate = [];
  imgWidth = [];
  imgHeight = [];
  imgWidthDragAndDrop = [];
  imgHeightDragAndDrop = [];
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
  shadowColor = ['#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91'];
  shadowLarge = ['0px 0px', '0px 0px', '0px 0px'];
  shadowLargeFix = ['0px 0px', '0px 0px', '0px 0px'];
  shadowSmall = '0% 0%';
  shadowSmallFooter = '0% 0%';
  shadowSmallFix = '0% 0%';
  shadowSmallFixFooter = '0% 0%';
  txtColor = ['#000000'];
  disp = 'block';
  txtColorText = '';
  txtFontFamili = ['Open Sans'];
  bcgRotateX = 1;
  bcgRotateY = 1;
  frmRotateX = 1;
  frmRotateY = 1;
  txtFontFamiliText = '';
  currentFontFamili = 0;
  letterSpacing = 0;
  letterSpacingForWho = 0;
  fontStyle = ['normal', 'normal', 'normal', 'normal', 'normal'];
  fontWeight  = ['normal', 'normal', 'normal', 'normal', 'normal'];
  fontVariant  = ['normal', 'normal', 'normal', 'normal', 'normal'];
  textAlign = ['center', 'center', 'center', 'center', 'center'];
  btnDirectLeftDisabled = true;
  btnDirectRightDisabled = false;
  checkboxSizeAttach = true;
  checkboxSizeAttachValue = 0;
  imageFrameWidth = 100;
  imageFrameWidthLandscape = 100;
  imageFrameWidthFix = 100;
  imageFrameWidthLandscapeFix = 100;
  /*scroll event,
  * kiedy zmienia się windows.scrollY automatycznie zmienia sie wielkość 'menu'
   * scrollY > 50 zm niejsza
   * scrollY = 0 powrót do stanu startowego*/
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
      /*document.getElementById('directButtonContainter').style.paddingLeft = '0.2%';
      document.getElementById('directButtonContainter').style.paddingRight = '0.2%';*/
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
      document.getElementById('directBcg').style.top = '8vh';
      const stepper = document.querySelector('.mat-horizontal-stepper-header-container') as HTMLElement;
      stepper.style.top = '8vh' ;
      const buttonStepper = document.getElementsByClassName('directButtonContainter');
      for ( let i = 0; i < buttonStepper.length; i++) {
        const element = buttonStepper[i] as HTMLElement;
        element.style.top = '10vh' ;
      }
      /*document.getElementById('directButtonContainter').style.paddingLeft = '3%';
      document.getElementById('directButtonContainter').style.paddingRight = '3%';*/
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
  /*funkcje/dane niezbedne podczas inicjalizacji komponentu
  * -ustawienie maksymalnych wartości dla Sliderów
  * -ustawienie Scroll Listener'a
  * -data, i podstawowe elementy*/
  ngOnInit() {
    setTimeout( () => {
      this.setOnInitData();
      this.addScrollListener();
      this.setPaddingAnchor();
      this.setTxtAlignWithoutPossitionChange(this.txtAlign[this.currentTxt]);
    }, 300);
  }
  setPaddingAnchor() {
    setTimeout( () => {
      this.checkWidth(0);
      this.checkWidth(1);
      this.checkWidth(2);
    }, 300);
  }
  /*ustawienie wartości dla footer, dzisiejsza data */
  setDate() {
    const date = new Date();
    let day = '' + date.getDate();
    const month = date.getMonth() + 1;
    let monthStr = month + '';
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
  /*wyróźnienie aktywnego elementu 'scheme30', tzn schematu zawierającego 3 pola na podpisy
  * ustalenie wartości dla zmiennej multiple - określa stosunek wysokości okna przeglądarki do elemntu z którego generowany będzie pdf*/
  setOnInitData() {
    setTimeout( () => {
/*      document.getElementById('scheme30').style.transform = 'scale(1,1)';*/
      /*document.getElementById('scheme30').style.boxShadow = '0px 0px 40px #eb008b, 2px 2px 10px #c109ea, -2px -2px 10px #c109ea';*/
/*      document.getElementById('scheme30').style.filter = 'grayscale(0%)';
      document.getElementById('scheme30').style.opacity = '1';*/
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
  /*Tworzy tablice zawierajacej odniesienia do ramek, wywołane podczas zmiany orientacji
  * jej zadaniem jest zmiana elementów w tablicy z ramek pionowych na poziome i odwrotnie.*/
  createFramesArray(array, array2) {
    this.frames = [];
    for ( let i = 0; i < array.length; i++ ) {
      this.frames.push(array[i]);
    }
  }
  /*Podświelta(wyróżnia) element (tło) określny jako parametr o id 'img'imgSrc*/
  highlightBcg(imgSrc) {
    try {
      this.lastValue = imgSrc;
      console.log('up' + this.lastValue);
      document.getElementById('img' + (this.lastValue) ).style.webkitTransform = 'scale(0.90,0.9)';
      document.getElementById('img' + (this.lastValue) ).style.transform = 'scale(0.90,0.9)';
      document.getElementById('img' + (this.lastValue) ).style.filter = 'grayscale(0%)';
    } catch (e) {
      console.log('higlightbcg');
    }
  }
  /*wycisza wyróżnienie, elementu (tła), określony jako paramet, parametrem powinien być Number*/
  downgradeBcg(imgSrc) {
    try {
      console.log('down' + this.lastValue);
      document.getElementById('img' + (imgSrc) ).style.webkitTransform = 'scale(0.7,0.7)';
      document.getElementById('img' + (imgSrc) ).style.transform = 'scale(0.7,0.7)';
      document.getElementById('img' + (imgSrc ) ).style.filter = 'grayscale(60%)';
    } catch (e) {
      console.log('no bcg');
    }
  }
  /*Podświelta(wyróżnia) element (ramka) określny jako parametr o id 'frm'imgSrc*/
  highlightFrame(imgSrc) {
    try {
      this.lastValueFrame = imgSrc;
      console.log('light: ' + imgSrc);
      document.getElementById('frm' + (imgSrc )).style.transform = 'scale(0.9,0.9)';
      document.getElementById('frm' + (imgSrc ) ).style.webkitTransform = 'scale(0.9,0.9)';
      document.getElementById('frm' + (imgSrc ) ).style.filter = 'grayscale(0%)';
    } catch (e) {
      console.log('highligntframe');
    }
  }
  /*wycisza wyróżnienie, elementu (ramki), określony jako paramet, parametrem powinien być Number*/
  downgradeFrame() {
    try {
      console.log('down' + this.lastValueFrame);
      document.getElementById('frm' + (this.lastValueFrame ) ).style.transform = 'scale(0.7,0.7)';
      document.getElementById('frm' + (this.lastValueFrame ) ).style.webkitTransform = 'scale(0.7,0.7)';
      document.getElementById('frm' + (this.lastValueFrame ) ).style.boxShadow = ' 0px 0px rgba(0, 0, 15, 0.2)';
      document.getElementById('frm' + (this.lastValueFrame  ) ).style.filter = 'grayscale(60%)';
    } catch (e) {
      console.log('no frm');
    }
  }
  /*podświetla wybrany element (tło) oraz wycisza podświetlnie poptrzedniego elementu*/
  takeBcg(imgSrc) {
    try {
      this.bcgColorDisabled = true;
      this.bcgColor = '#909090';
      this.bcgBtnDisable = false;
      document.getElementById('img' + (this.lastValue) ).style.transform = 'scale(0.7,0.7)';
      document.getElementById('img' + (this.lastValue) ).style.webkitTransform = 'scale(0.7,0.7)';
      document.getElementById('img' + (this.lastValue) ).style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';
      document.getElementById('img' + (this.lastValue  ) ).style.filter = 'grayscale(60%)';
      this.lastValue = imgSrc;
      document.getElementById('img' + (this.lastValue) ).style.transform = 'scale(0.9,0.9)';
      document.getElementById('img' + (this.lastValue) ).style.webkitTransform = 'scale(0.90,0.9)';
      document.getElementById('img' + (this.lastValue  ) ).style.filter = 'grayscale(0%)';
      this.base64Tmp = imgSrc;
      this.imgSrc = '' + (imgSrc + 1);
      this.imgSrcFix = this.bcgTemp[imgSrc] + '.jpg';
      this.base64 = '../../assets/img/' + (imgSrc + 1 ) + '.png';
    } catch (e) {
      console.log('takebcg');
    }

  }
  /*podświetla wybrany element (ramka) oraz wycisza podświetlnie poptrzedniego elementu
  * dodatkowo pobiera dane z pliku coordinates.js i ustawia marginasy na wartości bazowe dla wybranej ramki*/
  takeFrame(imgSrc) {
    try {
      this.frmBtnDisable = false;
      document.getElementById('frm' + (this.lastValueFrame)).style.transform = 'scale(0.7,0.7)';
      document.getElementById('frm' + (this.lastValueFrame)).style.webkitTransform = 'scale(0.7,0.7)';
      document.getElementById('frm' + (this.lastValueFrame)).style.filter = 'grayscale(60%)';
    } catch (e) {
      console.log('takeframe down');
    }
    try {
      this.lastValueFrame = imgSrc;
      document.getElementById('frm' + (imgSrc)).style.transform = 'scale(0.9,0.9)';
      document.getElementById('frm' + (imgSrc)).style.webkitTransform = 'scale(0.9,0.9)';
      document.getElementById('frm' + (this.lastValueFrame)).style.filter = 'grayscale(0%)';
      this.base64TmpFrame = imgSrc;
      this.imgSrc = '' + (imgSrc);
      this.imgSrcFrame = this.frames[imgSrc];
    } catch (e) {
      console.log('takeframe up');
    }
      try {
        if (this.landscape !== 'none') {
          imgSrc = imgSrc + 36;
        }
        switch ( imgSrc ) {
          case imgSrc:
            console.log('number' + imgSrc);
            console.log('Array' + coordinates[imgSrc]);
            this.paddingTop = Number(coordinates[imgSrc][0]);
            this.paddingTopForWho = Number(coordinates[imgSrc][0]) + 10;
            this.paddingTopForWhat = Number(coordinates[imgSrc][0]) + 20;
            this.marginLeft[3] = coordinates[imgSrc][1];
            this.marginRight[3] = coordinates[imgSrc][2];
            this.bottom = coordinates[imgSrc][3];
            if ( this.landscape === 'inline-block' ) {
              this.paddingTopFooter = coordinates[imgSrc][3] - 15;
            } else {
              this.paddingTopFooter = coordinates[imgSrc][3] - 7;
            }
            break;
          default:
            this.paddingTop = 10;
            this.paddingTopForWho = 20;
            this.paddingTopForWhat = 30;
            this.marginLeft[3] = 5;
            this.marginRight[3] = 5;
            this.bottom = 0;
        }
      } catch (e) {
        console.log('no right coordintaes');
      }
  }
  /*sprawia że spinner staje się widoczny, oraz wywołuje funkcję generatePdf()*/
  generateHQualityPdf() {
    document.getElementById('spinner').style.display = 'block';
    this.generatePdf();
  }
  /*generuje pdf zależnie od ustawienia strony (pion/poziom)*/
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
        pdf.save(this.forWho + '' + this.getCurrentDate() + '.pdf');
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
        pdf.save(this.forWho + '' + this.getCurrentDate() + '.pdf');
        document.getElementById('spinner').style.display = 'none';
      });
    }
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
  /*przygotowuje plik który zostanie pobrany jako szablon dyplomu
  * wywołuje funkcje saveData()
  * przygotowuje nazwę pliku
  * pokazuje odpowieni komunikat jako snackBar*/
  createArrayToSend() {
    const msg = this.getCurrentDate();
    this.openSnackBar( createComponentStrings.a92 + msg,  'ok' );
    this.saveData( msg );
  }
  /*zwraca wysokość na podstawie tablicy
  * jej zadabaniem jest dynamiczne nadanie wysokości dla kontenerów prezechowujących miniaturki obrazków*/
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
  /*ustawia dane na podstawie parametru template, używana głównie od wczytania zapisanego wcześniej szbalonu*/
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
      this.marginLeft[4] = template.marginLeft[4];
      this.marginRight[4] = template.marginRight[4];
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
      this.shadowSmallFooter =  template.shadowSmallFooter;
      this.letterSpacing = template.letterSpacing;
      this.letterSpacingForWho = template.letterSpacingForWho;
      this.bottom = template.bottom;
      this.imgSrcFrame = template.frame;
      if ( this.imgSrcFrame === '../../assets/img/0.png' ) {
        this.downgradeFrame();
       /* this.imgMAClogoFrame = '../../assets/img/MAClogoFrame.jpg';*/
      } else {
        /*this.imgMAClogoFrame = '../../assets/img/0.png';*/
        this.frmBtnDisable = false;
        for ( let i = 0; i < this.frames.length; i++ ) {
          if (this.imgSrcFrame === this.frames[i]) {
            this.downgradeFrame();
            console.log('up: ' + i);
            setTimeout( () => {
              this.highlightFrame(i);
              for ( let h = 0; h < Math.floor(i / 3); h++ ) {
                console.log('right: ' + h);
                this.moveRightFrame();
              }
            }, 500);
          }
        }
      }
      if ( template.img === '' || template.img === '../../assets/img/0.png') {
        this.downgradeBcg(this.lastValue);
        this.imgSrcFix =  '../../assets/img/0.png';
      } else {
        const element = template.img;
        /*this.imgSrcFix = template.img.replace('png', 'jpg' );*/
        this.bcgBtnDisable = false;
        this.bcgColor = '#ffffff';
        this.bcgColorDisabled = true;
        for ( let i = 0; i < this.bcgTemp.length; i++ ) {
          if (element === this.bcgTemp[i] /*+ '.png'*/) {
            this.downgradeBcg(this.lastValue);
            this.highlightBcg(i);
            for ( let h = 0; h < Math.floor(i / 3); h++ ) {
              this.moveRight();
            }
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
          this.imgHeightDragAndDrop.push(template.userImgTop[i]);
          this.imgWidthDragAndDrop.push(template.userImgLeft[i]);
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
      this.setAllButtonColor();
    } catch (err) {
      this.resetSettings();
      this.openSnackBar(createComponentStrings.a93, 'ok');
    }
    document.getElementById('spinner').style.display = 'none';
  }
  /*resetuje wartości zmniennych i elementów widoku do wartości bazowych*/
  resetSettings() {
    try {
      document.getElementById('base' + this.currentBaseTemplate ).style.transform = 'scale(0.9,0.9)';
      document.getElementById('base' + this.currentBaseTemplate).style.filter = 'grayscale(100%)';
    } catch (err) {
      console.log('no element');
    }
    this.onLoadBool = false;
    this.txtAlign = [];
    this.tmpBtnDisable = true;
    this.bcgColorDisabled = false;
    this.shadowColor = ['#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91', '#8c8e91'];
    this.shadowLarge = ['0px 0px', '0px 0px', '0px 0px'];
    this.shadowLargeFix = ['0px 0px', '0px 0px', '0px 0px'];
    this.shadowSmall = '0px 0px';
    this.shadowSmallFooter = '0px 0px';
    this.shadowSmallFix = '0px 0px';
    this.shadowSmallFixFooter = '0px 0px';
    this.bcgRotateX = 1;
    this.bcgRotateY = 1;
    this.frmRotateX = 1;
    this.frmRotateY = 1;
    this.txtShadow = [];
    this.txtShadowColor = [];
    this.bcgBtnDisable = true;
    this.bcgColor = '#909090';
    this.frmBtnDisable = true;
    this.boolDisableUserImgFields = true;
    this.hidebox = true;
    this.imgMAClogoFrame = '../../assets/img/MAClogoFrame.jpg';
    this.letterSpacing = 0;
    this.letterSpacingForWho = 0;
    this.bcgColor = '#ffffff';
    this.landscape = '';
    this.landscape = 'none';
    document.getElementById('imgO2').style.filter = 'grayscale(0%)';
    document.getElementById('imgO1').style.filter = 'grayscale(100%)';
    document.getElementById('imgO2').style.transform = 'rotate(90deg) scale(1, 1)';
    document.getElementById('imgO1').style.transform = 'scale(.9, .9)';
    this.setScheme(30);
    this.paddingTopFooter = -10;
    this.textAlign = ['center', 'center', 'center', 'center', 'center'];
    this.fontStyle = ['normal', 'normal', 'normal', 'normal', 'normal'];
    this.fontWeight  = ['normal', 'normal', 'normal', 'normal', 'normal'];
    this.fontVariant  = ['normal', 'normal', 'normal', 'normal', 'normal'];
    this.paddingTop = 0;
    this.paddingTopForWho = 10;
    this.paddingTopForWhat = 20;
    this.marginLeft[0] = 1;
    this.marginLeft[1] = 0;
    this.marginLeft[2] = 0;
    this.marginLeft[3] = 0;
    this.marginLeft[4] = 0;
    this.marginRight[3] = 0;
    this.marginRight[2] = 0;
    this.marginRight[1] = 0;
    this.marginRight[0] = 0;
    this.bottom =  0;
    this.imgSrcFix =  '../../assets/img/0.png';
    this.base64Tmp = '';
    this.arrayFontSize = [ 3, 0.9, 2, 0.8, 2];
    this.arrayFontFamili = ['Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans', 'Open Sans'];
    this.arrayFontColor = ['black', 'black', 'black', 'black', 'black', 'black'];
    this.title = 'Dyplom';
    this.forWho =  '';
    this.forWhat =  '';
    this.sign1 = 'Podpis 1\n...............\n';
    this.sign2 = 'Podpis 2\n...............\n';
    this.sign3 = 'Podpis 3\n...............\n';
    this.footer = 'Kielce, dnia ';
    this.setDate();
    this.userImg = [];
    this.rotate = [];
    this.imgWidth = [];
    this.imgHeight = [];
    this.imgHeightDragAndDrop = [];
    this.imgWidthDragAndDrop = [];
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
    this.userTxt = ['\n'];
    this.txtFontFamili = ['Open Sans'];
    this.txtFontFamiliText = '';
    this.imgSrcFrame = '../../assets/img/0.png';
  }
  /*obsługa karuzeli z tłami, 'przejscie w lewo'*/
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
  /*obsługa karuzeli z tłami, 'przejscie w prawo'*/
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
  /*obsługa karuzeli z ramkami, 'przejscie w lewo'*/
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
  /*obsługa karuzeli z ramkami, 'przejscie w prawo'*/
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
  /*resetuje obrót obrazka (wczytanego przez użytkownika)*/
  set0degress() {
    this.rotate[this.currImg] = 0;
  }
  /*resetuje obrzek wczytany przez uzytkownika do wartości bazowych*/
  resetImg() {
    this.rotate[this.currImg] = 0;
    this.imgLeft[this.currImg] = 0;
    this.imgTop[this.currImg] = 0;
    this.imgHeight[this.currImg] = 10;
    const img = document.getElementById('imgToChange2' + this.currImg) as HTMLImageElement;
    let prop =  img.naturalWidth;
    prop = prop / img.naturalHeight;
    let multipleHeight;
    let multipleWidth;
    if ( (this.landscape === 'inline-block') ) {
      multipleHeight = document.getElementById('pdfForlandscape').offsetHeight;
      multipleWidth = document.getElementById('pdfForlandscape').offsetWidth;
      document.getElementById('imgToChange44' + this.currImg).style.transform = 'translate3d(0px, 0px, 0px)';
      this.setDeragAndDropPercent('imgToChange44', this.currImg);
    } else {
      multipleHeight = document.getElementById('pdfFor').offsetHeight;
      multipleWidth = document.getElementById('pdfFor').offsetWidth;
      document.getElementById('imgToChange22' + this.currImg).style.transform = 'translate3d(0px, 0px, 0px)';
      this.setDeragAndDropPercent('imgToChange22', this.currImg);
    }
    const propPdfFor = multipleWidth / multipleHeight;
    this.imgWidth[this.currImg] = 10 * (prop / propPdfFor);
  }
  /*obsługa przejścia w 'prawo' (nastepny krok)*/
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
  /*obsługa przejścia w 'lewo' (poprzedni krok)*/
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
  /*zresetowanie elementów niezbednych do poprawnego wyświetlania karuzel z tłami i ramkami po zmianie*/
  arrayScrollReset() {
    try {
      const btn =  document.getElementById('rightDirect') as HTMLButtonElement;
      const btn2 =  document.getElementById('leftDirect') as HTMLButtonElement;
      const btnfrm =  document.getElementById('rightDirectFrame') as HTMLButtonElement;
      const btn2frm =  document.getElementById('leftDirectFrame') as HTMLButtonElement;
      btn.disabled = false;
      btn2.disabled = true;
      btnfrm.disabled = false;
      btn2frm.disabled = true;
      console.log(':::: ' + this.arrayScroll + ' : ' + this.bcgTemp.length);
      console.log(':::: ' + this.arrayScroll + ' : ' + this.bcgTemp.length);
      if ( this.arrayScroll[2] === this.bcgTemp.length ||
        (this.arrayScroll[2]) > this.bcgTemp.length ||
        (this.arrayScroll[2] - 1 ) === this.bcgTemp.length) {
        console.log('.....' + this.arrayScroll[2] + ' : ' + this.bcgTemp.length);
        this.moveLeft();
      }
        for (let i = 0; i < 3; i++) {
          document.getElementById('bcg' + this.arrayScroll[i]).style.display = 'none';
          document.getElementById('frmBox' + this.arrayScrollFrame[i]).style.display = 'none';
          console.log('b: ' + this.arrayScrollFrame[i]);
        }
      } catch (e) {
        console.log('arrayScrollReset none');
      }
      try {
        this.arrayScroll = [1, 2, 3];
        this.arrayScrollFrame = [1, 2, 3];
        for (let i = 0; i < 3; i++) {
          document.getElementById('bcg' + (this.arrayScroll[i])).style.display = 'inline-block';
          document.getElementById('frmBox' + (this.arrayScrollFrame[i])).style.display = 'inline-block';
        }
      } catch (e) {
        console.log('arrayScrollReset inline-block');
      }
  }
  /*włącza jeśli parametr n =/= 2 orientację poziomą, wyłącza jeśli parametr = 2 orientację pionową*/
  landscapeOff(n) {
    if (n === 2) {
      this.landscape = 'none';
      document.getElementById('imgO2').style.filter = 'grayscale(0%)';
      document.getElementById('imgO1').style.filter = 'grayscale(100%)';
      document.getElementById('imgO2').style.transform = 'rotate(90deg) scale(1, 1)';
      document.getElementById('imgO1').style.transform = 'scale(.9, .9)';
      const width = document.getElementById('toPdf100').offsetWidth;
      console.log(': ' + ( 794 / width) );
      this.multiple = (794 / width );
      this.createFramesArray(this.frame1, this.frame2);
      this.arrayScrollReset();
      this.resetSettings();
    } else {
      this.arrayScrollReset();
      this.resetSettings();
      this.downgradeFrame();
      this.downgradeBcg(this.lastValue);
      this.landscape = 'inline-block';
      const element = document.getElementById('toPdf100Landscape');
      element.classList.remove('rotateInDownRight');
      document.getElementById('imgO2').style.filter = 'grayscale(100%)';
      document.getElementById('imgO1').style.filter = 'grayscale(0%)';
      document.getElementById('imgO2').style.transform = 'rotate(90deg) scale(.9, .9)';
      document.getElementById('imgO1').style.transform = 'scale(1, 1)';
      this.createFramesArray(this.frame2, this.frame1);
      this.bottom = 14;
      this.paddingTopFooter = -1;
      setTimeout( () => {
        const width = document.getElementById('toPdf100Landscape').offsetHeight;
        console.log(': ' + ( 794 / width) );
        this.multiple = (794 / width );
      }, 300);
    }
  }
  /*ustawia schemat dyplomu jeśli parametr n = 50 to 2 pola, jeśli nie to 3 pola*/
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
      /*document.getElementById('scheme' + n).style.transform = 'scale(1,1)';*/
      /*document.getElementById('scheme30').style.transform = 'scale(0.9,0.9)';*/
      document.getElementById('sign3').style.display = 'none';
      /*document.getElementById('scheme50').style.boxShadow = '0px 0px 40px #eb008b, 2px 2px 10px #c109ea, -2px -2px 10px #c109ea';
      document.getElementById('scheme30').style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';*/
      /*document.getElementById('scheme50').style.filter = 'grayscale(0%)';
      document.getElementById('scheme30').style.filter = 'grayscale(100%)';
      document.getElementById('scheme50').style.opacity = '1';
      document.getElementById('scheme30').style.opacity = '0.5';*/
      this.scheme = 50;
    } else {
      document.getElementById('centerLandscape').style.display = 'inline-block';
      document.getElementById('rightLandscape').style.width = n + 2 + '%';
      document.getElementById('leftLandscape').style.width = n + 2 + '%';
      document.getElementById('centerLandscapeFix').style.display = 'inline-block';
      document.getElementById('rightLandscapeFix').style.width = n + 2 + '%';
      document.getElementById('leftLandscapeFix').style.width = n + 2 + '%';
      document.getElementById('centerFix').style.display = 'inline-block';
      document.getElementById('rightFix').style.width = n + 3 + '%';
      document.getElementById('leftFix').style.width = n + 3 + '%';
      document.getElementById('center').style.display = 'inline-block';
      document.getElementById('right').style.width = n + 3 + '%';
      document.getElementById('left').style.width = n + 3 + '%';
      /*document.getElementById('scheme50').style.transform = 'scale(0.9,0.9)';
      document.getElementById('scheme30').style.transform = 'scale(1,1)';*/
      document.getElementById('sign3').style.display = 'inline-block';
     /* document.getElementById('scheme50').style.filter = 'grayscale(100%)';
      document.getElementById('scheme30').style.filter = 'grayscale(0%)';
      document.getElementById('scheme30').style.opacity = '1';
      document.getElementById('scheme50').style.opacity = '0.5';*/
      this.scheme = 30;
    }
  }
  /*dodaje obrazek i jego parametry*/
  add() {
    this.openSnackBar(createComponentStrings.a97, 'ok');
    this.boolDisableUserImgFields = false;
    this.userImg.push(this.userImg.length);
    this.rotate.push(0);
    this.imgTop.push(0);
    this.imgLeft.push(0);
    this.currImg = this.userImg.length - 1;
    this.imgHeight.push(10);
    this.imgWidth.push(10);
    this.imgWidthDragAndDrop.push(0);
    this.imgHeightDragAndDrop.push(0);
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
  /*usuwa aktualnie wybrany obrazek*/
  removeImg() {
    this.userImg.pop();
    this.userImgBase64.splice(this.currImg, 1);
    this.rotate.splice(this.currImg, 1);
    this.imgWidth.splice(this.currImg, 1);
    this.imgHeight.splice(this.currImg, 1);
    this.imgHeightDragAndDrop.splice(this.currImg, 1);
    this.imgWidthDragAndDrop.splice(this.currImg, 1);
    this.imgTop.splice(this.currImg, 1);
    this.imgLeft.splice(this.currImg, 1);
    this.currImg = this.userImg.length - 1;
    this.setUserImgFrame(this.currImg);
    if ( this.currImg === -1 ) {
      this.boolDisableUserImgFields = true;
    }
  }
  /*wyświetla SnackBar'a
  * message -> wiadomość
  * action -> akcja np ok*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  /*zapisuje plik szablonu na dysku z rozszerzeniem MACproject*/
  saveData(date) {
    const blob = new Blob( [this.createFileToSave()], {type: 'text/json'});
    const result = fileSaver.saveAs(blob, date + '_' + this.forWho +   '.MACproject');
    return result.readyState;
  }
  /*na podstawie tablicy przekazanej jako argument tworzy fragment JSON'a*/
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
  /*tworzy plik JSON, który zostanie zapisany jako szablon dyplomu*/
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
      + '"shadowSmallFooter" : "'
      +  this.shadowSmallFooter + '", '
      + '"letterSpacing" : "'
      + this.letterSpacing + '", '
      + '"letterSpacingForWho" : "'
      + this.letterSpacingForWho + '", '
      + '"paddingTop" : [ "'
      + this.paddingTop + '", "'
      + this.paddingTopForWho + '", "'
      + this.paddingTopForWhat + '" ], '
      + '"img" : "'
      +  this.imgSrcFix.replace('jpg', 'png' ) + '", '
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
      + this.createTextToJSON(this.imgWidthDragAndDrop) + '],'
      + '"userImgTop" : [ '
      + this.createTextToJSON(this.imgHeightDragAndDrop) + '],'
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
      + '"frame" : "'
      + this.imgSrcFrame + '", '
      + '"scheme" : "'
      + this.scheme
      + '" }';
    return txt;
  }
  /*resetuje wartość tablicy zaweirającej odniesienia do ramek oraz tła do wartości bazowych*/
  resetBcgFrameArray() {
    this.bcgTemp = [];
    this.frame2 = [];
    this.frame1 = [];
    for ( let i = 1; i < 27; i++ ) {
      this.bcgTemp.push('../../assets/img/bcg/' + i );
    }
    for ( let i = 1; i < 37; i++ ) {
      this.frame1.push('../../assets/img/frame/' + i + '.png');
    }
    for ( let i = 37; i < 61; i++ ) {
      this.frame2.push('../../assets/img/frame2/' + i + '.png');
    }
    this.createFramesArray(this.frame1, this.frame2);
  }
  /*wywoływana podczas wczytywania szablonu przez użytkownika*/
  onSelectFile(event) {
    try {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      let txt: any;
      document.getElementById('spinner').style.display = 'block';
      reader.onload = ()  => {
        this.downgradeFrame();
        this.downgradeBcg(this.lastValue);
        this.resetBcgFrameArray();
        setTimeout( () => {
          this.arrayScrollReset();
          txt = reader.result;
          this.jsonToArray(txt);
        }, 30);
      };
    } catch (err) {
      this.resetSettings();
      this.openSnackBar(createComponentStrings.a94, 'ok');
    }
  }
  /*wywoływana podczas ładowania obrazka IMPORTOWANEGO przez uzytkownika*/
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
      this.openSnackBar(createComponentStrings.a95, 'ok');
    }
  }
  /*funkcja parsuje tekstowy format do JSON'a który nastepnie przekazuje do funkcji setUserData(JSON)*/
  jsonToArray(txt) {
    try {
      const obj = JSON.parse(txt);
      this.setUserData(obj);
    } catch (err) {
      this.resetSettings();
      this.openSnackBar(createComponentStrings.a96, 'ok');
    }
    document.getElementById('spinner').style.display = 'none';
  }
  /*resetuje tło
  * ustawia obrót X/Y na wartość bazową wycisza wybrane wcześniej tło oraz usuwa tło/kolor z dyplomu*/
  resetBcg() {
    this.bcgRotateX = 1;
    this.bcgRotateY = 1;
    this.bcgBtnDisable = true;
    this.bcgColor = '#909090';
    this.bcgColorDisabled = false;
    this.bcgColor = '#ffffff';
    this.imgSrc = '../../assets/img/0.png';
    this.imgSrcFix = '../../assets/img/0.png';
    this.base64Tmp = '';
    this.bcgColor = '#ffffff';
    document.getElementById('img' + (this.lastValue ) ).style.boxShadow = '0px 0px rgba(0, 0, 15, 0.2)';
    document.getElementById('img' + (this.lastValue ) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('img' + (this.lastValue ) ).style.border = '1px solid #959895';
  }
  /*resetuje ramkę
  * wycisza poprzednio wybraną ramkę
  * resetuje wartości X oraz Y obrotu ramki
  * ustawia jako ramkę element bazowy (czysty)*/
  resetFrame() {
    this.frmRotateX = 1;
    this.frmRotateY = 1;
    this.frmBtnDisable = true;
    this.imgSrcFrame = '../../assets/img/0.png';
    /*this.imgMAClogoFrame = '../../assets/img/MAClogoFrame.jpg';*/
    document.getElementById('frm' + (this.lastValueFrame ) ).style.webkitTransform = 'scale(0.8,0.8)';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.border = 'white 1px solid';
    document.getElementById('frm' + (this.lastValueFrame ) ).style.boxShadow = ' 0px 0px rgba(0, 0, 15, 0.2)';
  }
  /*funkcja uzupełnia tablice odpowienimi danymi, tworząc dodatkowe pole tekstowe*/
  addTxt() {
    if ( this.currentTxt === -1 ) {
      this.hidebox = false;
    }
    this.actualTxt = '';
    /*this.currentTxt = this.userTxt.length;*/
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
  /*Włącza lub wyłącza cień pod elementem, zależne od aktualnej wartości każdego pola*/
  shadowOnOffForUserTextField(): Number {
    if ( this.txtShadow[this.currentTxt] > 0) {
      this.txtShadow[this.currentTxt] = 0;
    } else {
      this.txtShadow[this.currentTxt] = 4;
    }
    return this.txtShadow[this.currentTxt];
  }
  /*ustawia kolory pryzisków Pogrubienie/Pochylenie/... dla dodatkowych pól tekstowych*/
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
  /*dodaje pole tekstowe z wartościami podanymi jako argumenty*/
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
  /*ustawia czcionkę dla danego elementu
  * parametr n określa czcionkę*/
  setFontFamili(n) {
    this.txtFontFamili[this.currentTxt] = this.arraySelectFontFamili[n];
  }
  /*ustawia czcionkę dla jednego z głównego elementu (tytuł/dla kogo/za co/podpisy/stopka)*/
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
  /*włącza/wyłacza cień dla elementu głównego, zależne od poprzedniej wartości pola*/
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
      if ( n === 1 ) {
        if ( this.shadowSmallFooter === '2px 2px 2px' ) {
          this.shadowSmallFooter = '0px 0px';
          this.shadowSmallFixFooter = '0px 0px';
        } else {
          this.shadowSmallFooter = '2px 2px 2px';
          this.shadowSmallFixFooter = '10px 10px 10px';
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
  }
  /*ustala na podstawie parametru temp cień dla elementu tytuł/dla kogo/za co/podpisy/stopka*/
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
    try {
      if ( temp.shadowSmallFooter === '2px 2px 2px' ) {
        this.shadowSmallFixFooter = '10px 10px 10px';
      } else {
        this.shadowSmallFixFooter = '0px 0px';
      }
    } catch (e) {
      console.log('no Shadow');
    }
  }
  /*ustawia pochylenie lda elementu głównego (tytuł/dla kogo/za co/podpisy/stopka)
  * zależy od aktualnego stanu elementu*/
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
  /*ustawia pochylenie dla dodtakowego pola tekstowego
  * zależy od aktualnego stanu elementu*/
  setTxtStyle() {
    if (this.txtStyle[this.currentTxt] === 'italic') {
      this.txtStyle[this.currentTxt] = 'normal';
    } else {
      this.txtStyle[this.currentTxt] = 'italic';
    }
    this.setButtonColor('fontStyle5');
    this.setMaxWidthForUserTxt();
  }
  /*ustawia pogróbienie dla dodtakowego pola tekstowego
 * zależy od aktualnego stanu elementu*/
  setTxtWeight() {
    if (this.txtWeight[this.currentTxt] === 'bold') {
      this.txtWeight[this.currentTxt] = 'normal';
    } else {
      this.txtWeight[this.currentTxt] = 'bold';
    }
    this.setButtonColor('fontWeight5');
    this.setMaxWidthForUserTxt();
  }
  /*ustawia wariant dla dodtakowego pola tekstowego
 * zależy od aktualnego stanu elementu*/
  setTxtVariant() {
    if (this.txtVariant[this.currentTxt] === 'small-caps') {
      this.txtVariant[this.currentTxt] = 'normal';
    } else {
      this.txtVariant[this.currentTxt] = 'small-caps';
    }
    this.setButtonColor('fontVariant5');
    this.setMaxWidthForUserTxt();
  }
  /*ustawia połozenie dla dodtakowego pola tekstowego*/
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
  /*ustawia połozenie lda elementu głównego (tytuł/dla kogo/za co/podpisy/stopka)*/
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
  /*ustawia pogróbienie lda elementu głównego (tytuł/dla kogo/za co/podpisy/stopka)
  * zależy od aktualnego stanu elementu*/
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
  /*ustawia variant lda elementu głównego (tytuł/dla kogo/za co/podpisy/stopka)
  * zależy od aktualnego stanu elementu*/
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
  /*ustawia położenie (lewy) lda elementu głównego (tytuł/dla kogo/za co/podpisy/stopka)*/
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
  /*ustawia położenie (wyśrodkowanie) lda elementu głównego (tytuł/dla kogo/za co/podpisy/stopka)*/
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
  /*ustwia kolor pryzisku
  * zależy od aktualnego koloru przycisku*/
  setButtonColor(n) {
    if ( document.getElementById(n).style.background === 'white' || document.getElementById(n).style.background === '') {
      document.getElementById(n).style.background = this.MACblue;
      document.getElementById(n).style.color = 'white';
    } else {
      document.getElementById(n).style.background = 'white';
      document.getElementById(n).style.color = this.MACblue;
    }
  }
  /*ustawia na biały kolor przycisku dla pryzciku przekazanego w parametrze*/
  setWhiteColor(n) {
    document.getElementById(n).style.background = 'white';
    document.getElementById(n).style.color = this.MACblue;
  }
  /*ustawia na niebieski kolor przycisku dla pryzciku przekazanego w parametrze*/
  setBlueColor(n) {
    document.getElementById(n).style.background = this.MACblue;
    document.getElementById(n).style.color = 'white';
  }
  /*ustawia kolor wszystkich przycisków (tylko dla elementów głównych)*/
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
  /*ustawia położenie (prawo) lda elementu głównego (tytuł/dla kogo/za co/podpisy/stopka)*/
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
  /*ustawiwa wartości maksymalne dla slajderów*/
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
  /*ustawia obrazek wybrany ze zbioru*/
  /*setImg(n, name) {
    this.onLoadBool = true;
    const rmvBtn = document.getElementById('rmvImg') as HTMLButtonElement;
    rmvBtn.disabled = false;
    if (name === 'Animal') {
      this.userImgBase64.push(this.imagesAnimal[n]);
    } else if (name === 'Sport') {
      this.userImgBase64.push(this.imagesSport[n] + '.png');
      this.add();
    } else if (name === 'Emocje') {
          this.userImgBase64.push(this.imagesEmocje[n] + '.png');
          this.add();
    } else if (name === 'Geografia') {
      this.userImgBase64.push(this.imagesGeografia[n] + '.png');
      this.add();
    } else if (name === 'Literatura') {
      this.userImgBase64.push(this.imagesLiteratura[n] + '.png');
      this.add();
    } else if (name === 'Matematyka') {
      /!*this.userImgBase64.push(this.imagesMatematyka[n]);*!/
      this.userImgBase64.push(this.imagesMatematyka[n] + '.png');
      this.add();
    } else if (name === 'Muzyka') {
      this.userImgBase64.push(this.imagesMuzyka[n] + '.png');
      this.add();
    } else if (name === 'Rosliny') {
      this.userImgBase64.push(this.imagesRosliny[n] + '.png');
      this.add();
    } else if (name === 'Polska') {
      this.userImgBase64.push(this.imagesPolska[n] + '.png');
      this.add();
    } else if (name === 'Swieta') {
      this.userImgBase64.push(this.imagesSwieta[n] + '.png');
      this.add();
    } else if (name === 'Szachy') {
      this.userImgBase64.push(this.imagesSzachy[n] + '.png');
      this.add();
    } else if (name === 'Zwierzeta') {
      this.userImgBase64.push(this.imagesZwierzeta[n] + '.png');
      this.add();
    } else if (name === 'Literatura') {
      this.userImgBase64.push(this.imagesLiteratura[n] + '.png');
      this.add();
    }
  }*/
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
  /*odbija tło (oś X)*/
  rotateBcgX() {
    this.bcgRotateX = this.bcgRotateX * -1;
  }
  /*odbija tło (oś Y)*/
  rotateBcgY() {
    this.bcgRotateY = this.bcgRotateY * -1;
  }
  /*odbija ramke (oś X)*/
  rotateFrmX() {
    this.frmRotateX = this.frmRotateX * -1;
  }
  /*odbija ramke (oś Y)*/
  rotateFrmY() {
    this.frmRotateY = this.frmRotateY * -1;
  }
  /*ustawia maksymalne wartości dla slajderów*/
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
    this.percentLeft[n] = Math.round(percent - 5);
    this.percentRight[n] = Math.round(percent - 5);
  }
  /*ustawia maksymalne wartości dla slajderów, dodatkowo zawiera zabezpieczenie, które wyśrodkowuje pozycję
  * wyśrodkowanie działa tylko w przypadku przepełnienia*/
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
    this.percentLeft[n] = Math.round(percent - 5);
    this.percentRight[n] = Math.round(percent - 5);
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
    this.percentHeight[n] = Math.round(percent - 5);
    this.percentHeight[n] = Math.round(percent - 5);
    return i;
  }
  /*ustaiwa wartości maksymalne slajderów odnoszące się do wysokości*/
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
  /*ustawia wartości maksymalne dla slajderów odnoszących się do elementów dodatkowych pól tekstowych*/
  setMaxWidthForUserTxt() {
    console.log('font1' + this.currentTxt);
    const rightSlider = document.getElementById('additionalRight') as HTMLInputElement;
    const leftSlider = document.getElementById('additionalLeft') as HTMLInputElement;
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
    this.maxWidthUserTxtFieldRight = Math.round(percent - 5);
    rightSlider.max = '' + Math.round(percent - 5);
    leftSlider.max = '' + Math.round(percent - 5);
    console.log('margines' + this.maxWidthUserTxtFieldTop );
    console.log('' + this.currentTxt );
    console.log('txtR: ' +  this.txtLeft[this.currentTxt] + ' max: ' +  this.maxWidthUserTxtFieldRight);
    if ( this.txtLeft[this.currentTxt] > this.maxWidthUserTxtFieldRight) {
      console.log('txtR: ' +  this.txtLeft[this.currentTxt] + ' max: ' +  this.maxWidthUserTxtFieldRight);
      this.txtLeft[this.currentTxt] = 0;
    }
    return Math.round(percent - 5);
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
  /*obsługa znikania i pojawiania się przycisków od przechodzenia między krokami*/
  checkDirectButtonValue(n, stepperIndex) {
    console.log('stepperValue: ' + stepperIndex);
    console.log('n: ' + n);
    if ( stepperIndex === 4 ) {
      this.btnDirectRightDisabled = true;
      document.getElementById('btnDirectRight').style.right = '-200px';
      document.getElementById('btnDirectRight').style.opacity = '0';
      this.editBoxShow = 'block';

    } else {
      this.btnDirectRightDisabled = false;
      document.getElementById('btnDirectRight').style.right = '0px';
      document.getElementById('btnDirectRight').style.opacity = '1';
      this.editBoxShow = 'none';
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
  /*obsługa zmiany szerokości obrazka z zachowaniem proporcji*/
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
      if ((Number(this.imgHeight[this.currImg]) + Number(this.imgHeightDragAndDrop[this.currImg]))  > 101 ) {
        this.resetUserImgTransition();
      }
    }
  }
  resetUserImgTransition() {
    console.log('Reset!');
    if (this.landscape === 'inline-block') {
      document.getElementById('imgToChange44' + this.currImg).style.transform = 'none';
      const source: any = document.getElementById('imgToChange44' + this.currImg);
      source._passiveTransform = { x: 0, y: 0 };
      this.setDeragAndDropPercent('imgToChange44', this.currImg);
    } else {
      document.getElementById('imgToChange22' + this.currImg).style.transform = 'none';
      const source: any = document.getElementById('imgToChange22' + this.currImg);
      source._passiveTransform = { x: 0, y: 0 };
      this.setDeragAndDropPercent('imgToChange22', this.currImg);
    }
  }
  /*obsługa zmiany wysokości obrazka z zachowaniem proporcji*/
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
      if ((Number(this.imgWidth[this.currImg]) + Number(this.imgWidthDragAndDrop[this.currImg]))  > 101 ) {
        this.resetUserImgTransition();
      }
    }
  }
  /*służy do ustawienia proporcji obrazka
  * wywoływany za pomoca dyrektywy (load)*/
  chcekProportions() {
    if ( this.onLoadBool ) {
      console.log('check' + this.onLoadBool);
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
  getFont() {
    /*this._dataService.testMongo()
      .subscribe(tmp => {
          console.log('test' + tmp);
          console.log('test2' + tmp[0].testData);
      });*/
    this._dataService.getTemplates()
      .subscribe(tmp => {
        for (let i = 0; i < tmp[0].fonts.length; i++) {
          console.log( tmp[0].fonts[i] );
        }
      });

    /*  this.userImgBase64.push(this.imagesGeografia[n] + '.png');*/
    this._dataService.getSportImg(1)
      .subscribe(sport => {
        this.userImgBase64.push(sport);
        this.add();
      });

    /*  this.userImgBase64.push(this.imagesGeografia[n] + '.png');*/
    this._dataService.getSportImg(2)
      .subscribe(sport => {
        this.userImgBase64.push(sport);
        this.add();
      });
  }
  testDragDrop(e, id, event: CdkDragEnd) {
    /*let width = document.getElementById(e).getBoundingClientRect().left;
    this.imgLeft[id] = width;
    width = width - document.getElementById('toPdf100').getBoundingClientRect().left;
    console.log('l: ' + width);
    let height = document.getElementById(e).getBoundingClientRect().top;
    this.imgTop[id] = height;
    height = height -  document.getElementById('toPdf100').getBoundingClientRect().top;
    console.log('h: ' + height);
    document.getElementById('imgToChange' + id)
      .style.transform = 'translate3d(' + width * this.multiple + 'px, ' +  height * this.multiple + 'px, 0px)';*/
    this.setDeragAndDropPercent(e, id, event);
  }
  changeZindex() {
    let id = 'imgToChange22';
    let id2 = 'imgToChange2';
    if ( (this.landscape === 'inline-block') ) {
      id = 'imgToChange44';
      id2 = 'imgToChange4';
    }
    for (let i = 0; i < this.imgWidth.length; i++) {
      document.getElementById(id + i).style.zIndex = '25';
      document.getElementById(id2 + i).style.zIndex = '25';
    }
  }
  changeZindexDown() {
    let id = 'imgToChange22';
    let id2 = 'imgToChange2';
    if ( (this.landscape === 'inline-block') ) {
      id = 'imgToChange44';
      id2 = 'imgToChange4';
    }
    for (let i = 0; i < this.imgWidth.length; i++) {
      document.getElementById(id + i).style.zIndex = '1';
      document.getElementById(id2 + i).style.zIndex = '1';
    }
  }
  setDeragAndDropPercent(e, id, event?: CdkDragEnd) {
    this.setDragAndDropPossition(id);
    if ( event !== undefined ) {
      if ( this.dragAndDropAssumptions(event) ) {
        this.setDragAndDropPossition(id);
      }
    }
    this.currImg = id;
    this.setUserImgFrame(this.currImg);
  }
  dragEnd(event: CdkDragEnd) {
    event.source.element.nativeElement.style.transform = 'none';
    const source: any = event.source;
    source._passiveTransform = { x: 0, y: 0 };
  }
  dragAndDropAssumptions(event: CdkDragEnd) {
    let id = 'toPdf100';
    if ( this.landscape === 'inline-block' ) {
      id = 'toPdf100Landscape';
    }
    const leftDaD = event.source.element.nativeElement.getBoundingClientRect().left;
    const leftPdf100 = document.getElementById(id).getBoundingClientRect().left;
    const rightDaD = event.source.element.nativeElement.getBoundingClientRect().right;
    const rightPdf100 = document.getElementById(id).getBoundingClientRect().right;
    const topDaD = event.source.element.nativeElement.getBoundingClientRect().top;
    const topPdf100 = document.getElementById(id).getBoundingClientRect().top;
    const botDaD = event.source.element.nativeElement.getBoundingClientRect().bottom;
    const botPdf100 = document.getElementById(id).getBoundingClientRect().bottom;
    if ( ( rightDaD < leftPdf100 ) || ( leftDaD > rightPdf100 ) || ( botDaD < topPdf100 ) || (topDaD > botPdf100 ) ) {
      this.dragEnd(event);
      return true;
    } else {
      console.log('Assumptions OK');
      return false;
    }
  }
  setDragAndDropPossition(id) {
    let width = document.getElementById('imgToChange22' + id).getBoundingClientRect().left;
    if ( (this.landscape === 'inline-block') ) {
      width = document.getElementById('imgToChange44' + id).getBoundingClientRect().left;
      width = width - document.getElementById('toPdf100Landscape').getBoundingClientRect().left;
      width = (width / document.getElementById('toPdf100Landscape').getBoundingClientRect().width) * 100;
    } else {
      width = width - document.getElementById('toPdf100').getBoundingClientRect().left;
      width = (width / document.getElementById('toPdf100').getBoundingClientRect().width) * 100;
    }
    let height = document.getElementById('imgToChange22' + id).getBoundingClientRect().top;
    if ( (this.landscape === 'inline-block') ) {
      height = document.getElementById('imgToChange44' + id).getBoundingClientRect().top;
      height = height - document.getElementById('toPdf100Landscape').getBoundingClientRect().top;
      height = (height / document.getElementById('toPdf100Landscape').getBoundingClientRect().height) *  100;
    } else {
      height = height - document.getElementById('toPdf100').getBoundingClientRect().top;
      height = (height / document.getElementById('toPdf100').getBoundingClientRect().height) *  100;
    }
    console.log('w: ' + width + ', h: ' + height);
    this.imgWidthDragAndDrop[id] = width;
    this.imgHeightDragAndDrop[id] = height;
  }
}
