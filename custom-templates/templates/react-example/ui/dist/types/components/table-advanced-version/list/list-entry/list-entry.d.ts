import { type EventEmitter } from "../../../../stencil-public-runtime";
export declare class ListEntry {
    host: HTMLElement;
    value: boolean;
    label: string;
    type: string;
    ifxListEntryChange: EventEmitter;
    valueChanged(newValue: boolean): void;
    handleFilterEntryChange(event: CustomEvent): void;
    render(): any;
}
