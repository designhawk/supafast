import { type EventEmitter } from "../../../stencil-public-runtime";
export declare class DropdownMenu {
    isOpen: boolean;
    size: string;
    hideTopPadding: boolean;
    el: any;
    menuSize: EventEmitter;
    filteredItems: HTMLIfxDropdownItemElement[];
    ifxDropdownMenuItem: EventEmitter<CustomEvent>;
    handleMenuFilter(event: CustomEvent): void;
    handleDropdownItemValueEmission(event: CustomEvent): void;
    filterDropdownItems(searchValue: string): void;
    componentWillUpdate(): void;
    componentWillLoad(): void;
    render(): any;
}
