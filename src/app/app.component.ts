import { Component, OnInit } from '@angular/core';
import {DUMMY_DATA} from './services/mock-data'; //Nuestra data de prueba
import { DataTable } from './interfaces/datatable.interface';//Interfaces que utiliza el datatable
import { TextComponent } from './components/text/text.component'; //componente adicional
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataSource=DUMMY_DATA;
  datatable?:DataTable;

  constructor(private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.datatable=this.getDataTable(); //Datatable configuration
  }

  //Esta es la data que vamos a renderizar
  //Propiedad mobile:{hidden:true}  define si la columna se va a ocultar en modo mobile <768px
  getDataTable(): DataTable {
    return {
      table: { fullWidth: false },
      columns: [
        {
          title: 'Línea',
          field: 'linea',
          mobile: { hidden: true },
          //Si habilitamos este bloque, podemos renderizar un componente externo
          renderComponent: {
            component: TextComponent,
            inputs: (rowData: any) => ({
              text: rowData?.linea,
            }),
            outputs: (rowData: any) => ({
              onClick: (text: any) => alert(`Click en linea ${text}`),
            }),
          },
        },
        {
          title: 'Cuenta',
          field: 'cuenta',
          mobile: {
            hidden: false,
            order: 2,
            dataLabel: 'Cuenta:',
            fullrow: true,
          },
        },
        {
          title: 'Beneficiario',
          field: 'beneficiario',
          mobile: { hidden: false, order: 1, fullrow: true },
        },
        { title: 'Tipo', field: 'tipo', mobile: { hidden: true } },
        { title: 'Banco', field: 'banco', mobile: { hidden: true } },
        {
          title: 'Monto',
          field: 'monto',
          mobile: { hidden: false, order: 3 },
          cellStyle: (row: any) => ({
            color: row?.monto<0 ? 'red':'#008035' //Mostrando los saldos negativos en diferente color
           }),
          format: (row: any, value: any) => {
            return this.currencyPipe.transform(
              value,
              'USD',
              'symbol-narrow',
              '1.2-2'
            );
          },
        },
        { title: 'Moneda', field: 'moneda', mobile: { hidden: true } },
      ],
      actions: {
        title: { hidden: true, text: 'Acciones' },
        verticalMenu: { hidden: false, icon: 'edit' },
        events: [
          {
            icon: 'edit',
            title: 'Editar usuario',
            disabled: (row: any) => {
              return row?.linea === 1;
            },
            onClick: (rowData: any) => {
              console.log(rowData);
            },
          },
          {
            icon: 'person',
            title: 'Detalle',
            disabled: (row: any) => false,
            onClick: (rowData: any) => {
              console.log(rowData);
            },
          },
          {
            icon: 'delete',
            title: 'Eliminar ',
            justifyEnd: true,
            disabled: (_row: any) => false,
            onClick: (_rowData: any) => {},
          },
        ],
      },
      headerActions: {
        search: { hidden: false, placeholder: 'Buscar' },
        download: { hidden: false },
        actions: [
          {
            icon: 'add',
            color: 'primary',
            title: 'Acción 1',
            mobile: { fullWidth: true },
            // style: () => ({ width: '200px' }),
            onClick: () => {
              console.log('Action1 click!');
            },
          },
          {
            icon: 'clear_all',
            color: 'primary',
            title: 'Acción 2',
            mobile: { fullWidth: true },
            onClick: () => {
              console.log('Action2 click!');
            },
          },
        ],
      },
      data: this.dataSource,
    };
  }

}
