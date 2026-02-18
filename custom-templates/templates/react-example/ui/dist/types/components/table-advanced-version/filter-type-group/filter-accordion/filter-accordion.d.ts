import { type EventEmitter } from "../../../../stencil-public-runtime";
export declare class FilterAccordion {
    private initialized;
    private el;
    expanded: boolean;
    maxVisibleItems: number;
    count: number;
    totalItems: number;
    filterGroupName: string;
    ifxFilterAccordionChange: EventEmitter;
    componentWillLoad(): void;
    componentDidLoad(): void;
    handleCheckedChange: (event: CustomEvent) => void;
    componentWillUnload(): void;
    toggleAccordion: (event: MouseEvent) => void;
    render(): any;
}
