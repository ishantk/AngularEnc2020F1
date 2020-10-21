import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  name = new FormControl('');

  users : Observable<any[]>;

  constructor(firestore: AngularFirestore) { 
    this.users = firestore.collection('users').valueChanges();
  }

  ngOnInit() {
  }

  updateData(){
    this.name.setValue('Searching...');
    //this.name.value; // gives the value in Form
  }

}
