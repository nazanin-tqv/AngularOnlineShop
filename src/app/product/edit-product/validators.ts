import { AbstractControl } from "@angular/forms"

export function isEmpty(control: AbstractControl){
  if (control.value.length > 0) {
    return null
  }
  else return {isEmpty:true}
}