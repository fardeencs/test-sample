import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
 private BASE_URL = 'http://localhost:3600/';
constructor(private http: HttpClient) { }

 Get(url: string): Observable<any>{
   const _url = this.BASE_URL + url;
    return this.http.get(_url);
 }

 Post(url: string, body: {}): Observable<any>{
  const _url = this.BASE_URL + url;
   return this.http.post(_url, body);
}

}
