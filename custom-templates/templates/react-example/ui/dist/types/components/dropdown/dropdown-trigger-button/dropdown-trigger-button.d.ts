import type { IOpenable } from "../IOpenable";
export declare class DropdownItem implements IOpenable {
    isOpen: boolean;
    theme: "default" | "danger" | "inverse";
    variant: "primary";
    size: "s" | "m";
    disabled: boolean;
    hideArrow: boolean;
    render(): any;
}
