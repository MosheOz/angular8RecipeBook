import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent }
        ])]
})
export class AuthModule { }