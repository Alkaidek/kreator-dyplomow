import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.sass']
})
export class LandscapeComponent implements OnInit {
  images = [];
  constructor(private db: AngularFireDatabase ) {
    /*db.list('/base64').valueChanges().subscribe(bcgTemp => {
     this.images[0] = bcgTemp;
   });*/
  }

  ngOnInit() {
  }
}
