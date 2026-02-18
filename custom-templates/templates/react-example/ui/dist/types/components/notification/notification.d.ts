export type NotificationVariant = "success" | "locked" | "error" | "neutral";
export declare class Notification {
    el: any;
    icon: string;
    variant: NotificationVariant;
    linkText: string;
    linkHref: string;
    linkTarget: string;
    componentDidLoad(): Promise<void>;
    private getClassName;
    render(): any;
}
