import { type FirstDataRenderedEvent, type GridOptions } from "ag-grid-community";
export declare class Table {
    gridOptions: GridOptions;
    cols: any[] | string;
    rows: any[] | string;
    columnDefs: any[];
    rowData: any[];
    rowHeight: string;
    tableHeight: string;
    variant: string;
    uniqueKey: string;
    host: HTMLElement;
    private container;
    private gridApi;
    private gridInitialized;
    componentWillLoad(): void;
    setGridOptions(): void;
    setColsAndRows(): void;
    getRowData(): any[];
    getColData(): any[];
    onFirstDataRendered(params: FirstDataRenderedEvent): void;
    componentWillUpdate(): void;
    componentDidLoad(): Promise<void>;
    getClassNames(): string;
    getTableStyle(): {
        height: string;
    } | {
        height?: undefined;
    };
    render(): any;
}
