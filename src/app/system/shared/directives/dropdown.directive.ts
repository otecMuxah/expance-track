import {Directive, HostBinding, HostListener} from '@angular/core';
import {createHostListener} from '@angular/compiler/src/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
   @HostBinding('class.open') isOpen = false;

   @HostListener('click') onClick () {
      this.isOpen = !this.isOpen;
   }
}
