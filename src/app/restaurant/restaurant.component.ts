import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  //db : AngularFirestore;
  restaurantCollection : any;
  status: string;
  file: File;

  restaurantForm = this.formBuilder.group(
    {
      name: ['', Validators.required],
      pricePerPerson: ['', Validators.required],
      ratings: ['', Validators.required],
      addresses: this.formBuilder.array([
        this.formBuilder.group(
          {
            adrsLine: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
            label: ['', Validators.required]
          }
        )
      ]),
      tags: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      types: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      imageURL: ['', Validators.required],
      menu: this.formBuilder.array([]),
      isActive : [true],
    }
  );

  get tags() {
    return this.restaurantForm.get('tags') as FormArray;
  }

  get types() {
    return this.restaurantForm.get('types') as FormArray;
  }

  get addresses() {
    return this.restaurantForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.formBuilder.group(
      {
        adrsLine: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        label: ['', Validators.required]
      }
    ));
  }

  addTags() {
    this.tags.push(this.formBuilder.control(''));
  }

  addTypes() {
    this.types.push(this.formBuilder.control(''));
  }

  // Obtain reference of Firestore in the Component
  constructor(private formBuilder: FormBuilder, firestore: AngularFirestore, private storage: AngularFireStorage) { 
    //this.db = firestore;
    this.restaurantCollection = firestore.collection('restaurants-angular');
  }

  ngOnInit(): void {
    this.status = 'NA';
  }

  async onSubmit(){

    console.log("onSubmit Started");
    const filePath = `restaurant-pics/${Date.now()}_${this.file.name}`;
    console.log("File Path Data"+filePath);
    
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file);

    task.percentageChanges().subscribe(pecentage => {
      console.log(pecentage);
    });

   task.snapshotChanges().pipe(
      finalize( async () => {
        console.log("Finalize");
        const downloadURL = await fileRef.getDownloadURL().toPromise();
        this.restaurantForm.controls['imageURL'].setValue(downloadURL);
        console.log("Image Uploaded"+downloadURL);
        this.restaurantCollection.add(this.restaurantForm.value);
        this.status = "Restaurant Added Successfully :)";
      })
    ).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    );
  }

  updateFile(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  reset() {
    this.restaurantForm.reset();
  }

}
