import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { ItemComponent } from '@src/app/components/item/item.component';
import { ListComponent } from '@src/app/pages/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
