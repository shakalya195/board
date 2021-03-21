import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  blue:any;
  red:any;
  green:any;
  yellow:any;

  constructor(
    private user:UserService
  ) {
    this.blue = user;
    this.red = user;
    this.green = user;
    this.yellow = user;
  }
  
  join(options){
    for (let key in options) {
      this.blue[key] = options['key'];
    }
  }

}
