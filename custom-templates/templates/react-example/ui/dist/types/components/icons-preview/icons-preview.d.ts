export declare class IconsPreview {
    iconsArray: string[];
    isCopied: boolean;
    copiedIndex: number;
    copiedIcon: string | null;
    htmlTag: string;
    iconName: string;
    searchTerm: string;
    el: any;
    handleCopiedText(): void;
    copyIconText(icon: string): void;
    copyHtmlString(): void;
    get filteredIcons(): string[];
    getIconIndex(icon: string): number;
    handleIconFilter(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): any;
}
