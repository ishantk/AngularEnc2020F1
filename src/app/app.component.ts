import { Component } from '@angular/core';

export type SelectorType = 'user' | 'add-restaurant' | 'view-restaurants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  selection: SelectorType = 'user';

  appName = 'Food Delivery Web Admin';
  message = 'We Deliver in No Time';

  get showUserSelection(){
    return this.selection === 'user';
  }

  get showAddRestaurantSelection(){
    return this.selection === 'add-restaurant';
  }

  get showViewRestaurantsSelection(){
    return this.selection === 'view-restaurants';
  }

  toggleSelection(whichSelection: SelectorType){
    this.selection = whichSelection;
  }

}
