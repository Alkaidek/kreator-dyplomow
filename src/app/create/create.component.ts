import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {AngularFireDatabase} from 'angularfire2/database';


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
  public isCollapsed =
    [
      false,
      false,
      false,
      false,
      false
    ];
  bcgDisplay = ['block', 'none', 'none'];
  auth = 'block';
  bcgTemp: any;
  template: any;
  coordinatesTemplate: any;
  length: Number;
  bool = 'block';
  constructor(private db: AngularFireDatabase ) {
    db.list('/base64').valueChanges().subscribe(bcgTemp => {
      this.bcgTemp = bcgTemp;
    });
    db.list('/template/' + this.schoolNr + '' + this.name).valueChanges().subscribe(template => {
      this.template = template;
      this.template.reverse();
      console.log(this.template);
      this.length = this.template.length;
      if ( this.length === 0) {
        this.bool = 'none';
      }
    });
    db.list('/base64tmp').valueChanges().subscribe(coordinatesTemplate => {
      this.coordinatesTemplate = coordinatesTemplate;
      console.log(this.coordinatesTemplate);
    });
  }
  landscape = 'inline-block';
  currentStep = 0;
  arrayScroll = [1, 2, 3];
  bcgColor = '#c2f2cf';
  lastValue = 1;
  schoolNr = '29';
  name = 'MateuszB';
  base64Tmp = '';
  base64 = '';
  forWho = '';
  forWhat = '';
  sign1 = 'Dyrektor\n................';
  sign2 = 'Wychowawca\n.......................';
  sign3 = 'Katecheta\n  ..................';
  title = 'Dyplom';
  imgSrc = '../../assets/img/0.png';
  imgSrcFix = '../../assets/img/0.png';
  footer = 'Kielce, dnia ';
  paddingTop = 0;
  paddingTopForWho = 10;
  paddingTopForWhat = 20;
  marginLeft = [0, 0, 0, 0];
  marginRight = [0, 0, 0, 0];
  bottom = 0;
  arrayFontSize =
    [
      3,
      0.9,
      2,
      0.8,
      2
    ];
  arrayFontNameId =
    [
      'largeTxt',
      'sFor',
      'txtForWhat',
      'smallTxt',
      'left',
      'right',
      'center'
    ];
  arrayFontFamili =
    [
      'Arial',
      'Arial',
      'Arial',
      'Arial',
      'Arial',
      'Arial',
      'Arial'
    ];
  arrayFontColor =
    [
      'black',
      'black',
      'black',
      'black',
      'black',
      'black'
    ];
  postsWithArray = [
    {
      nameOfTemplate: '',
      paddingTop:
        [
        0,
        0,
        0
      ],
      marginLeft:
        [
          0,
          0,
          0,
          0
        ],
      marginRight:
        [
          0,
          0,
          0,
          0
        ],
      bottom: 0,
      bcgColor: '#c2f2cf',
      arrayFontSize:
        [
          0,
          0,
          0,
          0,
          0,
          0
        ],
      arrayFontColor:
        [
          'black',
          'black',
          'black',
          'black',
          'black',
          'black'
        ],
      arrayFontFamili:
        [
          'Arial',
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
  rotate = [0, 0, 0];
  imgWidth = [30, 20, 10];
  imgHeight = [30, 20, 10];
  imgTop = [0, 0, 0];
  imgLeft = [0, 0, 0];
  currentImg = 0;

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
    document.getElementById('scheme30').style.transform = 'scale(1,1)';
    document.getElementById('scheme30').style.border = 'rgba(87, 255, 0, 0.7) solid 3px';
  }
  takeBcg(imgSrc) {
    console.log(
      'ten sie podnosi: ' + imgSrc
    );
    console.log('a ten opada: ' + this.lastValue);
    document.getElementById(
      'bcg' + (this.lastValue + 1) )
      .style
      .transform = 'scale(0.8,0.8)';
    document.getElementById(
      'bcg' + (this.lastValue + 1) )
      .style
      .webkitTransform = 'scale(0.8,0.8)';
    document.getElementById(
      'bcg' + (this.lastValue + 1) )
      .style
      .border = 'black 1px solid';
    this.lastValue = imgSrc;
    document.getElementById(
      'bcg' + (imgSrc + 1))
      .style
      .transform = 'scale(0.99,0.99)';
    document.getElementById(
      'bcg' + (this.lastValue + 1) )
      .style
      .webkitTransform = 'scale(0.99,0.99)';
    document.getElementById(
      'bcg' + (imgSrc + 1))
      .style.border = '#3aaaff 3px solid';
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
  takeFont(n) {
    document.getElementById('toPdf100').style.fontFamily = n;
    document.getElementById('toPdf100Fix').style.fontFamily = n;

  }
  getBase64() {
    const base64 = document.getElementById('canvasToBase64') as HTMLCanvasElement;
    console.log('base64 please: ' + base64.toDataURL('image/jpeg'));
    const pic = base64.toDataURL('image/jpeg');
    this.imgSrcFix = pic;
  }
  generatePdf() {
    if (this.landscape === 'inline-block') {
      const elementToPrint = document
        .getElementById('toPdf100LandscapeFix');
      const pdf = new jsPDF('l', 'pt', 'a4', true);
      pdf
        .internal
        .scaleFactor = 1;
      pdf
        .addHTML(elementToPrint, () => {
          pdf
            .save('wygenerowany dyplom.pdf');
          pdf
            .autoPrint();
        });
    } else {
      const elementToPrint = document
        .getElementById('toPdf100Fix');
      const pdf = new jsPDF('p', 'pt', 'a4', true);
      pdf
        .internal
        .scaleFactor = 1;
      pdf
        .addHTML(elementToPrint, () => {
          pdf
            .save('wygenerowany dyplom.pdf');
          pdf
            .autoPrint();
        });
    }
  }
  setPadding() {
  }
  setPaddingFix() {
  }
  createArrayToSend(n) {
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
    this.postsWithArray[n].bcgColor = this.bcgColor;
    this.postsWithArray[n]
      .nameOfTemplate = '' +   day + ' ' + monthStr + ' ' + date.getFullYear() + ' ' +  hours + ':' + min;
    this.postsWithArray[n]
      .paddingTop[0] = this.paddingTop;
    this.postsWithArray[n]
      .paddingTop[1] = this.paddingTopForWho;
    this.postsWithArray[n]
      .paddingTop[2] = this.paddingTopForWhat;
    this.postsWithArray[n]
      .marginLeft[0] = this.marginLeft[0];
    this.postsWithArray[n]
      .marginLeft[1] = this.marginLeft[1];
    this.postsWithArray[n]
      .marginLeft[2] = this.marginLeft[2];
    this.postsWithArray[n]
      .marginLeft[3] = this.marginLeft[3];
    this.postsWithArray[n]
      .marginRight[0] = this.marginRight[0];
    this.postsWithArray[n]
      .marginRight[1] = this.marginRight[1];
    this.postsWithArray[n]
      .marginRight[2] = this.marginRight[2];
    this.postsWithArray[n]
      .marginRight[3] = this.marginRight[3];
    this.postsWithArray[n]
      .bottom = this.bottom;
    for (let i = 0; i < this.arrayFontSize.length; i++ ) {
      this.postsWithArray[n]
        .arrayFontSize[i] = this.arrayFontSize[i];
    }
    for (let i = 0; i < this.arrayFontColor.length; i++ ) {
      this.postsWithArray[n]
        .arrayFontColor[i] = this.arrayFontColor[i];
    }
    for (let i = 0; i < this.arrayFontFamili.length; i++ ) {
      this.postsWithArray[n]
        .arrayFontFamili[i] = this.arrayFontFamili[i];
    }
    this.postsWithArray[n]
      .img = this.base64Tmp;
    console
      .log(this.postsWithArray);
        setTimeout( () => {
      this.db.database
        .ref('/template')
        .child(this.schoolNr + '' + this.name)
        .child('' +   day + ' ' + monthStr + ' ' + date.getFullYear() + ' ' +  hours + ':' + min )
        .set(this.postsWithArray[0]);
      alert('Twój szoblon został zapisany! Dodano go: ' +   day + ' ' + monthStr + ' ' + date.getFullYear() + ' ' +  hours + ':' + min );
    },
          500 );
  }
  takeFontForEle(font, element) {
    document
      .getElementById(this.arrayFontNameId[element])
      .style
      .fontFamily = font;
    document
      .getElementById(this.arrayFontNameId[element] + 'Fix')
      .style
      .fontFamily = font;
    document
      .getElementById(this.arrayFontNameId[element] + 'LandscapeFix')
      .style
      .fontFamily = font;
    document
      .getElementById(this.arrayFontNameId[element] + 'Landscape')
      .style
      .fontFamily = font;
    this.arrayFontFamili[element] = font;
    if (element === 4) {
      this.takeFontForEle(font, 5);
      this.takeFontForEle(font, 6);
    }
  }
  setUserData() {
    const select = document.getElementById('selectTemplate') as HTMLSelectElement;
    console.log(select.selectedIndex);
    this.bcgColor = this.template[select.selectedIndex]
      .bcgColor;
    this.paddingTop = this.template[select.selectedIndex]
      .paddingTop[0];
    this.paddingTopForWho = this.template[select.selectedIndex]
      .paddingTop[1];
    this.paddingTopForWhat = this.template[select.selectedIndex]
      .paddingTop[2];
    this.marginLeft[0] = this.template[select.selectedIndex]
      .marginLeft[0];
    this.marginLeft[1] = this.template[select.selectedIndex]
      .marginLeft[1];
    this.marginLeft[2] = this.template[select.selectedIndex]
      .marginLeft[2];
    this.marginLeft[3] = this.template[select.selectedIndex]
      .marginLeft[3];
    this.marginRight[3] = this.template[select.selectedIndex]
      .marginRight[3];
    this.marginRight[2] = this.template[select.selectedIndex]
      .marginRight[2];
    this.marginRight[1] = this.template[select.selectedIndex]
      .marginRight[1];
    this.marginRight[0] = this.template[select.selectedIndex]
      .marginRight[0];
    this.bottom = this.template[select.selectedIndex]
      .bottom;
    this.setPaddingFix();
    if ( this.template[select.selectedIndex].img === '') {
      this.imgSrcFix =  '../../assets/img/0.png';
    } else {
      this.imgSrcFix = this.bcgTemp[this.template[select.selectedIndex]
        .img];
    }
    this.base64Tmp = this.template[select.selectedIndex].img;
    for (let i = 0; i < this.template[select.selectedIndex].arrayFontSize.length; i++ ) {
      console.log(' ' + this.template[select.selectedIndex].arrayFontSize[i]);
      this.arrayFontSize[i] = this.template[select.selectedIndex]
        .arrayFontSize[i];
    }
    for (let i = 0; i < this.template[select.selectedIndex].arrayFontColor.length; i++ ) {
      this.arrayFontColor[i] =  this.template[select.selectedIndex].arrayFontColor[i];
    }
    for (let i = 0; i < this.template[select.selectedIndex].arrayFontFamili.length; i++ ) {
      document
        .getElementById(this.arrayFontNameId[i])
        .style
        .fontFamily =  this.template[select.selectedIndex].arrayFontFamili[i];
      document
        .getElementById(this.arrayFontNameId[i] + 'Fix')
        .style
        .fontFamily =  this.template[select.selectedIndex].arrayFontFamili[i];
      document
        .getElementById(this.arrayFontNameId[i] + 'LandscapeFix')
        .style
        .fontFamily =  this.template[select.selectedIndex].arrayFontFamili[i];
      document
        .getElementById(this.arrayFontNameId[i] + 'Landscape')
        .style
        .fontFamily =  this.template[select.selectedIndex].arrayFontFamili[i];
      this.arrayFontFamili[i] = this.template[select.selectedIndex].arrayFontFamili[i];
    }
  }
  moveLeft() {
    const btn =  document
      .getElementById('rightDirect') as HTMLButtonElement;
    const btn2 =  document
      .getElementById('leftDirect') as HTMLButtonElement;
    for ( let i = 0; i < 3; i++ ) {
      if ((this.arrayScroll[i] - 3 < (this.bcgTemp.length + 1)) && ((this.arrayScroll[i] - 3 ) > 0)) {
        document
          .getElementById('bcg' + (this.arrayScroll[i] - 3))
          .style
          .display = 'inline-block';
        if ((this.arrayScroll[i] < (this.bcgTemp.length + 1)) && this.arrayScroll[i] > 0 ) {
          document
            .getElementById('bcg' + (this.arrayScroll[i]))
            .style
            .display = 'none';
        }

        btn
          .disabled = false;
      } else if ((this.arrayScroll[i] - 3 ) < 0 ) {
        btn2
          .disabled = true;
      }
      this.arrayScroll[i] = this.arrayScroll[i] - 3;
    }
    if ( this.arrayScroll[0] <= 1 ) {
      btn2
        .disabled = true;
    }
  }
  moveRight() {
    const btn =  document
      .getElementById('rightDirect') as HTMLButtonElement;
    const btn2 =  document
      .getElementById('leftDirect') as HTMLButtonElement;
    for ( let i = 0; i < 3; i++ ) {
      if ((this.arrayScroll[i] < (this.bcgTemp.length + 1)) && this.arrayScroll[i] > 0) {
        btn2
          .disabled = false;
        if ( (this.arrayScroll[i] + 3) < (this.bcgTemp.length + 1 )) {
          document.getElementById('bcg' + this.arrayScroll[i]).style.display = 'none';
          if (((this.arrayScroll[i] + 3) < (this.bcgTemp.length + 1)) && (this.arrayScroll[i] + 3) > 0) {
            document
              .getElementById('bcg' + (this.arrayScroll[i] + 3))
              .style
              .display = 'inline-block';
          }
        }
      } else if (this.arrayScroll[i] > (this.bcgTemp.length + 1)) {
        btn
          .disabled = true;
      }
      this.arrayScroll[i] = this.arrayScroll[i] + 3;
      console
        .log('hej to ja: ' + this.arrayScroll[i]);
    }
    if ( this.arrayScroll[2] >= this.bcgTemp.length ) {
      btn
        .disabled = true;
    }
  }
  showMore(n) {
    if ( this.isCollapsed[n]) {
      document.getElementById('card' + n).style.animationName = 'show';
      document.getElementById('card' + n).style.display = 'inline-block';
      this.isCollapsed[n] = false;
    } else {
      document.getElementById('card' + n).style.animationName = 'hide';
      document.getElementById('card' + n).style.display = 'none';
      document.getElementById('card' + n).style.display = 'inline-block';
      this.isCollapsed[n] = true;
    }
  }

  onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader() as any;
      console.log('1');
      reader.onload = (event2: any) => {
        console.log('2');
        const img = document.getElementById('imgToChange' + this.currentImg) as HTMLImageElement;
        const img2 = document.getElementById('imgToChange2' + this.currentImg ) as HTMLImageElement;
        const img3 = document.getElementById('imgToChange3' + this.currentImg) as HTMLImageElement;
        const img4 = document.getElementById('imgToChange4' + this.currentImg) as HTMLImageElement;
        img.src = event2.target.result;
        img2.src = event2.target.result;
        img3.src = event2.target.result;
        img4.src = event2.target.result;
        this.currentImg = this.currentImg + 1;
      }
      console.log('3');
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  set0degress() {
    this.rotate[this.currentImg - 1] = 0;
  }
  resetImg() {
    this.rotate[this.currentImg - 1] = 0;
    this.imgLeft[this.currentImg - 1] = 0;
    this.imgTop[this.currentImg - 1] = 0;
    this.imgWidth[this.currentImg - 1] = 10;
    this.imgHeight[this.currentImg - 1] = 10;
  }
  right(n) {
    const btn =  document
      .getElementById('btnLeft') as HTMLButtonElement;
    const btn2 =  document
      .getElementById('btnRight') as HTMLButtonElement;
    this.bcgDisplay[n] = 'none';
    this.bcgDisplay[n + 1] = 'block';
    this.currentStep = this.currentStep + 1;
    if (n === 0) {
      this.bool = 'none';
    }
    btn
      .disabled = false;
    if (this.currentStep === 2) {
      btn2.disabled = true;
    }
  }
  left(n) {
    const btn =  document
      .getElementById('btnLeft') as HTMLButtonElement;
    const btn2 =  document
      .getElementById('btnRight') as HTMLButtonElement;
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
  landscapeOff() {
    if (this.landscape === 'inline-block') {
      this.landscape = 'none';
    } else {
      this.landscape = 'inline-block';
      const element = document.getElementById('toPdf100Landscape');
      element.classList.remove('rotateInDownRight');
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
    }
  }
}
