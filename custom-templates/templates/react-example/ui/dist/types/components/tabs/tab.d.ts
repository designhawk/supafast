import { type EventEmitter } from "../../stencil-public-runtime";
export declare class IfxTab {
    el: HTMLElement;
    header: string;
    disabled: boolean;
    icon: string;
    iconPosition: "left" | "right";
    tabHeaderChange: EventEmitter;
    componentWillUpdate(): void;
    render(): any;
}
