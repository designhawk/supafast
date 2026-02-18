import { type EventEmitter } from "../../../stencil-public-runtime";
export declare class SetFilter {
    filterName: string;
    filterLabel: string;
    placeholder: string;
    type: "text" | "single-select" | "multi-select";
    options: any[] | string;
    filterValues: string[];
    ifxFilterSelect: EventEmitter;
    handleTextInputChange(event: Event): void;
    handleSingleSelectChange(event: CustomEvent): void;
    handleMultiselectOptionChange(event: CustomEvent): void;
    render(): any;
}
