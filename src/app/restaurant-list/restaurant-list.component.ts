import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  restaurants : Observable<any[]>;

  constructor(firestore: AngularFirestore) { 
    this.restaurants = firestore.collection('restaurants-angular').valueChanges();
  }

  ngOnInit() {
  }

}
