import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { ListComponent } from '@src/app/pages/list/list.component';
import { BookItemComponent } from '@src/app/components/book-item/book-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    BookItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
