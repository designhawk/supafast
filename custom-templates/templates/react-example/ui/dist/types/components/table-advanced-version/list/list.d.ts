import { type EventEmitter } from "../../../stencil-public-runtime";
export declare class List {
    private el;
    expanded: boolean;
    showMore: boolean;
    selectedCount: number;
    totalItems: number;
    name: string;
    maxVisibleItems: number;
    type: string;
    resetTrigger: boolean;
    internalResetTrigger: boolean;
    ifxListUpdate: EventEmitter;
    observer: MutationObserver;
    handleTypeChange(newType: string): void;
    resetTriggerChanged(newValue: boolean): void;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    reset(): void;
    render(): any;
    private setupListenersAndObservers;
    private cleanupListenersAndObservers;
    private initializeList;
    private updateListEntriesType;
    private resetListEntries;
    private handleMutation;
    private checkRadioButtonConstraint;
    getTotalItems(): number;
    toggleList: (event: MouseEvent) => void;
    toggleShowMore: (event: MouseEvent) => void;
    getSelectedItems(el: HTMLElement): {
        label: string;
        value: string;
        type: string;
        element: HTMLIfxListEntryElement;
    }[];
    handleCheckedChange: (event?: CustomEvent) => void;
    private renderList;
}
