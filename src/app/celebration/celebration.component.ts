import { Component, OnInit } from '@angular/core';

declare let createFirework;
@Component({
  selector: 'app-celebration',
  templateUrl: './celebration.component.html',
  styleUrls: ['./celebration.component.css']
})
export class CelebrationComponent implements OnInit {

  max_fireworks = 5;
  max_sparks = 50;
  fireworks = [];
  canvas:any;
  context:any;

  constructor() { }

  ngOnInit(){
    setTimeout(()=>{
      this.displayFireworks();
    },1000)

  }

  displayFireworks() {
    createFirework(25,187,7,1,null,null,null,null,false,true);
    setTimeout(()=>{
      this.displayFireworks()
    },200);
  }

}
