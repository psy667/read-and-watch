import { Component, OnInit } from '@angular/core';
import {BookFullFragmentFragment, BookListFragmentFragment} from '@src/types.generated';
import {BooksService} from '@src/app/services/books.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
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
