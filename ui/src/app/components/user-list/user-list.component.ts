import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionTypes } from 'src/app/common/enumrations';
import { IEmployee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input('data') data: Array<IEmployee>;
  @Output('onRowClick') onRowClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  actions ={
    edit : (data: IEmployee) =>{
      const eventData ={
        type: ActionTypes.EDIT,
        data
      };
      this.onRowClick.emit(eventData);
    },
    delete: (id: string) =>{
      const eventData ={
        type: ActionTypes.DELETE,
        data: id
      };
      this.onRowClick.emit(eventData);
    }
  }

}
