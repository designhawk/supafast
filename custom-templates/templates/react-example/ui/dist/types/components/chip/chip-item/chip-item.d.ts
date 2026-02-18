import { type EventEmitter } from "../../../stencil-public-runtime";
import type { ChipItemSelectEvent, ChipState } from "../interfaces";
export declare class ChipItem {
    chipItem: HTMLIfxChipItemElement;
    ifxChipItemSelect: EventEmitter<ChipItemSelectEvent>;
    value: string;
    chipState: ChipState;
    selected: boolean;
    updateItemSelection(event: CustomEvent<ChipItemSelectEvent>): void;
    validateSelected(newValue: boolean, oldValue: boolean): void;
    getItemLabel(): string;
    toggleItemSelection(): void;
    emitIfxChipItemSelectEvent(emitIfxChange?: boolean): void;
    handleItemClick(): void;
    handleItemKeyDown(event: KeyboardEvent): void;
    handleSelectedState(): void;
    componentWillLoad(): void;
    render(): any;
}
