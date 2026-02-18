import { type EventEmitter } from "../../../stencil-public-runtime";
export declare class Template {
    el: HTMLElement;
    repoDetails: {
        name: string;
        desc: string;
        framework: string;
    };
    repoUrl: string;
    showDetails: boolean;
    isTemplatePage: boolean;
    isLoading: boolean;
    repoError: string;
    name: string;
    toggleTemplates: EventEmitter;
    fieldError: EventEmitter;
    thumbnail: string;
    private clientId;
    private redirectUri;
    private scope;
    private state;
    authUser(): void;
    componentDidLoad(): void;
    getLocalStorageValues(): {
        repoName: string;
        repoDesc: string;
        repoFramework: string;
        templateName: string;
    };
    getUserToken(authCode: any): Promise<void>;
    handleUserInput(e: any, type: any): void;
    submitUserData(): void;
    togglePadding(action: any): void;
    handleCurrentTemplate(e: any): void;
    toggleTemplate(currTemp: any): Promise<void>;
    render(): any;
}
