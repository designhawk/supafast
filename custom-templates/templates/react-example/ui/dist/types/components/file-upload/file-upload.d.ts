import { type EventEmitter } from "../../stencil-public-runtime";
interface UploadTask {
    file: File;
    progress: number;
    intervalId: number | null;
    completed: boolean;
    error?: boolean;
}
export type FileUploadErrorReason = "network-error" | "timeout" | "file-too-large" | "unsupported-type" | "invalid-type" | "custom" | (string & {});
export declare class FileUpload {
    hostElement: HTMLElement;
    dragAndDrop: boolean;
    required: boolean;
    disabled: boolean;
    maxFileSizeMB: number;
    /** Default set of allowed file extensions (used internally). Can be extended using `additionalAllowedFileTypes`. */
    allowedFileTypes?: string | string[];
    additionalAllowedFileTypes?: string | string[];
    /** When set to true, allows any file type to be uploaded (no file type restrictions). */
    allowAnyFileType: boolean;
    /** Custom file extensions to allow (e.g., 'xml', 'asc', 'cfg'). Recommended format: without dots. Also accepts format with dots like '.xml'. Do not use wildcards like '*.xml'. */
    allowedFileExtensions?: string | string[];
    uploadHandler?: (file: File, onProgress?: (progress: number) => void) => Promise<void>;
    private _maxFiles?;
    get maxFiles(): number | undefined;
    set maxFiles(value: number | undefined);
    label: string;
    labelRequiredError: string;
    labelBrowseFiles: string;
    labelDragAndDrop: string;
    labelUploadedFilesHeading: string;
    labelFileTooLarge: string;
    labelUnsupportedFileType: string;
    labelUploaded: string;
    labelUploadFailed: string;
    labelSupportedFormatsTemplate: string;
    labelFileSingular: string;
    labelFilePlural: string;
    labelMaxFilesInfo?: string;
    labelMaxFilesExceeded: string;
    ariaLabelBrowseFiles: string;
    ariaLabelDropzone: string;
    ariaLabelFileInput: string;
    ariaLabelRemoveFile: string;
    ariaLabelCancelUpload: string;
    ariaLabelRetryUpload: string;
    ariaLabelUploadingStatus: string;
    ariaLabelUploadedStatus: string;
    ariaLabelUploadFailedStatus: string;
    private showDemoStates?;
    private internalId;
    isDragOver: boolean;
    files: File[];
    uploadTasks: UploadTask[];
    rejectedSizeFiles: string[];
    rejectedTypeFiles: string[];
    requiredError: boolean;
    statusMessage: {
        type: "error" | "info" | "success";
        text: string;
    } | null;
    ifxFileUploadAdd: EventEmitter<{
        addedFiles: File[];
        files: File[];
    }>;
    ifxFileUploadRemove: EventEmitter<{
        removedFile: File;
        files: File[];
    }>;
    ifxFileUploadChange: EventEmitter<{
        files: File[];
    }>;
    ifxFileUploadError: EventEmitter<{
        errorType: string;
        file: File;
        message: string;
        reason?: string;
    }>;
    ifxFileUploadInvalid: EventEmitter<{
        file: File;
        reason: string;
    }>;
    ifxFileUploadStart: EventEmitter<{
        file: File;
    }>;
    ifxFileUploadComplete: EventEmitter<{
        file: File;
    }>;
    ifxFileUploadAllComplete: EventEmitter<{
        files: File[];
    }>;
    ifxFileUploadAbort: EventEmitter<{
        file: File;
    }>;
    ifxFileUploadDrop: EventEmitter<{
        droppedFiles: File[];
        acceptedFiles: File[];
        rejectedFiles: File[];
    }>;
    ifxFileUploadClick: EventEmitter<void>;
    ifxFileUploadMaxFilesExceeded: EventEmitter<{
        maxFiles: number;
        attempted: number;
    }>;
    ifxFileUploadValidation: EventEmitter<{
        valid: boolean;
    }>;
    ifxFileUploadRetry: EventEmitter<{
        file: File;
    }>;
    private fileInputEl;
    private extensionToMimeMap;
    private validateRequired;
    private pluralize;
    private getNormalizedFileTypes;
    private getNormalizedFileExtensions;
    /**
     * Enhanced file type validation that supports:
     * - allowAnyFileType flag for unrestricted uploads (overrides all restrictions)
     * - allowedFileTypes (predefined extensions mapped to MIME types) - if not set and allowedFileExtensions is set, ignored
     * - additionalAllowedFileTypes (MIME types)
     * - allowedFileExtensions (custom extensions) - if only this is set, only these extensions are allowed
     */
    private isFileTypeAllowed;
    /**
     * Extracts file extension from filename (without dot)
     */
    private getFileExtension;
    private getLabelFromMimeType;
    handleFileChange(event: Event): void;
    handleDrop(event: DragEvent): void;
    handleDragOver(event: DragEvent): void;
    handleDragLeave(event: DragEvent): void;
    processFiles(fileList: FileList): void;
    retryUpload(file: File): void;
    private checkAndEmitAllComplete;
    private resetFileInput;
    private updateTaskProgress;
    startUpload(file: File): void;
    cancelUpload(file: File): void;
    removeFile(file: File): void;
    clearRejectedFile(fileName: string, type: "size" | "type"): void;
    splitFileNameParts(file: File): {
        base: string;
        ext: string;
    };
    getFileIcon(file: File): string;
    formatSize(bytes: number): string;
    getAcceptAttribute(): string;
    private getFormattedProgressText;
    private getAdditionalMimeTypes;
    private getSupportedFileText;
    private getFormattedFileTooLargeText;
    private renderStatusMessage;
    private isInputDisabled;
    componentDidLoad(): Promise<void>;
    injectDemoState(): Promise<void>;
    triggerDemoValidation(): Promise<void>;
    render(): any;
    renderUploadArea(): any;
    renderDragAndDropArea(): any;
}
export {};
