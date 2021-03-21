import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class UserService {

  _id:any;
  name:'';
  color:'';
  joined:false;
  
  constructor() {

  }

}
