import { Component, OnInit } from '@angular/core';
import { appComponentStrings } from 'src/app/allText.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  disp = false;
  appComponentStrings = appComponentStrings;
  /*zmienic przed wypuszczeniem!! na inline-block*/
  err = 'none';
  /*zmienic przed wypuszczeniem!! na none*/
  auth = 'block';
  templateTypeDisplay = false;
  setTypeDisplay = 'block';
  ngOnInit() {
    const value = '; ' + document.cookie;
    console.log (document.referrer);
    const stateObj = { foo: 'kreator Dyplomów' };
    history.pushState(stateObj, '', 'dyplomy-test.mac.pl');
    /*ODBLOKOWAĆ PRZED WYPUSZCZENIEM !!! sprawdzanie odwołania!!!*/
    if ((value.search('mac-cookie') !== -1) /*&& (document.referrer.search('mac') !== -1)*/) {
      this.auth = 'block';
      this.err = 'none';
    }
  }
  setType(displayBlank, displayTemplate) {
    this.disp = displayBlank;
    this.templateTypeDisplay = displayTemplate;
    document.getElementById('setType').style.opacity = '0';
    setTimeout(() => {
      this.setTypeDisplay = 'none';
    }, 600);
  }
}
