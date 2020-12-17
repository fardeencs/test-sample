import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseComponent } from './common/base/base.component';
import { ActionTypes } from './common/enumrations';
import { HelperUtil } from './helper.util';
import { IEmployee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('dataForm', { static: true }) dataForm: NgForm;
  title = 'employee-ui';
  employee: any = {};
  userList$: Observable<Array<any>>;
  type = ActionTypes.ADD;
  actionType = ActionTypes;
  saveSubs : Subscription;

  constructor(private fb: FormBuilder,
    private dataService: EmployeeService) {
    super();
    this.validationMessage = HelperUtil.setValidations();
  }

  ngOnInit(): void {
    this.dataForm.form = HelperUtil.setValidationsRule(this.fb)
    this.valueChanges(this.dataForm.form);
    this.getUsers();
  }
  
  ngOnDestroy(): void {
    if(this.saveSubs)
      this.saveSubs.unsubscribe();
  }

  private getUsers() {
    this.userList$ = this.dataService.getData();
  }

  private clearForm(): void{
    this.employee={
      name: null,
      jobTitle: null,
    };
  }

  private save(data) {
   this.saveSubs = this.dataService.save(data).subscribe(result => {
     this.clearForm();
      alert('Data saved');
      this.getUsers();
    });
  }

  private delete(id) {
    this.dataService.delete(id).subscribe(result => {
      alert('Data deleted');
      this.getUsers();
    });
  }

  private edit(data: IEmployee) {
    this.employee = {
      name: data.name,
      jobTitle: data.jobTitle,
      id: data._id
    };
    this.markAllAsTouched(this.dataForm.form);
    this.type = this.actionType.EDIT;

  }

  private update(data: IEmployee) {
    this.dataService.edit(data).subscribe(result => {
      alert('Data updated');
      this.getUsers();
    });
  }

  actions = {
    changeActionType : (type: ActionTypes)=>{
      this.clearForm();
       this.type = type;

    },
    onSubmit: (formData) => {
      const data = {
        name: this.employee.name,
        jobTitle: this.employee.jobTitle,
        id: this.employee.id
      };
      console.log('formData', formData);
      if (this.type === this.actionType.EDIT) {
        this.update(data);
      } else {
        this.save(data)
      }
    },
    onRowSelect: eventData => {
      const { type, data } = eventData;
      switch (type) {
        case ActionTypes.DELETE:
          this.delete(data);
          break;
        case ActionTypes.EDIT:
          this.edit(data);
          break
        default:
          break;
      }
    }

  }
}
