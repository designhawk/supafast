import { type EventEmitter } from "../../stencil-public-runtime";
export declare class TreeView {
    el: HTMLElement;
    label?: string;
    disableAllItems: boolean;
    expandAllItems: boolean;
    ariaLabel: string | null;
    ifxTreeViewExpandAllChange: EventEmitter<boolean>;
    ifxTreeViewDisableAllChange: EventEmitter<boolean>;
    handleExpandAllItemsChange(newValue: boolean): void;
    handleDisableAllItemsChange(newValue: boolean): void;
    private handleSlotRef;
    componentDidLoad(): Promise<void>;
    render(): any;
}
