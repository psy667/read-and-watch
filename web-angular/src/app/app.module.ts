import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { ListComponent } from '@src/app/pages/list/list.component';
import { BookItemComponent } from '@src/app/components/book-item/book-item.component';
import { BooksPageComponent } from '@src/app/pages/books-page/books-page.component';
import {GraphQLModule} from '@src/app/graphql/graphql.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    BookItemComponent,
    BooksPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
