export declare class IconButton {
    variant: "primary" | "secondary" | "tertiary";
    size: string;
    disabled: boolean;
    icon: string;
    href: string;
    target: string;
    shape: string;
    ariaLabel: string | null;
    internalIcon: string;
    el: any;
    private focusableElement;
    handleClick(event: Event): void;
    updateIcon(newIcon: string): void;
    setFocus(): Promise<void>;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    render(): any;
    getVariantClass(): "primary" | "secondary" | "tertiary";
    getSizeClass(): "" | "l" | "s" | "xs";
    getClassNames(): string;
}
