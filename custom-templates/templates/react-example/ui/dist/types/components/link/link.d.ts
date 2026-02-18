export declare class Link {
    el: any;
    href: string;
    target: string;
    variant: string;
    size: string;
    disabled: boolean;
    download: string;
    ariaLabel: string | null;
    internalHref: string;
    internalTarget: string;
    internalVariant: string;
    setInternalStates(): void;
    componentWillRender(): void;
    handleKeyDown(event: KeyboardEvent): void;
    componentDidLoad(): Promise<void>;
    render(): any;
    getSizeClass(): "" | "small" | "medium" | "large" | "extraLarge";
    getVariantClass(): "menu" | "bold" | "title" | "underlined";
    linkClassNames(): string;
}
