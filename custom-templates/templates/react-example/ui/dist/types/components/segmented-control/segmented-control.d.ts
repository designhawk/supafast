import { type EventEmitter } from "../../stencil-public-runtime";
export declare class SegmentedControl {
    el: HTMLElement;
    ifxChange: EventEmitter<{
        previousValue: string;
        selectedValue: string;
    }>;
    caption: string;
    label: string;
    size: "regular" | "small";
    required: boolean;
    error: boolean;
    onSegmentSelect(event: CustomEvent): void;
    private selectedValue;
    unselectPreviousSegment(newSelectedIndex: number): {
        previousValue: string;
        selectedValue: string;
    };
    getSegments(): NodeList;
    setActiveSegment(): void;
    setSegmentSize(): void;
    componentDidLoad(): Promise<void>;
    render(): any;
    componentDidRender(): void;
}
