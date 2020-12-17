import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_URL } from '../common/constant/app.url';
import { IEmployee } from '../models/employee.model';
import { BaseService } from './base.service';

@Injectable()
export class EmployeeService {


constructor(private baseService: BaseService) { }

  
  getData() : Observable<Array<any>>{
   return this.baseService.Get(APP_URL.LIST);
  }

  save(data: IEmployee): Observable<any>{
    return this.baseService.Post(APP_URL.SAVE, data);
  }

  edit(data: IEmployee):Observable<any>{
    return this.baseService.Post(APP_URL.EDIT, data);
  }

  delete(id: string):Observable<any>{
    return this.baseService.Post(APP_URL.DELETE, {id});
  }

}
