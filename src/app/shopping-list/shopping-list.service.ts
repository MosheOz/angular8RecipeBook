import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    ingredientEditted = new Subject<Ingredient[]>();
    startedEditting = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatos", 5)
    ];

    getIngridients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientEditted.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientEditted.next(this.ingredients.slice());
    }

    getInggredientByName(name: string) {
        return this.ingredients.find(item => { return item.name === name });
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientEditted.next(this.ingredients.slice());
    }
    // this fnction will be in use if the user entered name of ingredients that 
    // already in shopping basket.
    updateIngredientByName(newIngredient: Ingredient) {
        const indexInArray = this.ingredients.findIndex(item => item.name === newIngredient.name);
        this.ingredients[indexInArray].amount += newIngredient.amount;
        this.ingredientEditted.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientEditted.next(this.ingredients.slice());
    }
}