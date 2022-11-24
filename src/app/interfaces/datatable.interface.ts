export interface DataTable {
  columns: Column[];
  actions?: Actions;
  headerActions?: Header;
  table?: Table;
  data?: any;
}

export interface Actions {
  title: Title;
  verticalMenu?: VerticalMenu;
  events: Event[];
}

export interface Table {
  fullWidth?: boolean;
}

export interface Event {
  icon: string;
  title: string;
  datalabel?: string;
  disabled(rowData: any): boolean;
  onClick(rowData: any): void;
  justifyEnd?: boolean;
}

export interface Title {
  hidden: boolean;
  text?: string;
}

export interface VerticalMenu {
  hidden: boolean;
  icon: string;
}

export interface Column {
  title: string;
  field: string;
  mobile: Mobile;
  format?(rowData: any, value: any): any;
  renderComponent?: RenderComponent;
  cellStyle?(rowData: any, value: any): any;
}

export interface Mobile {
  hidden: boolean;
  order?: number;
  dataLabel?: string;
  fullrow?: boolean;
}
export interface RenderComponent {
  component: any;
  inputs?(rowData: any): any;
  outputs?(rowData: any): any;
}

export interface Header {
  search: Search;
  download: Download;
  actions?: HeaderActions[];
}

export interface Search {
  hidden: boolean;
  placeholder: string;
}
export interface Filter {
  hidden: boolean;
  component?: any;
  data?: any;
  inputs?: any;
}
export interface Download {
  hidden: boolean;
}
export interface HeaderActions {
  icon?: string;
  color: string;
  title: string;
  style?(): void;
  onClick(): void;
  mobile?: MobileHeaderAction;
  renderComponent?: RenderComponent;
}

export interface MobileHeaderAction {
  fullWidth: boolean;
}
