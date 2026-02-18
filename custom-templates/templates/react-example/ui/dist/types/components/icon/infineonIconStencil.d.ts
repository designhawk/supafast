import { type EventEmitter } from "../../stencil-public-runtime";
export declare class InfineonIconStencil {
    el: HTMLElement;
    icon: string;
    ifxIcon: any;
    internalIcon: string;
    consoleError: EventEmitter<boolean>;
    updateIcon(newIcon: string): void;
    convertStringToHtml(htmlString: any): ChildNode;
    F: any;
    convertHtmlToObject(htmlElement: any): {};
    convertPathsToVnode(htmlPath: any): any[];
    getSVG(svgPath: any): any;
    constructIcon(): any;
    setIcon(): void;
    isInsideAgGrid(el: HTMLElement): boolean;
    isInsideChoices(el: HTMLElement): boolean;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    render(): any;
}
