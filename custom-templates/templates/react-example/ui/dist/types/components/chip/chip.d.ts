import { type EventEmitter } from "../../stencil-public-runtime";
import type { ChipItemSelectEvent } from "./interfaces";
export declare class Chip {
    chip: HTMLElement;
    ifxChange: EventEmitter<{
        previousSelection: Array<ChipItemSelectEvent>;
        currentSelection: Array<ChipItemSelectEvent>;
        name: string;
    }>;
    placeholder: string;
    size: "small" | "medium" | "large";
    value: Array<string> | string;
    variant: "single" | "multi";
    theme: "outlined" | "filled-light" | "filled-dark";
    readOnly: boolean;
    ariaLabel: string | null;
    disabled: boolean;
    icon: string;
    opened: boolean;
    selectedOptions: Array<ChipItemSelectEvent>;
    handleValueChange(newValue: Array<string> | string): void;
    handleReadOnlyChange(newValue: boolean): void;
    closeDropdownOnOutsideClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    updateSelectedOptions(event: CustomEvent<ChipItemSelectEvent>): void;
    getChipItems(): NodeList;
    getSelectedOptions(): string;
    toggleDropdownMenu(): void;
    /**
     * Focuses the chip item at the specified index.
     * @param index the index of the chip item to focus. -1 will focus the last chip item.
     */
    focusChipItemAt(index?: number): void;
    focusChip(): void;
    handleUnselectButtonClick(event: MouseEvent): void;
    handleWrapperClick(): void;
    handleWrapperKeyDown(event: KeyboardEvent): void;
    handleDropdownKeyDown(event: KeyboardEvent): void;
    syncChipState(): void;
    syncSelectedOptionsWithProp(newValue: Array<string> | string): void;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    render(): any;
}
