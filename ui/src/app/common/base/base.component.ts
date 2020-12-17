import { FormGroup } from '@angular/forms';
import { delay, distinctUntilChanged } from 'rxjs/operators';




export abstract class BaseComponent {

  fomErrors: any;
  validationMessage: any;
  constructor() {
    this.fomErrors = {};
    this.validationMessage = {};
  }


  valueChanges(formGroup: FormGroup): void {
    formGroup.valueChanges.
      pipe(
        delay(300),
        distinctUntilChanged()
      ).subscribe((result) => {
        this.validationErrors(formGroup)
      })
  }

  validationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const absCtrl = formGroup.get(key);
      if (absCtrl instanceof FormGroup) {
        this.validationErrors(absCtrl);
      } else {
        this.fomErrors[key] = '';
        if (absCtrl && !absCtrl.valid && (absCtrl.touched || absCtrl.dirty)) {
          const msg = this.validationMessage[key];
          for (let errKey in absCtrl.errors) {
            if (errKey) {
              this.fomErrors[key] += msg[errKey] + '';

            }
          }
        }
      }
    })
  }

  markAllAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const absCtrl = formGroup.get(key);
      if (absCtrl) {
        absCtrl.markAsTouched();
      }
    });
  }

}
