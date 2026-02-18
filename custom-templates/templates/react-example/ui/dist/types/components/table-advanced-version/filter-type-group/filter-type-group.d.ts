import { type EventEmitter } from "../../../stencil-public-runtime";
export declare class IfxFilterTypeGroup {
    el: HTMLElement;
    selectedOptions: Array<{
        filterGroupName: string;
        selectedItems?: Array<{
            filterName: string;
            value: boolean | string;
        }>;
        value?: string;
    }>;
    ifxSidebarFilterChange: EventEmitter;
    connectedCallback(): void;
    componentWillUnload(): void;
    handleResetEvent: () => void;
    handleUpdateSidebarFilter: (event: CustomEvent) => void;
    handleAccordionChange: (event: CustomEvent) => void;
    handleSearchChange: (event: CustomEvent) => void;
    handleFilterChange: (event: CustomEvent) => void;
    render(): any;
}
