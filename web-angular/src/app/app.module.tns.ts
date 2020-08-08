import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { ItemComponent } from '@src/app/components/item/item.component';
import { ListComponent } from '@src/app/pages/list/list.component';
import {CommonModule} from "@angular/common";
import { BookItemComponent } from '@src/app/components/book-item/book-item.component';
import { BooksPageComponent } from '@src/app/pages/books-page/books-page.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemComponent,
    ListComponent,
    BookItemComponent,
    BooksPageComponent,
  ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        CommonModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
