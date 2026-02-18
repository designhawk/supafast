import { type EventEmitter } from "../../../stencil-public-runtime";
export declare class DropdownItem {
    icon: string;
    href: string;
    target: string;
    hide: boolean;
    error: boolean;
    size: string;
    ifxDropdownItem: EventEmitter;
    el: any;
    handleMenuSize(event: CustomEvent): void;
    handleEventEmission(): void;
    render(): any;
}
