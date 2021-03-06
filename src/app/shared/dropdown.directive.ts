import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isClicked: boolean = false;
    @HostListener('click') toggleOpen() {
        this.isClicked = !this.isClicked;
    }
}