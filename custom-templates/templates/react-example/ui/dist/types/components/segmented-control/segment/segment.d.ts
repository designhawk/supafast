import { type EventEmitter } from "../../../stencil-public-runtime";
export declare class Segment {
    segmentSelect: EventEmitter<number>;
    icon: string;
    segmentIndex: number;
    selected: boolean;
    value: string;
    handleSegmentClick(): void;
    handleSegmentKeyDown(event: KeyboardEvent): void;
    render(): any;
}
