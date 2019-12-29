import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty Shnitzel - Just awesome!',
    //         'https://upload.wikimedia.org/wikipedia/commons/c/cf/Shnizel.JPG'
    //         , [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]),
    //     new Recipe(
    //         'Big Fat Burger',
    //         'What else You need to say?',
    //         'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg'
    //         , [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) { 
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getrecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToSoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
