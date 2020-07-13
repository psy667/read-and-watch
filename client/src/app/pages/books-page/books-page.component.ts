import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BookFullFragmentFragment, BookListFragmentFragment} from '@src/types.generated';
import {BooksService} from '@src/app/services/books.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {
  books$: Observable<BookListFragmentFragment[]>;
  currentBook$: Observable<BookFullFragmentFragment>;

  constructor(
      protected booksService: BooksService
  ) { }

  ngOnInit() {
    this.books$ = this.booksService.getBooksList();
  }
  openBookItem(id) {
    this.currentBook$ = this.booksService.getBook(id);
  }

  createBook(title) {
    this.currentBook$ = this.booksService.createBook({title});
  }
}
