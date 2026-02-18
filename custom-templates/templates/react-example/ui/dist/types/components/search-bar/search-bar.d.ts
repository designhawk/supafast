import { type EventEmitter } from "../../stencil-public-runtime";
export declare class SearchBar {
    isOpen: boolean;
    disabled: boolean;
    internalState: boolean;
    value: string;
    maxlength?: number;
    ifxInput: EventEmitter;
    ifxOpen: EventEmitter;
    autocomplete: string;
    el: any;
    onNavbarMobile(): Promise<void>;
    handlePropChange(): void;
    handleCloseButton: () => void;
    setInitialState(): void;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    handleInput(event: CustomEvent): void;
    handleFocus: () => void;
    render(): any;
}
