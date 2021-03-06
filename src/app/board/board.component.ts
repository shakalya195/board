import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
declare let createFirework:any;

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
  winnerPlace = 1;

  chanceOrder=['blue','red','green','yellow'];
  chance='blue';
  safeZone = ['t1','t9','t14','t22','t27','t35','t40','t48'];
  moving:boolean=false;
  toggle:boolean=false;
  celebrate:boolean = false;

  constructor(
    public game:GameService
  ){ 

  }

  ngOnInit(): void {
    window.addEventListener("resize", this.renderBoard);
    window.addEventListener("resize", this.rendarGotis);
    this.renderBoard();
    this.rendarGotis();
    if(localStorage.getItem('chance')){
      this.chance = localStorage.getItem('chance');
    }

    // var hsla = 0;
    // var bg = document.getElementById('EndSteps');
    // setInterval(()=>{
    //   hsla = hsla+1;
    //   bg.style.backgroundColor = `hsla(${hsla},90%, 20%, 1)`;
    // },10);

  }

  rendarGotis(){
    console.log('rendarGotis');
    ['blue','red','green','yellow'].forEach(item=>{
      this[item].name = 'Player';
      this[item].color = item;
      this[item].army = [
        {step:0,color:item,start:item+'0'},
        {step:0,color:item,start:item+'1'},
        {step:0,color:item,start:item+'2'},
        {step:0,color:item,start:item+'3'}
      ];
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

    setTimeout(()=>{
      var gotis = document.getElementsByClassName('goti') as HTMLCollectionOf<HTMLElement>;
      for(var i=0, len=gotis.length; i<len; i++)
      {
        gotis[i].style["width"] = pixel+"px";
        gotis[i].style["height"] = pixel+"px";
      }
    },1000)
  }

  move(goti){
    this.moving = true;
    if(!this.canMove(goti)){
      console.log('NOT YOUR CHANCE');
      return false;
    }
    if(goti.step == 0 && this.diceNumber == 6){
      this.moveOne(goti,1);
      this.diceNumber = 0;
      this.moving = false;
      return;
    }
    let t = 0;
    for(let i=0;i<this.diceNumber;i++){
      setTimeout(()=>{
        this.moveOne(goti,1);
        if(i==this.diceNumber-1){// if last step
          this.lastStepOfMove(goti)
        }
      },t);
      t=t+500;
    }
  }

  lastStepOfMove(goti){
    console.log('lastStepOfMove',goti);
    let killChance = false;
    if(this.safeZone.includes(goti.pixel)){
      // SafeZone
    }else{
      // War Zone
      var otherPlayers = this.chanceOrder.filter(color=> color!= this.chance);
      var allOtherGotis = [...this[otherPlayers[0]]['army'],...this[otherPlayers[1]]['army'],...this[otherPlayers[2]]['army']]
      console.log('allOtherGotis',allOtherGotis);
      var gotiOnWarZone = allOtherGotis.find(item=>{
        return item.pixel == goti.pixel
      });
      if(gotiOnWarZone){
        console.log('gotiOnWarZone',gotiOnWarZone);
        gotiOnWarZone.step = 0;
        this.jumpToPixel(gotiOnWarZone,gotiOnWarZone.start);
        killChance = true;
      }
    }

    if(this.diceNumber == 6 // if you got a 6
      || killChance == true // if you killed other goti
      || goti.step==57 // if you reach finish
      ){
      // Chance will be same.
    }else{
      // Chance is gone. Switching to next player in loop
      this.nextChance();
    }

    if(goti.step==57){ 
      // if Goti goes to WIN
      if(this[this.chance]['army'].filter(item=>item.step==57).length == 4){
        // if all goti WINNER
        this.displayFireworks();
        setTimeout(()=>{
          this.stopFireworks();
          this[this.chance]['winner'] = this.winnerPlace;
          this.winnerPlace++;
          this.nextChance();
        },5000);

      }
    }

    this.diceNumber = 0;
    this.moving = false;
  }

  moveOne(goti,step=1){

    goti.step = parseInt(goti.step)+ step;

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
    if(goti.step == 57){
      position = 'finish';
    }
    var pixelID = position;
    goti.pixel = pixelID;

    // console.log(goti,this.diceNumber,'pixelID',pixelID);
    this.jumpToPixel(goti,pixelID);
  }

  nextChance(){
    let index = this.chanceOrder.findIndex(item=>item== this.chance);
    let nextIndex = index+1;
    if(nextIndex == 4){
      nextIndex=0;
    }
    console.log(this.chance,index,nextIndex,this.chanceOrder[nextIndex])
    this.chance = this.chanceOrder[nextIndex];
    localStorage.setItem('chance',this.chance);
    // console.log(index);
    if(this[this.chance]['winner'] > 0){
      this.nextChance();
    }
  }
  
  randomNumber(items=[1,2,3,4,5,6]){
    return items[Math.floor(Math.random()*items.length)]
  }

  waitRollTheDice = false;
  rollTheDice(){
    if(this.waitRollTheDice){
      console.log('WAIT');
      return false;
    }
    this.waitRollTheDice = true;
    setTimeout(()=>{
      this.waitRollTheDice = false;
    },2500);

    if(this.diceNumber > 0){
      return false;
    }
    let die = document.getElementById('die')
    this.toggleClasses(die);
    this.diceNumber = this.randomNumber();
    die.dataset.roll = this.diceNumber;
    console.log('rollTheDice',this.chance,this[this.chance]);


    if(!this.canMove(this[this.chance].army[0]) 
      && !this.canMove(this[this.chance].army[1])
      && !this.canMove(this[this.chance].army[2])
      && !this.canMove(this[this.chance].army[3])
      ){
        this.diceNumber = 0;
        setTimeout(()=>{
          this.nextChance();
        },3000) 
    }
   
  }

  toggleClasses(die){
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  canMove(goti){
    // console.log('canmove',goti);
    if(goti.step==0 && this.diceNumber < 6){
      return false;
    }
    if( (57- goti.step) < this.diceNumber){
      return false;
    }
    return this.diceNumber > 0 && goti.color == this.chance ;
  }


  startNewGame(){
    this.toggle = !this.toggle;
    localStorage.clear();
    this.renderBoard();
    this.rendarGotis();
  }

  firework(){
    createFirework(25,187,7,1,null,null,null,null,false,true);
  }

  timer:any;
  displayFireworks() {
    createFirework(25,187,7,1,null,null,null,null,false,true);
    this.timer = setTimeout(()=>{
      this.displayFireworks()
    },200);
  }

  stopFireworks() {
    clearTimeout(this.timer);
  }
  
}
