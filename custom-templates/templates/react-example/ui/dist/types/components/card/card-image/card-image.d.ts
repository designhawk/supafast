import { type EventEmitter } from "../../../stencil-public-runtime";
export declare class CardImage {
    src: string;
    alt: string;
    position: string;
    imgPosition: EventEmitter;
    handlePosition(position: any): void;
    componentWillLoad(): void;
    componentDidUpdate(): void;
    render(): any;
}
