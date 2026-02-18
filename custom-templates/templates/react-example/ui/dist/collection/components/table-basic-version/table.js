import { Host, h } from "@stencil/core";
import { AllCommunityModule, createGrid, ModuleRegistry, provideGlobalGridOptions, } from "ag-grid-community";
import classNames from "classnames";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
import { CustomLoadingOverlay } from "./customLoadingOverlay";
import { CustomNoRowsOverlay } from "./customNoRowsOverlay";
export class Table {
    gridOptions;
    cols;
    rows;
    columnDefs = [];
    rowData = [];
    rowHeight = "default";
    tableHeight = "auto";
    variant = "default";
    uniqueKey;
    host;
    container;
    gridApi;
    gridInitialized = false;
    componentWillLoad() {
        ModuleRegistry.registerModules([AllCommunityModule]);
        provideGlobalGridOptions({ theme: "legacy" });
        this.uniqueKey = `unique-${Math.floor(Math.random() * 1000000)}`;
        this.setColsAndRows(); //needed?
        this.setGridOptions();
    }
    setGridOptions() {
        this.gridOptions = {
            rowHeight: this.rowHeight === "default" ? 40 : 32,
            headerHeight: 40,
            defaultColDef: {
                resizable: true,
                autoHeight: true,
            },
            suppressCellFocus: false,
            enableCellTextSelection: true,
            suppressDragLeaveHidesColumns: true,
            suppressRowHoverHighlight: true,
            onFirstDataRendered: this.onFirstDataRendered,
            columnDefs: this.columnDefs,
            rowData: this.rowData,
            loadingOverlayComponent: CustomLoadingOverlay,
            noRowsOverlayComponent: CustomNoRowsOverlay,
            noRowsOverlayComponentParams: {
                noRowsMessageFunc: () => "No rows found at: " + new Date().toLocaleTimeString(),
            },
            icons: {
                sortAscending: '<ifx-icon icon="arrow-triangle-up-16"></ifx-icon>',
                sortDescending: '<ifx-icon icon="arrow-triangle-down-16"></ifx-icon>',
                sortUnSort: '<a class="unsort-icon-custom-color"><ifx-icon icon="arrow-triangle-vertikal-16"></ifx-icon></a>',
            },
            rowDragManaged: this.columnDefs.some((col) => col.dndSource === true)
                ? true
                : false,
            animateRows: this.columnDefs.some((col) => col.dndSource === true)
                ? true
                : false,
        };
    }
    setColsAndRows() {
        if (typeof this.rows === "string" && typeof this.cols === "string") {
            try {
                if (this.cols) {
                    this.columnDefs = JSON.parse(this.cols);
                }
                if (this.rows) {
                    this.rowData = JSON.parse(this.rows);
                }
            }
            catch (err) {
                console.error("Failed to parse input:", err);
            }
        }
        else if ((Array.isArray(this.rows) || typeof this.rows === "object") &&
            (Array.isArray(this.cols) || typeof this.cols === "object")) {
            this.columnDefs = this.cols;
            this.rowData = this.rows;
        }
        else {
            console.error("Unexpected value for cols and rows:", this.rows, this.cols);
        }
    }
    getRowData() {
        let rows = [];
        if (typeof this.rows === "string") {
            try {
                if (this.rows) {
                    rows = JSON.parse(this.rows);
                }
            }
            catch (err) {
                console.error("Failed to parse input:", err);
            }
        }
        else if (Array.isArray(this.rows) || typeof this.rows === "object") {
            rows = this.rows;
        }
        else {
            console.error("Unexpected value for rows: ", this.rows);
        }
        return rows;
    }
    getColData() {
        let cols = [];
        if (typeof this.cols === "string") {
            try {
                if (this.cols) {
                    cols = JSON.parse(this.cols);
                }
            }
            catch (err) {
                console.error("Failed to parse input:", err);
            }
        }
        else if (Array.isArray(this.cols) || typeof this.cols === "object") {
            cols = this.cols;
        }
        else {
            console.error("Unexpected value for cols: ", this.cols);
        }
        return cols;
    }
    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }
    componentWillUpdate() {
        this.setColsAndRows();
        this.gridOptions.columnDefs = this.columnDefs;
        this.gridOptions.rowData = this.rowData;
        if (this.gridApi) {
            this.gridApi.setGridOption("rowData", this.rowData);
            this.gridApi.setGridOption("columnDefs", this.columnDefs);
        }
    }
    async componentDidLoad() {
        if (this.container && !this.gridInitialized) {
            if (!isNestedInIfxComponent(this.host)) {
                const framework = detectFramework();
                trackComponent("ifx-basic-table", await framework);
            }
            this.gridApi = createGrid(this.container, this.gridOptions);
            if (this.gridApi) {
                this.gridApi.sizeColumnsToFit({
                    defaultMinWidth: 100,
                });
                this.gridApi.setGridOption("columnDefs", this.getColData());
                this.gridApi.setGridOption("rowData", this.getRowData());
                this.gridInitialized = true;
            }
        }
    }
    getClassNames() {
        return classNames(this.tableHeight === "auto" && "table-wrapper ag-root-wrapper-body", "table-wrapper");
    }
    getTableStyle() {
        if (this.tableHeight !== "auto") {
            return {
                height: this.tableHeight,
            };
        }
        return {};
    }
    render() {
        return (h(Host, { key: 'ff582e9fd199f18c13bbf9141bd084f5d28668e5' }, h("div", { key: '3ccdfc3d0554713b6551134f2eb1d1c06689b674', id: "table-wrapper", class: this.getClassNames() }, h("div", { key: '1c9586cc470e207501bde0614e033264a42da79f', id: `ifxTable-${this.uniqueKey}`, class: `ifx-ag-grid ${this.variant === "zebra" ? "zebra" : ""}`, style: this.getTableStyle(), ref: (el) => (this.container = el) }))));
    }
    static get is() { return "ifx-basic-table"; }
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
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "any[] | string",
                    "resolved": "any[] | string",
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
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "any[] | string",
                    "resolved": "any[] | string",
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
            }
        };
    }
    static get states() {
        return {
            "gridOptions": {},
            "columnDefs": {},
            "rowData": {},
            "uniqueKey": {}
        };
    }
    static get elementRef() { return "host"; }
}
//# sourceMappingURL=table.js.map
