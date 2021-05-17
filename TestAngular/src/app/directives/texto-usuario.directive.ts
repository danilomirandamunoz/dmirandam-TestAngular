import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTextoUsuario]'
})
export class TextoUsuarioDirective {

  @Input("type") inputType: string;

  isNumeric: boolean = true;
  str: string = "";
  arr: any = [];  

  constructor(

  ) {
    console.log('Hello IonicKeyboardInputHandler Directive');
  }


  @HostListener('keypress', ['$event']) onInputStart(e) {   

    const pattern = /[a-zA-z0-9_]/;
    let inputChar = String.fromCharCode(e.charCode);

    if (!pattern.test(inputChar)) {
      return false;
    }
    return true;
  }

}
