export declare class BreadcrumbItem {
    isLastItem: boolean;
    el: any;
    private emittedElement;
    uniqueId: string;
    hasDropdownMenu: boolean;
    handleOutsideClick(event: MouseEvent): void;
    handleKeyDown(ev: KeyboardEvent): void;
    getDropdownMenu(): any;
    menuWrapperEventReEmitter(event: CustomEvent<HTMLElement>): void;
    getMenuIconWrapper(): HTMLElement | undefined;
    handleClassList(el: any, type: any, className: any): void;
    closeDropdownMenu(): void;
    toggleDropdownMenu(): void;
    isDropdownMenuOpen(): boolean;
    handleLastItem(): void;
    generateUniqueId(prefix?: string): string;
    componentWillLoad(): void;
    componentDidUpdate(): void;
    componentWillRender(): void;
    setHasDropdownMenuState(): void;
    getIfxDropdownMenuComponent(): any;
    componentDidLoad(): void;
    render(): any;
}
