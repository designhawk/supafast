/* eslint-disable @stencil-community/own-methods-must-be-private */
import { Host, h } from "@stencil/core";
import { AllCommunityModule, createGrid, ModuleRegistry, } from "ag-grid-community";
import classNames from "classnames";
import { isNestedInIfxComponent } from "../../shared/utils/dom-utils";
import { detectFramework } from "../../shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
import { ButtonCellRenderer } from "./buttonCellRenderer";
import { CheckboxCellRenderer } from "./checkboxCellRenderer";
import { CheckboxHeaderRenderer } from "./checkboxHeaderRenderer";
import { CustomLoadingOverlay } from "./customLoadingOverlay";
import { CustomNoRowsOverlay } from "./customNoRowsOverlay";
import { IconButtonCellRenderer } from "./iconButtonCellRenderer";
import { LinkCellRenderer } from "./linkCellRenderer";
import { StatusCellRenderer } from "./statusCellRenderer";
import { TooltipCellRenderer } from "./tooltipCellRenderer";
export class Table {
    gridOptions;
    gridApi;
    currentPage = 1;
    cols;
    rows;
    buttonRendererOptions;
    iconButtonRendererOptions;
    checkboxRendererOptions;
    rowData = [];
    colData = [];
    filterOptions = {};
    currentFilters = {};
    uniqueKey;
    allRowData = [];
    rowHeight = "default";
    tableHeight = "auto";
    pagination = true;
    paginationItemsPerPage;
    paginationPageSize = 10;
    filterOrientation = "sidebar";
    headline = "";
    showSidebarFilters = true;
    matchingResultsCount = 0;
    variant = "default";
    serverSidePagination = false;
    serverPageChangeHandler;
    enableSelection = false;
    selectedRows = new Set();
    selectAll = false;
    selectedRowsData = new Map();
    showLoading = false;
    fitColumns = false;
    columnMinWidth;
    columnWidth;
    ifxSortChange;
    container;
    lastSortedColumn = null;
    host;
    originalRowData = [];
    internalItemsPerPage = JSON.stringify([
        { value: 10, label: "10", selected: true },
        { value: 20, label: "20", selected: false },
        { value: 30, label: "30", selected: false },
    ]);
    rowsChanged(_newVal) {
        const parsed = this.parseArrayInput(this.rows);
        parsed.forEach((row, index) => {
            if (!row.__rowId) {
                row.__rowId = `row_${index}_${Date.now()}_${Math.random()}`;
            }
        });
        if (this.enableSelection) {
            parsed.forEach((row) => {
                row.__checkbox = {
                    disabled: false,
                    checked: this.selectedRows?.has(row.__rowId) || false,
                    size: "s",
                    indeterminate: false,
                    error: false,
                };
            });
        }
        this.currentFilters = {};
        this.currentPage = 1;
        this.originalRowData = [...parsed];
        this.allRowData = [...parsed];
        this.matchingResultsCount = this.allRowData.length;
        this.updateTableView();
        this.updateFilterOptions();
    }
    onSizingOptionsChanged() {
        this.applyColumnSizing();
    }
    colsChanged(_newVal) {
        this.colData = this.getColData();
        if (this.gridApi) {
            this.gridApi.setGridOption("columnDefs", this.colData);
        }
        this.updateFilterOptions();
    }
    handleResultsPerPageChange(e) {
        this.paginationPageSize = Number(e.detail);
        this.currentPage = 1;
        this.updateTableView();
    }
    handleChipChange({ event, }) {
        const { name, currentSelection, previousSelection } = event.detail;
        if (currentSelection && previousSelection) {
            // Clone the current filters state
            const updatedFilters = { ...this.currentFilters };
            if (currentSelection.length === 0) {
                // If there are no selections for this filter, delete the filter
                delete updatedFilters[name];
                // Emit event with specific filter name
                const customEvent = new CustomEvent("ifxUpdateSidebarFilter", {
                    detail: { filterName: name },
                    bubbles: true,
                    composed: true,
                });
                this.host.dispatchEvent(customEvent);
            }
            else {
                // Otherwise, update the filter values with the current selection
                updatedFilters[name].filterValues = currentSelection.map((selection) => selection.value);
            }
            // Update the component's filters
            this.currentFilters = updatedFilters;
            // Ensure table data is updated
            this.allRowData = this.applyAllFilters(this.originalRowData, this.currentFilters);
            this.updateTableView();
        }
    }
    onButtonRendererOptionsChanged() {
        this.colData = this.getColData();
        if (this.gridApi) {
            this.gridApi.setGridOption("columnDefs", this.colData);
        }
    }
    onIconButtonRendererOptionsChanged() {
        this.colData = this.getColData();
        if (this.gridApi) {
            this.gridApi.setGridOption("columnDefs", this.colData);
        }
    }
    onCheckboxRendererOptionsChanged() {
        this.colData = this.getColData();
        if (this.gridApi) {
            this.gridApi.setGridOption("columnDefs", this.colData);
        }
    }
    parseArrayInput(input) {
        if (typeof input === "string") {
            try {
                const parsed = JSON.parse(input);
                return Array.isArray(parsed) ? parsed : [];
            }
            catch {
                console.error("Failed to parse input:", input);
                return [];
            }
        }
        if (Array.isArray(input))
            return input;
        if (typeof input === "object" && input !== null)
            return [input];
        return [];
    }
    toggleSidebarFilters() {
        this.showSidebarFilters = !this.showSidebarFilters;
    }
    applyColumnSizing() {
        if (!this.gridApi)
            return;
        if (this.fitColumns) {
            this.gridApi.sizeColumnsToFit({
                defaultMinWidth: this.columnMinWidth,
            });
        }
    }
    updateFilterOptions() {
        const options = {};
        for (let col of this.colData) {
            options[col.field] = [
                ...new Set(this.rowData.map((row) => row[col.field])),
            ];
        }
        this.filterOptions = options;
    }
    updateHeaderCheckboxState() {
        if (this.gridApi && this.enableSelection) {
            setTimeout(() => {
                const headerCheckbox = this.container?.querySelector('.ag-header-cell[col-id="__checkbox"] ifx-checkbox');
                if (headerCheckbox) {
                    if (this.serverSidePagination) {
                        const currentPageSelectedCount = this.rowData.filter((row) => this.selectedRows.has(row.__rowId)).length;
                        const allOnPageSelected = currentPageSelectedCount === this.rowData.length &&
                            this.rowData.length > 0;
                        const someOnPageSelected = currentPageSelectedCount > 0 &&
                            currentPageSelectedCount < this.rowData.length;
                        headerCheckbox.checked = allOnPageSelected;
                        headerCheckbox.indeterminate = someOnPageSelected;
                    }
                    else {
                        const allSelected = this.selectedRows.size === this.allRowData.length &&
                            this.allRowData.length > 0;
                        const someSelected = this.selectedRows.size > 0 &&
                            this.selectedRows.size < this.allRowData.length;
                        headerCheckbox.checked = allSelected;
                        headerCheckbox.indeterminate = someSelected;
                    }
                }
            }, 0);
        }
    }
    handleSidebarFilterChange(event) {
        const filterGroups = event.detail;
        const updatedFilters = {};
        filterGroups.forEach((filterGroup) => {
            const filterName = filterGroup.filterGroupName;
            let filterValues;
            let type;
            if (filterGroup.selectedItems && filterGroup.selectedItems.length > 0) {
                filterValues = filterGroup.selectedItems.map((item) => item.label);
                type = "multi-select";
            }
            else if (filterGroup.value) {
                filterValues = [filterGroup.value];
                type = "text";
            }
            else {
                filterValues = [];
            }
            if (!(filterValues.length === 0 ||
                (filterValues.length === 1 &&
                    type === "text" &&
                    filterValues[0] === ""))) {
                updatedFilters[filterName] = { filterValues, type };
            }
        });
        this.allRowData = this.applyAllFilters(this.originalRowData, updatedFilters);
        this.updateTableView();
        this.currentFilters = updatedFilters;
    }
    handleTopbarFilterChange(event) {
        const filters = event.detail;
        // Start by resetting the filter conditions to a blank object
        this.currentFilters = {};
        // Loop through each filter group provided in the event detail
        filters.forEach((filter) => {
            const filterName = filter.filterName;
            let filterValues;
            let type = filter.type;
            if (type === "text") {
                // Search/Text filter
                filterValues = filter.filterValues;
            }
            else {
                // Multi-select/Single-Select
                filterValues = filter.filterValues.map((item) => item.label);
            }
            // If there are no filter values, or the filter is a text filter with an empty value, remove the filter
            if (!(filterValues.length === 0 ||
                (filterValues.length === 1 &&
                    type === "text" &&
                    filterValues[0] === ""))) {
                // Add or update the filter in the currentFilters object
                this.currentFilters[filterName] = { filterValues, type };
            }
        });
        // Now that the currentFilters object has been updated, apply all filters to the data
        this.allRowData = this.applyAllFilters(this.originalRowData, this.currentFilters);
        // After filtering, update the table view with the new filtered data
        this.updateTableView();
    }
    applyAllFilters(data, filters) {
        return data.filter((row) => {
            for (const filterName in filters) {
                const filterInfo = filters[filterName];
                let selectedValues = (filterInfo.filterValues || []).map((value) => {
                    if (typeof value === "string") {
                        return value.toLowerCase();
                    }
                    else if (typeof value === "number" || typeof value === "boolean") {
                        return value.toString();
                    }
                    return "";
                });
                // For text filters, check if row values start with any of the selectedValues
                if (filterInfo.type === "text") {
                    let textFilterMatched = false;
                    for (let property in row) {
                        if (row.hasOwnProperty(property)) {
                            let rowValue = row[property] != null
                                ? String(row[property]).toLowerCase()
                                : "";
                            if (selectedValues.some((filterValue) => rowValue.startsWith(filterValue))) {
                                textFilterMatched = true;
                                break;
                            }
                        }
                    }
                    if (!textFilterMatched)
                        return false;
                }
                else if (filterInfo.type === "multi-select") {
                    let rowValue = row[filterName] != null
                        ? String(row[filterName]).toLowerCase()
                        : "";
                    let includesUndefined = selectedValues.includes("undefined");
                    if (!selectedValues.includes(rowValue) &&
                        !(includesUndefined && rowValue === "")) {
                        return false;
                    }
                }
            }
            return true;
        });
    }
    async updateTableView() {
        if (this.serverSidePagination) {
            this.selectAll = false;
        }
        if (this.serverSidePagination && this.serverPageChangeHandler) {
            const { rows, total } = await this.serverPageChangeHandler({
                page: this.currentPage,
                pageSize: this.paginationPageSize,
            });
            rows.forEach((row, index) => {
                const rowId = row.sampleNumber ||
                    `row_${(this.currentPage - 1) * this.paginationPageSize + index}`;
                row.__rowId = rowId;
                row.__checkbox = {
                    disabled: false,
                    checked: this.selectedRows?.has(rowId) || false,
                    size: "s",
                    indeterminate: false,
                    error: false,
                };
            });
            this.rowData = rows;
            this.matchingResultsCount = total;
            if (this.gridApi) {
                this.gridApi.setGridOption("rowData", rows);
                this.updateHeaderCheckboxState();
            }
            const paginationElement = this.host.shadowRoot.querySelector("ifx-pagination");
            if (paginationElement) {
                paginationElement.setAttribute("total", total.toString());
            }
        }
        else {
            let visibleRowData;
            if (this.pagination) {
                const startIndex = (this.currentPage - 1) * this.paginationPageSize;
                const endIndex = startIndex + this.paginationPageSize;
                visibleRowData = this.allRowData.slice(startIndex, endIndex);
            }
            else {
                visibleRowData = this.allRowData;
            }
            if (this.enableSelection) {
                visibleRowData.forEach((row) => {
                    if (!row.__checkbox) {
                        row.__checkbox = {
                            disabled: false,
                            checked: this.selectedRows?.has(row.__rowId) || false,
                            size: "s",
                            indeterminate: false,
                            error: false,
                        };
                    }
                    else {
                        row.__checkbox.checked =
                            this.selectedRows?.has(row.__rowId) || false;
                    }
                });
            }
            this.rowData = visibleRowData;
            this.matchingResultsCount = this.allRowData.length;
            if (this.gridApi) {
                this.gridApi.setGridOption("rowData", this.rowData);
            }
            this.updateHeaderCheckboxState();
        }
    }
    clearAllFilters() {
        this.currentFilters = {};
        this.allRowData = [...this.originalRowData];
    }
    async onBtShowLoading() {
        this.gridApi.showLoadingOverlay();
    }
    setPaginationItemsPerPage() {
        const newItemsPerPage = this.paginationItemsPerPage;
        if (newItemsPerPage) {
            this.internalItemsPerPage = this.paginationItemsPerPage;
            const itemsPerPageArray = JSON.parse(this.internalItemsPerPage);
            const selectedOption = itemsPerPageArray.find((option) => option.selected);
            if (selectedOption) {
                this.paginationPageSize = Number(selectedOption.value);
            }
            else if (itemsPerPageArray.length > 0) {
                this.paginationPageSize = Number(itemsPerPageArray[0].value);
            }
        }
    }
    componentWillLoad() {
        ModuleRegistry.registerModules([AllCommunityModule]);
        this.setPaginationItemsPerPage();
        this.uniqueKey = `unique-${Math.floor(Math.random() * 1000000)}`;
        this.rowData = this.getRowData();
        this.colData = this.getColData();
        this.updateFilterOptions();
        this.gridOptions = {
            suppressCellFocus: true,
            rowHeight: this.rowHeight === "default" ? 40 : 32,
            headerHeight: 40,
            components: {
                checkboxCellRenderer: CheckboxCellRenderer,
                checkboxHeaderRenderer: CheckboxHeaderRenderer,
                customLoadingOverlay: CustomLoadingOverlay,
                customNoRowsOverlay: CustomNoRowsOverlay,
            },
            defaultColDef: {
                resizable: true,
                autoHeight: true,
                minWidth: this.columnMinWidth,
                width: this.columnWidth ? parseInt(this.columnWidth, 10) : undefined,
            },
            suppressDragLeaveHidesColumns: true,
            enableCellTextSelection: true,
            // onFirstDataRendered: this.onFirstDataRendered.bind(this), //keeping for reference
            columnDefs: this.colData,
            rowData: this.rowData,
            loadingOverlayComponent: CustomLoadingOverlay,
            noRowsOverlayComponent: CustomNoRowsOverlay,
            noRowsOverlayComponentParams: {
                noRowsMessageFunc: () => "No rows found", //at: ' + new Date().toLocaleTimeString(),
            },
            icons: {
                sortAscending: '<ifx-icon icon="arrow-triangle-up-16"></ifx-icon>',
                sortDescending: '<ifx-icon icon="arrow-triangle-down-16"></ifx-icon>',
                sortUnSort: '<a class="unsort-icon-custom-color"><ifx-icon icon="arrow-triangle-vertikal-16"></ifx-icon></a>',
            },
            rowDragManaged: this.colData.some((col) => col.dndSource === true)
                ? true
                : false,
            animateRows: this.colData.some((col) => col.dndSource === true)
                ? true
                : false,
            navigateToNextCell: (params) => {
                return this.focusCellIfContainingButton(params.api, params.nextCellPosition);
            },
            tabToNextCell: (params) => {
                // Returning null is deprecated so we return false if the result is null (browser handles tab behavior).
                return (this.focusCellIfContainingButton(params.api, params.nextCellPosition) ?? false);
            },
        };
        this.updateTableView();
    }
    focusCellIfContainingButton(api, cellPosition) {
        if (!cellPosition) {
            return null;
        }
        if (cellPosition.column.getColDef().field === "button") {
            const rowNode = api.getDisplayedRowAtIndex(cellPosition.rowIndex);
            if (!rowNode) {
                // Row not yet rendered due to virtualization.
                return null;
            }
            const cellRenderers = api.getCellRendererInstances({
                rowNodes: [rowNode],
                columns: [cellPosition.column],
            });
            if (cellRenderers.length > 0) {
                const renderedContent = cellRenderers[0]?.getGui();
                if (renderedContent) {
                    const button = renderedContent.querySelector("ifx-button");
                    if (button) {
                        setTimeout(() => {
                            // Just calling button.focus() will not work because the focus of <ifx-button> will not be
                            // forwared to its child <a>-element (containing the tabindex attribute) due to shadow root.
                            // We must therefore grab the <a>-element manually first and then call focus() on it.
                            const focusableChild = button.shadowRoot?.querySelector("a[tabindex]");
                            focusableChild?.focus();
                        }, 0);
                    }
                }
            }
        }
        return cellPosition;
    }
    emitEventOnHeaderSortChange() {
        this.gridApi.addEventListener("sortChanged", (event) => {
            const columnState = this.gridApi.getColumnState();
            const sortedColumn = columnState.find((col) => col.sort != null);
            let field;
            let sort;
            if (sortedColumn) {
                field = sortedColumn.colId;
                sort = sortedColumn.sort;
                this.lastSortedColumn = sortedColumn.colId;
            }
            else {
                field = this.lastSortedColumn || event.columns?.[0]?.getColId();
                sort = null;
                if (!this.lastSortedColumn && field) {
                    this.lastSortedColumn = field;
                }
            }
            this.ifxSortChange.emit({ field, sort });
        });
    }
    async componentDidLoad() {
        if (this.container) {
            if (!isNestedInIfxComponent(this.host)) {
                const framework = detectFramework();
                trackComponent("ifx-table", await framework);
            }
            this.gridApi = createGrid(this.container, this.gridOptions);
            if (this.gridApi) {
                this.applyColumnSizing();
                this.gridApi.setGridOption("columnDefs", this.colData);
                this.gridApi.setGridOption("rowData", this.rowData);
                if (this.pagination) {
                    const paginationElement = this.host.shadowRoot.querySelector("ifx-pagination");
                    if (paginationElement) {
                        paginationElement.addEventListener("ifxPageChange", this.handlePageChange.bind(this));
                    }
                }
                const sidebarFilterElements = this.host.querySelectorAll("ifx-filter-type-group");
                // Add an event listener to each SetFilter component
                sidebarFilterElements.forEach((sidebarFilterElement) => {
                    sidebarFilterElement.addEventListener("ifxSidebarFilterChange", this.handleSidebarFilterChange.bind(this));
                });
                const topbarFilterElements = this.host.querySelectorAll("ifx-filter-bar");
                // Add an event listener to each SetFilter component
                topbarFilterElements.forEach((topbarFilterElement) => {
                    topbarFilterElement.addEventListener("ifxTopbarFilterChange", this.handleTopbarFilterChange.bind(this));
                });
                this.emitEventOnHeaderSortChange();
            }
        }
    }
    componentWillUnmount() {
        if (this.pagination) {
            const paginationElement = this.host.shadowRoot.querySelector("ifx-pagination");
            if (paginationElement) {
                paginationElement.removeEventListener("ifxPageChange", this.handlePageChange.bind(this));
            }
        }
        const sidebarFilters = this.host.shadowRoot.querySelectorAll("ifx-filter-type-group");
        // Remove the event listener from each SetFilter component
        sidebarFilters.forEach((sidebarFilter) => {
            sidebarFilter.removeEventListener("ifxSidebarFilterChange", this.handleSidebarFilterChange.bind(this));
        });
        const topbarFilters = this.host.shadowRoot.querySelectorAll("ifx-filter-type-group");
        // Remove the event listener from each SetFilter component
        topbarFilters.forEach((topbarFilter) => {
            topbarFilter.removeEventListener("ifxTopbarFilterChange", this.handleTopbarFilterChange.bind(this));
        });
    }
    async handlePageChange(event) {
        if (!this.pagination) {
            return;
        }
        this.currentPage = event.detail.currentPage;
        if (this.serverSidePagination) {
            this.selectAll = false;
        }
        if (this.serverSidePagination && this.serverPageChangeHandler) {
            const { rows, total } = await this.serverPageChangeHandler({
                page: this.currentPage,
                pageSize: this.paginationPageSize,
            });
            rows.forEach((row, index) => {
                const rowId = row.sampleNumber ||
                    `row_${(this.currentPage - 1) * this.paginationPageSize + index}`;
                row.__rowId = rowId;
                row.__checkbox = {
                    disabled: false,
                    checked: this.selectedRows?.has(rowId) || false,
                    size: "s",
                    indeterminate: false,
                    error: false,
                };
            });
            this.rowData = rows;
            this.matchingResultsCount = total;
            if (this.gridApi) {
                this.gridApi.setGridOption("rowData", this.rowData);
                this.updateHeaderCheckboxState();
            }
            const paginationElement = this.host.shadowRoot.querySelector("ifx-pagination");
            if (paginationElement) {
                paginationElement.setAttribute("total", total.toString());
            }
        }
        else {
            const startIndex = (this.currentPage - 1) * this.paginationPageSize;
            const endIndex = startIndex + this.paginationPageSize;
            const visibleRowData = this.allRowData.slice(startIndex, endIndex);
            if (this.enableSelection) {
                visibleRowData.forEach((row) => {
                    if (!row.__checkbox) {
                        row.__checkbox = {
                            disabled: false,
                            checked: this.selectedRows?.has(row.__rowId) || false,
                            size: "s",
                            indeterminate: false,
                            error: false,
                        };
                    }
                    else {
                        row.__checkbox.checked =
                            this.selectedRows?.has(row.__rowId) || false;
                    }
                });
            }
            this.rowData = visibleRowData;
            if (this.gridApi) {
                this.gridApi.setGridOption("rowData", visibleRowData);
                this.updateHeaderCheckboxState();
            }
        }
    }
    isJSONParseable(str) {
        try {
            JSON.parse(str);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    handleSelectAll = (checked) => {
        this.selectAll = checked;
        const newSelectedRows = new Set(this.selectedRows);
        const newSelectedRowsData = new Map(this.selectedRowsData);
        if (checked) {
            if (this.serverSidePagination) {
                this.rowData.forEach((row) => {
                    const rowId = row.__rowId;
                    newSelectedRows.add(rowId);
                    const { __checkbox, __rowId, ...cleanRow } = row;
                    newSelectedRowsData.set(rowId, cleanRow);
                });
            }
            else {
                this.allRowData.forEach((row) => {
                    const rowId = row.__rowId;
                    newSelectedRows.add(rowId);
                    const { __checkbox, __rowId, ...cleanRow } = row;
                    newSelectedRowsData.set(rowId, cleanRow);
                });
            }
        }
        else {
            if (this.serverSidePagination) {
                this.rowData.forEach((row) => {
                    const rowId = row.__rowId;
                    newSelectedRows.delete(rowId);
                    newSelectedRowsData.delete(rowId);
                });
            }
            else {
                newSelectedRows.clear();
                newSelectedRowsData.clear();
            }
        }
        this.selectedRows = newSelectedRows;
        this.selectedRowsData = newSelectedRowsData;
        this.updateCheckboxStates();
        this.updateHeaderCheckboxState();
        this.emitSelectionChange();
    };
    getRowData() {
        let rows = [];
        if (this.rows === undefined || this.rows === null) {
            return rows;
        }
        if (this.isJSONParseable(this.rows)) {
            rows = [...JSON.parse(this.rows)];
        }
        else if (Array.isArray(this.rows) || typeof this.rows === "object") {
            rows = [...this.rows];
        }
        else {
            console.error("Unexpected value for rows: ", this.rows);
        }
        rows.forEach((row, index) => {
            if (!row.__rowId) {
                row.__rowId = `row_${index}_${Date.now()}_${Math.random()}`;
            }
        });
        if (this.enableSelection) {
            rows.forEach((row) => {
                row.__checkbox = {
                    disabled: false,
                    checked: this.selectedRows?.has(row.__rowId) || false,
                    size: "s",
                    indeterminate: false,
                    error: false,
                };
            });
        }
        this.allRowData = rows;
        this.originalRowData = [...rows];
        this.matchingResultsCount = this.allRowData.length;
        return rows.slice(0, this.paginationPageSize);
    }
    handleRowCheckboxClick = (params) => {
        const clickedRowData = params.data;
        const rowId = clickedRowData.__rowId;
        const newSelectedRows = new Set(this.selectedRows);
        const newSelectedRowsData = new Map(this.selectedRowsData);
        if (newSelectedRows.has(rowId)) {
            newSelectedRows.delete(rowId);
            newSelectedRowsData.delete(rowId);
        }
        else {
            newSelectedRows.add(rowId);
            const { __checkbox, __rowId, ...cleanRow } = clickedRowData;
            newSelectedRowsData.set(rowId, cleanRow);
        }
        this.selectedRows = newSelectedRows;
        this.selectedRowsData = newSelectedRowsData;
        if (this.serverSidePagination) {
            const currentPageSelectedCount = this.rowData.filter((row) => newSelectedRows.has(row.__rowId)).length;
            this.selectAll =
                currentPageSelectedCount === this.rowData.length &&
                    this.rowData.length > 0;
        }
        else {
            this.selectAll =
                newSelectedRows.size === this.allRowData.length &&
                    this.allRowData.length > 0;
        }
        this.updateCheckboxStates();
        this.updateHeaderCheckboxState();
        this.emitSelectionChange();
    };
    updateCheckboxStates() {
        const dataToUpdate = this.rowData;
        dataToUpdate.forEach((row) => {
            if (row.__checkbox) {
                row.__checkbox.checked = this.selectedRows.has(row.__rowId);
            }
        });
        if (this.gridApi) {
            this.gridApi.refreshCells({
                columns: ["__checkbox"],
                force: true,
            });
        }
    }
    emitSelectionChange() {
        const selectedRowsArray = Array.from(this.selectedRowsData.values());
        let isSelectAll;
        if (this.serverSidePagination) {
            const currentPageSelectedCount = this.rowData.filter((row) => this.selectedRows.has(row.__rowId)).length;
            isSelectAll =
                currentPageSelectedCount === this.rowData.length &&
                    this.rowData.length > 0;
        }
        else {
            isSelectAll =
                this.selectedRows.size === this.allRowData.length &&
                    this.allRowData.length > 0;
        }
        this.host.dispatchEvent(new CustomEvent("ifxSelectionChange", {
            detail: {
                selectedRows: selectedRowsArray,
                selectedCount: selectedRowsArray.length,
                isSelectAll: isSelectAll,
            },
            bubbles: true,
        }));
    }
    getColData() {
        let cols = [];
        if (this.cols === undefined || this.cols === null)
            return cols;
        if (this.isJSONParseable(this.cols)) {
            cols = [...JSON.parse(this.cols)];
        }
        else if (Array.isArray(this.cols) || typeof this.cols === "object") {
            cols = [...this.cols];
        }
        else {
            console.error("Unexpected value for cols: ", this.cols);
        }
        if (this.enableSelection) {
            const checkboxColumn = {
                headerName: "",
                field: "__checkbox",
                width: 50,
                pinned: "left",
                cellRenderer: "checkboxCellRenderer",
                cellRendererParams: {
                    onCheckboxClick: this.handleRowCheckboxClick?.bind(this),
                },
                headerComponent: "checkboxHeaderRenderer",
                headerComponentParams: {
                    onSelectAll: this.handleSelectAll?.bind(this),
                },
                sortable: false,
                filter: false,
                resizable: false,
                valueFormatter: undefined,
                cellDataType: false,
            };
            cols.unshift(checkboxColumn);
        }
        cols.forEach((column) => {
            const field = column.field?.toLowerCase() || "";
            // --- Button columns ---
            if (field.startsWith("button")) {
                column.cellRenderer = ButtonCellRenderer;
                column.valueFormatter = undefined;
                column.cellDataType = false;
                if (this.buttonRendererOptions?.onButtonClick) {
                    column.cellRendererParams = {
                        onButtonClick: this.buttonRendererOptions.onButtonClick,
                    };
                }
            }
            // --- Checkbox columns ---
            else if (field.startsWith("checkbox")) {
                column.cellRenderer = CheckboxCellRenderer;
                column.valueFormatter = undefined;
                column.cellDataType = false;
                if (this.checkboxRendererOptions?.onCheckboxClick) {
                    column.cellRendererParams = {
                        onCheckboxClick: this.checkboxRendererOptions.onCheckboxClick,
                    };
                }
            }
            // --- Icon Button columns ---
            else if (field.startsWith("iconbutton") || field === "iconButton") {
                column.cellRenderer = IconButtonCellRenderer;
                column.valueFormatter = undefined;
                column.cellDataType = false;
                if (this.iconButtonRendererOptions?.onIconButtonClick) {
                    column.cellRendererParams = {
                        onIconButtonClick: this.iconButtonRendererOptions.onIconButtonClick,
                    };
                }
            }
            // --- Status columns ---
            else if (field.startsWith("status")) {
                column.cellRenderer = StatusCellRenderer;
                column.valueFormatter = undefined;
                column.cellDataType = false;
            }
            // --- Link columns ---
            else if (field.startsWith("link")) {
                column.cellRenderer = LinkCellRenderer;
                column.valueFormatter = undefined;
                column.cellDataType = false;
            }
            // --- Tooltip columns ---
            else if (field.startsWith("tooltip")) {
                column.cellRenderer = TooltipCellRenderer;
                column.valueFormatter = undefined;
                column.cellDataType = false;
            }
        });
        return cols;
    }
    //Keeping for reference
    // onFirstDataRendered(params: FirstDataRenderedEvent) {
    //   params.api.sizeColumnsToFit();
    // }
    handleResetButtonClick() {
        const resetEvent = new CustomEvent("ifxResetFiltersEvent", {
            bubbles: true,
            composed: true,
        });
        window.dispatchEvent(resetEvent);
        this.clearAllFilters();
        this.updateTableView();
    }
    disconnectedCallback() {
        if (this.pagination) {
            const paginationElement = this.host.shadowRoot.querySelector("ifx-pagination");
            if (paginationElement) {
                paginationElement.removeEventListener("ifxPageChange", this.handlePageChange);
            }
        }
        const resetButton = this.host.shadowRoot.querySelector("#reset-filters-button");
        if (resetButton) {
            resetButton.removeEventListener("click", this.handleResetButtonClick.bind(this));
        }
    }
    getTableClassNames() {
        return classNames(this.tableHeight === "auto" && "table-wrapper ag-root-wrapper-body", "table-wrapper");
    }
    render() {
        let style = {};
        if (this.tableHeight !== "auto") {
            style = {
                height: this.tableHeight,
            };
        }
        const filterClass = this.filterOrientation === "topbar"
            ? "topbar-layout"
            : this.filterOrientation === "none"
                ? ""
                : "sidebar-layout";
        return (h(Host, { key: '2ac4193645168102ca1b9546414fe9678802c884' }, h("div", { key: '493c6e14e39f2157d4c6177a15fb8331a363535f', class: "table-container" }, this.filterOrientation === "sidebar" && (h("div", { key: '92d9603e86d277abefddc102bafe61533d489418', class: "sidebar-btn" }, h("ifx-button", { key: 'adb9f6614ed572ef5c05a10740af31eb771b01b5', type: "button", disabled: false, variant: "secondary", size: "m", target: "_blank", theme: "default", "full-width": "false", onClick: () => this.toggleSidebarFilters() }, h("ifx-icon", { key: '7d5ef897d035e6db51e687fc7ea5bfb96db8dde4', icon: "cross-16" }), this.showSidebarFilters ? "Hide Filters" : "Show Filters"))), h("div", { key: '40d3479cdc9ee298c50dea00f186c3ab750beeef', class: filterClass }, this.filterOrientation === "sidebar" &&
            this.showSidebarFilters && (h("div", { key: '9d80da2c155da5cf8ad6a623bbb3da7d756e0708', class: "sidebar-container" }, h("div", { key: '47c2fca6d64ecdb997512600b5982882f0fd878d', class: "filters-title-container" }, h("span", { key: 'a14b2739a0268615af8f4b272844ef3fb89a10e1', class: "filters-title" }, "Filters")), h("div", { key: '748a8d62e16c0f7c2c7188fde7fc5a5e178c7484', class: "set-filter-wrapper-sidebar" }, (this.filterOrientation !== "sidebar" ||
            this.showSidebarFilters) && (h("slot", { key: '6cbe0e786f80ea4294051e01c93c591055102075', name: "sidebar-filter" }))))), this.filterOrientation !== "none" &&
            this.filterOrientation !== "sidebar" && (h("div", { key: '598aa463277ca6b4b3d97a7d11bf4382bb2af5a0', class: "set-filter-wrapper-topbar" }, (this.filterOrientation !== "sidebar" ||
            this.showSidebarFilters) && (h("slot", { key: 'b0a510ebc6db4369f5c78dbab7ff9d91a9a25bea', name: "topbar-filter" })))), h("div", { key: 'f89d2406d7d0b7b6ff0da668235bcfc346c4c523', class: "table-pagination-wrapper" }, this.filterOrientation !== "none" &&
            this.filterOrientation !== "topbar" &&
            this.showSidebarFilters && (h("div", { key: '1fdf39b651f49433aae464287b15bb418e891765', class: "filter-chips" }, Object.keys(this.currentFilters).map((name) => {
            const filter = this.currentFilters[name];
            const filterValues = filter.filterValues;
            const isMultiSelect = filter.type !== "text";
            return filterValues.length > 0 ? (h("ifx-chip", { placeholder: name, size: "large", variant: isMultiSelect ? "multi" : "single", readOnly: true, value: filterValues, key: name }, filterValues.map((filterValue) => (h("ifx-chip-item", { value: filterValue, selected: true, key: filterValue }, filterValue))))) : null;
        }))), h("div", { key: '3541f80804cc083a9e5e9cdc7333eb2a7ce9b492', class: "headline-wrapper" }, this.filterOrientation !== "none" && this.headline && (h("div", { key: '6e8a0d9658bbec3f289b373871424849e46240f6', class: "matching-results-container" }, h("span", { key: '6e5485e27e8bbad29577b07d29221722b5c4e6d8', class: "matching-results-count" }, "(", this.matchingResultsCount, ")"), h("span", { key: '94d64a29864194716e5312e9cddd255ae8fcec33', class: "matching-results-text" }, this.headline))), h("div", { key: '9a2e3b0269ebe7e7c2a888e92555f0d17bc8822f', class: "inner-buttons-wrapper" }, h("slot", { key: '584d6145c575295285e338f6971f2fb9f5dbc167', name: "inner-button" }))), h("div", { key: '174c9b586d3e12fb576d4626b461eaec228b3a9a', id: "table-wrapper", class: this.getTableClassNames() }, h("div", { key: '068107c805d04ef04001f60ee35653a1d57f55ea', id: `ifxTable-${this.uniqueKey}`, class: `ifx-ag-grid ${this.variant === "zebra" ? "zebra" : ""}`, style: style, ref: (el) => (this.container = el) })), h("div", { key: '97153c5cfa4eaeae79ef0e7cca454c777bb52949', class: "pagination-wrapper" }, this.pagination ? (h("ifx-pagination", { total: this.serverSidePagination
                ? this.matchingResultsCount
                : this.allRowData.length, "current-page": this.currentPage, "items-per-page": this.internalItemsPerPage })) : null))))));
    }
    hasButtonCol() {
        return this.getColData().some((column) => column.field === "button");
    }
    onDragOver(event) {
        var dragSupported = event.dataTransfer.length;
        if (dragSupported) {
            event.dataTransfer.dropEffect = "move";
        }
        event.preventDefault();
    }
    onDrop(event) {
        var jsonData = event.dataTransfer.getData("application/json");
        var eJsonRow = document.createElement("div");
        eJsonRow.classList.add("json-row");
        eJsonRow.innerText = jsonData;
        var eJsonDisplay = document.querySelector("#eJsonDisplay");
        eJsonDisplay.appendChild(eJsonRow);
        event.preventDefault();
    }
    static get is() { return "ifx-table"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["table.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["table.css"]
        };
    }
    static get properties() {
        return {
            "cols": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "cols"
            },
            "rows": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "rows"
            },
            "buttonRendererOptions": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "{\n\t\tonButtonClick?: (params: any, event: Event) => void;\n\t}",
                    "resolved": "{ onButtonClick?: (params: any, event: Event) => void; }",
                    "references": {
                        "Event": {
                            "location": "import",
                            "path": "@stencil/core",
                            "id": "node_modules::Event",
                            "referenceLocation": "Event"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "iconButtonRendererOptions": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "{\n\t\tonIconButtonClick?: (params: any, event: Event) => void;\n\t}",
                    "resolved": "{ onIconButtonClick?: (params: any, event: Event) => void; }",
                    "references": {
                        "Event": {
                            "location": "import",
                            "path": "@stencil/core",
                            "id": "node_modules::Event",
                            "referenceLocation": "Event"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "checkboxRendererOptions": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "{\n\t\tonCheckboxClick?: (params: any, event: Event) => void;\n\t}",
                    "resolved": "{ onCheckboxClick?: (params: any, event: Event) => void; }",
                    "references": {
                        "Event": {
                            "location": "import",
                            "path": "@stencil/core",
                            "id": "node_modules::Event",
                            "referenceLocation": "Event"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "rowHeight": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "row-height",
                "defaultValue": "\"default\""
            },
            "tableHeight": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "table-height",
                "defaultValue": "\"auto\""
            },
            "pagination": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "pagination",
                "defaultValue": "true"
            },
            "paginationItemsPerPage": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "pagination-items-per-page"
            },
            "filterOrientation": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "filter-orientation",
                "defaultValue": "\"sidebar\""
            },
            "headline": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "headline",
                "defaultValue": "\"\""
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "variant",
                "defaultValue": "\"default\""
            },
            "serverSidePagination": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "server-side-pagination",
                "defaultValue": "false"
            },
            "serverPageChangeHandler": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "(params: {\n\t\tpage: number;\n\t\tpageSize: number;\n\t}) => Promise<{ rows: any[]; total: number }>",
                    "resolved": "(params: { page: number; pageSize: number; }) => Promise<{ rows: any[]; total: number; }>",
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "enableSelection": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "enable-selection",
                "defaultValue": "false"
            },
            "showLoading": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "show-loading",
                "defaultValue": "false"
            },
            "fitColumns": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "fit-columns",
                "defaultValue": "false"
            },
            "columnMinWidth": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "column-min-width"
            },
            "columnWidth": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "column-width"
            }
        };
    }
    static get states() {
        return {
            "currentPage": {},
            "rowData": {},
            "colData": {},
            "filterOptions": {},
            "currentFilters": {},
            "uniqueKey": {},
            "paginationPageSize": {},
            "showSidebarFilters": {},
            "matchingResultsCount": {},
            "selectedRows": {},
            "selectAll": {},
            "selectedRowsData": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxSortChange",
                "name": "ifxSortChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "onBtShowLoading": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "host"; }
    static get watchers() {
        return [{
                "propName": "rows",
                "methodName": "rowsChanged"
            }, {
                "propName": "fitColumns",
                "methodName": "onSizingOptionsChanged"
            }, {
                "propName": "columnMinWidth",
                "methodName": "onSizingOptionsChanged"
            }, {
                "propName": "cols",
                "methodName": "colsChanged"
            }, {
                "propName": "buttonRendererOptions",
                "methodName": "onButtonRendererOptionsChanged"
            }, {
                "propName": "iconButtonRendererOptions",
                "methodName": "onIconButtonRendererOptionsChanged"
            }, {
                "propName": "checkboxRendererOptions",
                "methodName": "onCheckboxRendererOptionsChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "ifxItemsPerPageChange",
                "method": "handleResultsPerPageChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "ifxChange",
                "method": "handleChipChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=table.js.map
