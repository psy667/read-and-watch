import { Injectable } from '@angular/core';
import {
  AddBookGQL,
  BookFullFragmentFragment,
  BookInput,
  BookListFragmentFragment,
  GetBookGQL,
  GetBooksGQL
} from "@src/types.generated";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
      protected addBookGQL: AddBookGQL,
      protected getBookGQL: GetBookGQL,
      protected getBooksGQL: GetBooksGQL,
  ) { }

  public getBooksList(): Observable<BookListFragmentFragment[]> {
    return this.getBooksGQL.watch().valueChanges;
  }

  public getBook(id: string): Observable<BookFullFragmentFragment> {
    return this.getBookGQL.watch({bookID: id}).valueChanges;
  }

  public createBook(bookInput: BookInput): Observable<BookFullFragmentFragment> {
    return this.addBookGQL.mutate({input: bookInput});
  }
}
