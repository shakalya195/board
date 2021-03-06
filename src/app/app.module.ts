import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GotiComponent } from './goti/goti.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CelebrationComponent } from './celebration/celebration.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GotiComponent,
    CelebrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
