import { type EventEmitter } from "../../stencil-public-runtime";
export interface TreeViewCheckChangeEvent {
    checked: boolean;
    indeterminate: boolean;
    value?: string;
    affectedChildItems?: Array<{
        checked: boolean;
        indeterminate: boolean;
        value?: string;
    }>;
    component?: TreeViewItem;
}
export interface TreeViewExpandChangeEvent {
    expanded: boolean;
    value?: string;
    affectedItems?: Array<{
        expanded: boolean;
        value?: string;
    }>;
    component?: TreeViewItem;
}
export interface TreeViewDisableChangeEvent {
    disabled: boolean;
    component?: TreeViewItem;
}
export declare class TreeViewItem {
    host: HTMLElement;
    expanded: boolean;
    initiallyExpanded: boolean;
    disableItem: boolean;
    ariaLabel: string | null;
    initiallySelected: boolean;
    value: string;
    ifxTreeViewItemExpandChange: EventEmitter<TreeViewExpandChangeEvent>;
    ifxTreeViewItemCheckChange: EventEmitter<TreeViewCheckChangeEvent>;
    ifxTreeViewItemDisableChange: EventEmitter<TreeViewDisableChangeEvent>;
    private hasChildren;
    private isChecked;
    private partialChecked;
    private level;
    private disableAllItems;
    private expandAllItems;
    private suppressExpandEvents;
    private get disabled();
    private get isExpanded();
    private findChildren;
    private calculateNodeLevel;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private observeParentAttribute;
    private shouldExpandFromParent;
    private expandAllDescendants;
    private handleStateChange;
    private handleCheckboxChange;
    private handleHeaderClick;
    private expandOrCollapseAllDescendants;
    private updateCheckState;
    private updateChildrenSilently;
    handleExpandedChange(newValue: boolean): void;
    handleDisableItemChange(newValue: boolean): void;
    private setNodeState;
    private collectDescendantStates;
    private updateChildrenState;
    private findSiblingNodes;
    private updateParentState;
    private calculateSiblingStates;
    private toggleExpand;
    private handleKeyDown;
    render(): any;
}
