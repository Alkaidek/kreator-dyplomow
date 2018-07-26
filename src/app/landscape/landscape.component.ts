import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.sass']
})
export class LandscapeComponent implements OnInit {
  public isCollapsed =
    [
      false,
      false,
      false,
      false,
      false
    ];
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
  arrayScroll = [1, 2, 3];
  lastValue = 1;
  schoolNr = '29';
  name = 'MateuszB';
  base64Tmp = '1';
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
  marginLeft = 0;
  marginRight = 0;
  bottom = 0;
  arrayFontSize =
    [
      300,
      110,
      250,
      110,
      200
    ];
  arrayFontNameId =
    [
      'largeTxt',
      'sFor',
      'txtForWhat',
      'smallTxt',
      'left',
      'right'
    ];
  arrayFontFamili =
    [
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
      'black'
    ];
  postsWithArray = [
    {
      nameOfTemplate: '',
      paddingTop: 0,
      marginLeft: 0,
      marginRight: 0,
      bottom: 0,
      arrayFontSize:
        [
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
          'black'
        ],
      arrayFontFamili:
        [
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
  takeBcg(n, imgSrc) {
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
    document.getElementById(
      'toPdf100')
      .style
      .background = n;
    this.imgSrc = '' + (imgSrc + 1);
    this.imgSrcFix = this.bcgTemp[imgSrc];
    this.base64 = '../../assets/img/' + (imgSrc + 1 ) + '.png';
    switch ( imgSrc ) {
      case imgSrc:
        this.paddingTop = this.coordinatesTemplate[imgSrc][0];
        this.marginLeft = this.coordinatesTemplate[imgSrc][1];
        this.marginRight = this.coordinatesTemplate[imgSrc][2];
        this.bottom = this.coordinatesTemplate[imgSrc][3];
        break;
      default:
        this.paddingTop = 10;
        this.marginLeft = 5;
        this.marginRight = 5;
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
    const elementToPrint = document
      .getElementById('toPdf100');
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
  }
  setPadding() {
    document
      .getElementById('pdfFor')
      .style
      .marginLeft =  this.marginLeft + '%';
    document
      .getElementById('pdfFor')
      .style
      .marginRight = this.marginRight + '%';
    document.getElementById('sign')
      .style
      .bottom = this.bottom + 'px';
  }
  setPaddingFix() {
    document
      .getElementById('pdfForFix')
      .style
      .marginLeft =  this.marginLeft + '%';
    document
      .getElementById('pdfForFix')
      .style
      .marginRight = this.marginRight + '%';
    document
      .getElementById('signFix')
      .style
      .bottom = this.bottom + 'px';
    this.setPadding();
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
    this.postsWithArray[n]
      .nameOfTemplate = '' +   day + ' ' + monthStr + ' ' + date.getFullYear() + ' ' +  hours + ':' + min;
    this.postsWithArray[n]
      .paddingTop = this.paddingTop;
    this.postsWithArray[n]
      .marginLeft = this.marginLeft;
    this.postsWithArray[n]
      .marginRight = this.marginRight;
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
    this.arrayFontFamili[element] = font;
    if (element === 4) {
      this.takeFontForEle(font, 5);
    }
  }
  setUserData() {
    const select = document.getElementById('selectTemplate') as HTMLSelectElement;
    console.log(select.selectedIndex);
    this.paddingTop = this.template[select.selectedIndex]
      .paddingTop;
    this.marginLeft = this.template[select.selectedIndex]
      .marginLeft;
    this.marginRight = this.template[select.selectedIndex]
      .marginRight;
    this.bottom = this.template[select.selectedIndex]
      .bottom;
    this.setPaddingFix();
    this.imgSrcFix = this.bcgTemp[this.template[select.selectedIndex]
      .img];
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
}
