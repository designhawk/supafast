export declare class Card {
    el: any;
    noBtns: boolean;
    direction: "horizontal" | "vertical";
    alignment: string;
    noImg: boolean;
    href: string;
    internalHref: string;
    target: string;
    ariaLabel: string | null;
    setImgPosition(event: any): void;
    handleComponentAdjustment(): void;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    componentWillUpdate(): void;
    render(): any;
}
