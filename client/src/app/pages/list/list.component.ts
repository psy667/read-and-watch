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
  ngOnInit() {
  }
}
