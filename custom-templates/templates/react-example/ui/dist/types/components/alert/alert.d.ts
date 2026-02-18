import { type EventEmitter } from "../../stencil-public-runtime";
export declare class Alert {
    el: HTMLElement;
    variant: "primary" | "success" | "danger" | "warning" | "info";
    icon: string;
    ifxClose: EventEmitter;
    closable: boolean;
    AriaLive: string;
    uniqueId: string;
    alertTypeDescription: {
        primary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    handleClose(): void;
    renderCloseButton(): any;
    generateUniqueId(prefix?: string): string;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    render(): any;
}
