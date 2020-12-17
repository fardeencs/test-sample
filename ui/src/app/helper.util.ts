import { FormBuilder, FormGroup, Validators } from "@angular/forms";


export class HelperUtil {

    static setValidations(): any {
        return {
            'name': {
                'required': 'User name cannot be empty',

            },
            'jobTitle': {
                'required': 'Job title cannot be empty'
            }
        }
    }

    static setValidationsRule(fb: FormBuilder): FormGroup {
        return fb.group({
            name: [null, [Validators.required]],
            jobTitle: [null, [Validators.required]]
        });
    }
}