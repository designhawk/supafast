import { type EventEmitter } from "../../../../stencil-public-runtime";
export declare class FilterSearch {
    host: HTMLElement;
    filterName: string;
    disabled: boolean;
    filterValue: string;
    filterKey: string;
    showDeleteIcon: boolean;
    filterOrientation: string;
    placeholder: string;
    ifxFilterSearchChange: EventEmitter;
    valueChanged(newValue: boolean): void;
    handleFilterSearchChange(event: CustomEvent): void;
    render(): any;
}
