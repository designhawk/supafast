import { EventEmitter } from "../../stencil-public-runtime";
import { CellPosition, type GridApi, type GridOptions } from "ag-grid-community";
export declare class Table {
    gridOptions: GridOptions;
    gridApi: GridApi;
    currentPage: number;
    cols: any;
    rows: any;
    buttonRendererOptions?: {
        onButtonClick?: (params: any, event: Event) => void;
    };
    iconButtonRendererOptions?: {
        onIconButtonClick?: (params: any, event: Event) => void;
    };
    checkboxRendererOptions?: {
        onCheckboxClick?: (params: any, event: Event) => void;
    };
    rowData: any[];
    colData: any[];
    filterOptions: {
        [key: string]: string[];
    };
    currentFilters: {};
    uniqueKey: string;
    allRowData: any[];
    rowHeight: string;
    tableHeight: string;
    pagination: boolean;
    paginationItemsPerPage: string;
    paginationPageSize: number;
    filterOrientation: string;
    headline: string;
    showSidebarFilters: boolean;
    matchingResultsCount: number;
    variant: string;
    serverSidePagination: boolean;
    serverPageChangeHandler?: (params: {
        page: number;
        pageSize: number;
    }) => Promise<{
        rows: any[];
        total: number;
    }>;
    enableSelection: boolean;
    selectedRows: Set<string>;
    selectAll: boolean;
    selectedRowsData: Map<string, any>;
    showLoading: boolean;
    fitColumns: boolean;
    columnMinWidth?: number;
    columnWidth?: string;
    ifxSortChange: EventEmitter;
    private container;
    private lastSortedColumn;
    host: HTMLElement;
    originalRowData: any[];
    private internalItemsPerPage;
    rowsChanged(_newVal: any): void;
    onSizingOptionsChanged(): void;
    colsChanged(_newVal: any): void;
    handleResultsPerPageChange(e: CustomEvent<string>): void;
    handleChipChange({ event, }: {
        event: CustomEvent<{
            previousSelection: Array<any>;
            currentSelection: Array<any>;
            name: string;
        }>;
    }): void;
    onButtonRendererOptionsChanged(): void;
    onIconButtonRendererOptionsChanged(): void;
    onCheckboxRendererOptionsChanged(): void;
    private parseArrayInput;
    toggleSidebarFilters(): void;
    applyColumnSizing(): void;
    updateFilterOptions(): void;
    private updateHeaderCheckboxState;
    handleSidebarFilterChange(event: CustomEvent): void;
    handleTopbarFilterChange(event: CustomEvent): void;
    applyAllFilters(data: any, filters: any): any;
    updateTableView(): Promise<void>;
    clearAllFilters(): void;
    onBtShowLoading(): Promise<void>;
    setPaginationItemsPerPage(): void;
    componentWillLoad(): void;
    focusCellIfContainingButton<T>(api: GridApi<T>, cellPosition: CellPosition): CellPosition | null;
    emitEventOnHeaderSortChange(): void;
    componentDidLoad(): Promise<void>;
    componentWillUnmount(): void;
    handlePageChange(event: any): Promise<void>;
    isJSONParseable(str: any): boolean;
    handleSelectAll: (checked: boolean) => void;
    getRowData(): any[];
    handleRowCheckboxClick: (params: any) => void;
    private updateCheckboxStates;
    private emitSelectionChange;
    getColData(): any[];
    handleResetButtonClick(): void;
    disconnectedCallback(): void;
    getTableClassNames(): string;
    render(): any;
    hasButtonCol(): boolean;
    onDragOver(event: any): void;
    onDrop(event: any): void;
}
