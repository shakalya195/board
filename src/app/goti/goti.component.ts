import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-goti',
  templateUrl: './goti.component.html',
  styleUrls: ['./goti.component.css']
})
export class GotiComponent implements OnInit {

  @Input() player:any;
  @Input() goti:any;
  @Input() step:any = 0;
  @Input() pixel:any = 0;
  @Input() index:any = 0;

  icon:any;

  constructor() { 
  }

  ngOnInit(): void {
    console.log(this.player,this.goti,this.index);
    // console.log('goti',this.goti);
    this.icon = `assets/${this.goti.color}.png`;

  }


}
