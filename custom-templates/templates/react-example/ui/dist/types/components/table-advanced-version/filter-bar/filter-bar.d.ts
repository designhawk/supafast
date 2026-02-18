import { type EventEmitter } from "../../../stencil-public-runtime";
export declare class FilterBar {
    el: HTMLElement;
    selectedOptions: Array<{
        filterName: string;
        filterValues: [string];
        type: string;
    }>;
    ifxTopbarFilterChange: EventEmitter;
    showAllFilters: boolean;
    maxShownFilters: number;
    visibleSlots: number;
    showMoreFiltersButton: boolean;
    connectedCallback(): void;
    componentWillUnload(): void;
    componentWillLoad(): void;
    updateVisibleSlots(): void;
    handleMoreFiltersClick: () => void;
    handleResetEvent: () => void;
    handleSearchChange: (event: CustomEvent) => void;
    handleFilterSelect: (event: CustomEvent) => void;
    handleTopbarFilterChange: (event: CustomEvent) => void;
    render(): any;
}
