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
      this[item].army.forEach((item,i)=>{
        if(item.step==0){
          this.jumpToPixel(item,item.color+i);
        }
      });
    });



// setTimeout(()=>{
  // this.blue.army.forEach(item=>{
  //   item.el = document.createElement('img');
  //   var attr = document.createAttribute("src");
  //   attr.value = item.icon;  
  //   item.el.setAttributeNode(attr);
  //   item.el.style['position']='absolute';
  //   item.el.className = 'goti';
  //   document.getElementById('ludo_main').appendChild(item.el);
  //   this.jupToPositionID(item.el,item.p);
  // });
// },5000);

  }

  jumpToPixel(goti,pixelID){
    var el = document.getElementById(pixelID);
    goti.top = el.offsetTop+'px';
    goti.left = el.offsetLeft+'px';
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
  }
}
