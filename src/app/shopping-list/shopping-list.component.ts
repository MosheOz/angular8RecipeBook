import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subDetails: Subscription
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngridients();
    this.subDetails = this.shoppingListService.ingredientEditted
      .subscribe(
        (ingredient: Ingredient[]) => {
          this.ingredients = ingredient;
        }
      );
  }

  ngOnDestroy(): void {
    this.subDetails.unsubscribe();
  }

  onEditItem(index: number) { 
    this.shoppingListService.startedEditting.next(index);
  }
}
