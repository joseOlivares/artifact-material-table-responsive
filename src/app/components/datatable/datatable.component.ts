import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTable } from '../../interfaces/datatable.interface';
import { MatPaginatorTranslate } from './paginator-translate';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorTranslate }],
})
export class DatatableComponent implements OnInit {


  @Input() dataTableConfig?: DataTable;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() { }

  ngOnInit(): void {
    this.getColumns();
    this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData(): void {
    this.dataSource.data = this.dataTableConfig?.data;
  }

  getColumns(): void {
    let columns =
      this.dataTableConfig?.columns.map((column: any) => column?.field) || [];
    if (this.dataTableConfig?.actions) {
      columns = [...columns, 'actions'];
    }
    this.displayedColumns = columns;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  trackByEvents(index: number, event: any) {
    return index;
  }


}
