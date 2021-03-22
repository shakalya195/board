import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

export class player {
  _id:String;
  name:String='Player';
  color:String;
  startPosition:any;
  army:any[]=[];


  constructor(color='blue'){
    this.color = color;
    if(this.color == 'blue'){
      this.army = [
        {p:'b1',step:0,icon:'assets/b.png'},
        {p:'b2',step:0,icon:'assets/b.png'},
        {p:'b3',step:0,icon:'assets/b.png'},
        {p:'b4',step:0,icon:'assets/b.png'}
      ];
    }
    if(this.color == 'red'){
      this.army = [
        {p:'r1',step:0,icon:'assets/r.png'},
        {p:'r2',step:0,icon:'assets/r.png'},
        {p:'r3',step:0,icon:'assets/r.png'},
        {p:'r4',step:0,icon:'assets/r.png'}
      ]
    }
    if(this.color == 'green'){
      this.army = [
        {p:'g1',step:0,icon:'assets/g.png'},
        {p:'g2',step:0,icon:'assets/g.png'},
        {p:'g3',step:0,icon:'assets/g.png'},
        {p:'g4',step:0,icon:'assets/g.png'}
      ];
    }
    if(this.color == 'yellow'){
      this.army = [
        {p:'y1',step:0,icon:'assets/y.png'},
        {p:'y2',step:0,icon:'assets/y.png'},
        {p:'y3',step:0,icon:'assets/y.png'},
        {p:'y4',step:0,icon:'assets/y.png'}
      ];
    }
  }

}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  blue:any={};
  red:any={};
  green:any={};
  yellow:any={};

  pixel:any;
  diceNumber:any = 0;

  chanceOrder=['blue','red','green','yellow'];
  chance='blue';

  constructor(
    public game:GameService
  ){ 

  }

  ngOnInit(): void {
    window.addEventListener("resize", this.renderBoard);
    this.renderBoard();

    ['blue','red','green','yellow'].forEach(item=>{
      this[item].name = 'Player';
      this[item].color = item;
      this[item].army = [{step:0,color:item},{step:0,color:item},{step:0,color:item},{step:0,color:item}]
      if(localStorage.getItem(item)){
        this[item] = JSON.parse(localStorage.getItem(item));
      }
      console.log(this[item]);
      this[item].army.forEach((goti,i)=>{
        if(goti.step==0){
          this.jumpToPixel(goti,goti.color+i);
        }else{
          this.jumpToPixel(goti,goti.pixel);
        }
      });
    });
  }

  jumpToPixel(goti,pixelID){
    var el = document.getElementById(pixelID);
    goti.top = el.offsetTop+'px';
    goti.left = el.offsetLeft+'px';
    localStorage.setItem(goti.color,JSON.stringify(this[goti.color]));
  }


  renderBoard(){
    var w = window.innerWidth;
    var h = window.innerHeight;
    var maxBoardSize = w;
    if(w < h){
        maxBoardSize = w;
    }else{
        maxBoardSize = h;
    }
    this.pixel = Math.floor(maxBoardSize/15);
    var pixel = this.pixel;
    console.log('maxBoardSize',maxBoardSize,'pixel',pixel);

    document.getElementById('ludo_main').style.width = pixel*15+"px";
    document.getElementById('ludo_main').style.height = pixel*15+"px";
    
    var player_board = document.getElementsByClassName('player_board') as HTMLCollectionOf<HTMLElement>;
    for(var i=0, len=player_board.length; i<len; i++)
    {
        player_board[i].style["width"] = pixel*6+"px";
        player_board[i].style["height"] = pixel*6+"px";
        player_board[i].style["padding"] = pixel+"px";
    }

    var column = document.getElementsByClassName('column') as HTMLCollectionOf<HTMLElement>;
    for(var i=0, len=column.length; i<len; i++)
    {
        column[i].style["width"] = pixel+"px";
        column[i].style["height"] = pixel+"px";
    }
    
    var ludotops = document.getElementsByClassName('ludotops') as HTMLCollectionOf<HTMLElement>;
    for(var i=0, len=ludotops.length; i<len; i++)
    {
        ludotops[i].style["flex"] = "0 0 "+pixel*3+"px";
        ludotops[i].style["flex"] = "0 0 "+pixel*3+"px";
    }

    var ludomids = document.getElementsByClassName('ludomids') as HTMLCollectionOf<HTMLElement>;
    for(var i=0, len=ludomids.length; i<len; i++)
    {
        ludomids[i].style["flex"] = "0 0 "+pixel*6+"px";
        ludomids[i].style["flex"] = "0 0 "+pixel*6+"px";
    }

    var bgcircle = document.getElementsByClassName('bgcircle') as HTMLCollectionOf<HTMLElement>;
    for(var i=0, len=bgcircle.length; i<len; i++)
    {
        bgcircle[i].style["width"] = pixel+"px";
        bgcircle[i].style["height"] = pixel+"px";
    }

    var player_board_white = document.getElementsByClassName('player_board_white') as HTMLCollectionOf<HTMLElement>;
    for(var i=0, len=player_board_white.length; i<len; i++)
    {
        player_board_white[i].style["padding"] = pixel+"px";
    }

    document.getElementById('EndSteps').style.width = pixel*3+"px";
    document.getElementById('EndSteps').style.height = pixel*3+"px";

    document.getElementById('die').style.width = pixel*3+"px";
    document.getElementById('die').style.height = pixel*3+"px";
    document.getElementById('die').style.top = pixel*6+"px";
    document.getElementById('die').style.left = pixel*6+"px";
  }

  move(goti){
    if(!this.canMove(goti)){
      console.log('NOT YOUR CHANCE');
      return false;
    }
    let t = 0;
    for(let i=0;i<this.diceNumber;i++){
      setTimeout(()=>{
        this.moveOne(goti,1);
      },t);
      t=t+500;
    }
    if(this.diceNumber < 6){
      this.nextChance();
    }
    this.diceNumber = 0;
  }

  moveOne(goti,step=1){
    // console.log(goti);
    goti.step = parseInt(goti.step)+ step;
    // console.log(goti);
    // var field = goti.step < 52? 't':goti.color;

    if(goti.color == 'blue'){
      var position = goti.step < 52 ? 't'+goti.step : goti.color+goti.step;
    }
    if(goti.color == 'red'){
      var pointer = parseInt(goti.step+13);
      if(pointer > 52){
        pointer = pointer - 52;
      }
      var position = goti.step < 52 ? 't'+pointer : goti.color+goti.step;
    }
    if(goti.color == 'green'){
      var pointer = parseInt(goti.step+26);
      if(pointer > 52){
        pointer = pointer - 52;
      }
      var position = goti.step < 52 ? 't'+pointer : goti.color+goti.step;
    }
    if(goti.color == 'yellow'){
      var pointer = parseInt(goti.step+39);
      if(pointer > 52){
        pointer = pointer - 52;
      }
      var position = goti.step < 52 ? 't'+pointer : goti.color+goti.step;
    }
     // 't52' to blue53
    var pixelID = position;
    goti.pixel = pixelID;

    // console.log(goti,this.diceNumber,'pixelID',pixelID)
    this.jumpToPixel(goti,pixelID);
  }

  nextChance(){
    let index = this.chanceOrder.findIndex(item=>item== this.chance);
    let nextIndex = index+1;
    if(nextIndex == 4){
      nextIndex=0;
    }
    console.log(this.chance,index,nextIndex)
    this.chance = this.chanceOrder[nextIndex];
    // console.log(index);
  }
  
  randomNumber(items=[1,2,3,4,5,6]){
    return items[Math.floor(Math.random()*items.length)]
  }

  rollTheDice(){
    let die = document.getElementById('die')
    this.toggleClasses(die);
    this.diceNumber = this.randomNumber();
    die.dataset.roll = this.diceNumber;
  }

  toggleClasses(die){
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  canMove(goti){
    return this.diceNumber > 0 && goti.color == this.chance;
  }

}
