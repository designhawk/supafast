import { Host, h, } from "@stencil/core";
import { animationTo, KEYFRAMES } from "../..//shared/utils/animation";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { isFocusable, isHidden, queryShadowRoot, } from "../..//shared/utils/focus-trap";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class IfxModal {
    opened = false;
    showModal = this.opened || false;
    caption = "Modal Title";
    captionAriaLabel;
    closeOnOverlayClick = true;
    ifxOpen;
    ifxClose;
    variant = "default";
    size = "s";
    alertIcon = "";
    okButtonLabel = "OK";
    cancelButtonLabel = "Cancel";
    closeButtonAriaLabel;
    hostElement;
    slotButtonsPresent = false;
    showCloseButton = true;
    modalContainer;
    focusableElements = [];
    closeButton;
    resizeTimeout;
    handleResize = () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            if (this.showModal) {
                this.handleComponentOverflow();
            }
        }, 100);
    };
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.hostElement)) {
            const framework = detectFramework();
            trackComponent("ifx-modal", await framework);
        }
        // Query all focusable elements and store them in `focusableElements`.
        // Needed for the "focus trap" functionality.
        this.focusableElements = queryShadowRoot(this.hostElement.shadowRoot, (el) => isHidden(el) || el.matches("[data-focus-trap-edge]"), isFocusable);
        window.addEventListener("resize", this.handleResize);
    }
    disconnectedCallback() {
        window.removeEventListener("resize", this.handleResize);
    }
    componentWillRender() {
        if (this.showModal) {
            this.handleComponentOverflow();
        }
    }
    async handleComponentOverflow() {
        const modalContentContainer = this.hostElement.shadowRoot.querySelector(".modal-content-container");
        if (this.showModal &&
            (await this.isModalContentContainerHeightReachedViewport())) {
            modalContentContainer.classList.add("no-overflow");
        }
        else if (modalContentContainer?.classList.contains("no-overflow")) {
            modalContentContainer?.classList.remove("no-overflow");
        }
    }
    getFirstFocusableElement() {
        return this.focusableElements[0];
    }
    getLastFocusableElement() {
        return this.focusableElements[this.focusableElements.length - 1];
    }
    handleTopFocus = () => {
        this.attemptFocus(this.getLastFocusableElement());
    };
    handleBottomFocus = () => {
        this.attemptFocus(this.getFirstFocusableElement());
    };
    attemptFocus(element) {
        if (element == null) {
            setTimeout(() => {
                //wait until DOM is fully loaded
                this.closeButton.focus();
            });
            return;
        }
        setTimeout(() => {
            //wait until DOM is fully loaded
            element.focus();
        }, 0);
    }
    open() {
        this.showModal = true;
        try {
            const anim = animationTo(this.modalContainer, KEYFRAMES.fadeIn, {
                duration: 200,
            });
            anim.addEventListener("finish", () => {
                // Setting focus on last item and removing immediately
                // so, on tab press first element is focused
                setTimeout(() => {
                    this.getLastFocusableElement()?.focus();
                    this.getLastFocusableElement()?.blur();
                }, 0);
                this.ifxOpen.emit();
            });
            this.hostElement.addEventListener("keydown", this.handleKeypress);
        }
        catch (err) {
            this.ifxOpen.emit();
        }
    }
    close() {
        try {
            const anim = animationTo(this.modalContainer, KEYFRAMES.fadeOut, {
                duration: 200,
            });
            anim.addEventListener("finish", () => {
                this.showModal = false;
                this.ifxClose.emit();
            });
            this.hostElement.removeEventListener("keydown", this.handleKeypress);
        }
        catch (err) {
            this.showModal = false;
            this.ifxClose.emit();
        }
    }
    handleKeypress = (event) => {
        if (!this.showModal) {
            return;
        }
        if (event.key === "Escape") {
            this.doBeforeClose("ESCAPE_KEY");
        }
    };
    doBeforeClose(trigger) {
        const triggers = [];
        triggers.push(trigger);
        const prevented = triggers.some((event) => event.defaultPrevented);
        if (!prevented) {
            this.opened = false;
        }
    }
    openedChanged(newValue) {
        if (newValue === true) {
            this.open();
        }
        else {
            this.close();
        }
    }
    handleOverlayClick() {
        if (this.closeOnOverlayClick) {
            this.doBeforeClose("BACKDROP");
        }
    }
    handleContentUpdate(e) {
        const slotElement = e.target;
        const nodes = slotElement.assignedNodes();
        if (nodes.length > 0) {
            nodes.forEach((node) => {
                if (node.observer) {
                    node.observer.disconnect();
                    delete node.observer;
                }
                const observer = new MutationObserver((mutationsList, _) => {
                    for (const mutation of mutationsList) {
                        if (mutation.type === "childList") {
                            if (this.showModal) {
                                this.handleComponentOverflow();
                            }
                        }
                    }
                });
                observer.observe(node, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                });
                node.observer = observer;
            });
        }
    }
    handleButtonsSlotChange(e) {
        if (e.currentTarget.assignedElements()[0]?.childElementCount > 0) {
            this.slotButtonsPresent = true;
        }
        else {
            this.slotButtonsPresent = false;
        }
    }
    isModalContentContainerHeightReachedViewport() {
        //Adding timeout for proper height detection on Edge browser
        return new Promise((resolve) => {
            setTimeout(() => {
                const modalContent = this.hostElement.shadowRoot.querySelector(".modal-content");
                const modalContentHeight = modalContent.offsetHeight;
                const viewportHeight = window.innerHeight;
                const extraMarginForEdgeBrowser = 3;
                resolve(modalContentHeight + extraMarginForEdgeBrowser >=
                    viewportHeight * 0.9);
            }, 100);
        });
    }
    render() {
        const isAlertVariant = this.variant !== "default";
        return (h(Host, { key: '008fbc7834af881f1f83fad5969de9413234dcf1' }, h("div", { key: '463be31d3d392a74d4a320c6ba85d5ed6f2110c4', ref: (el) => (this.modalContainer = el), class: `modal-container ${this.showModal ? "open" : ""}` }, h("div", { key: '6faa7554a20b0ff3cc8936ff2c5000f9d8b369c7', class: "modal-overlay", onClick: () => this.handleOverlayClick() }), h("div", { key: '10faaf5e2fa937fc798832e6494c481b35e8191d', "data-focus-trap-edge": true, onFocus: this.handleTopFocus, tabindex: "0" }), h("div", { key: '41b6f467807149c4cf9536061778fd5e36f4bcfe', class: `modal-content-container ${this.size}`, role: "dialog", "aria-modal": "true", "aria-label": this.captionAriaLabel }, isAlertVariant ? (h("div", { class: `modal-icon-container ${this.variant === "alert-brand" ? "" : "danger"}` }, this.alertIcon ? h("ifx-icon", { icon: this.alertIcon }) : null)) : null, h("div", { key: '37c30fd79a56cbadd3f79e7f596d22e42c22e17f', class: "modal-content" }, h("div", { key: 'f2768063f880f0d0798133ca96fd48d581d07e19', class: "modal-header" }, h("h2", { key: '555bd64f9497dbcc427daad374702898be26e6ae', class: "modal-caption" }, this.caption), this.showCloseButton && (h("ifx-icon-button", { key: '643a01dafe6016633df9168b73de291bb316d49c', class: "modal-close-button", ref: (el) => (this.closeButton = el), icon: "cross-16", variant: "tertiary", onClick: () => this.doBeforeClose("CLOSE_BUTTON") }))), h("div", { key: '4552045290c07ec4af5901753af782a72b986e00', class: "modal-body" }, h("slot", { key: '701023071608c7327c0dede53672a8dc0ab1802f', name: "content", onSlotchange: (e) => this.handleContentUpdate(e) })), h("div", { key: '86d677ebd4ea6c3419e9b3770cdd31f0390e3a4b', class: `modal-footer ${this.slotButtonsPresent ? "buttons-present" : ""}` }, h("slot", { key: '09de03d90552533cce0f38985f0602f904f0aed0', name: "buttons", onSlotchange: (e) => this.handleButtonsSlotChange(e) })))), h("div", { key: '2499612267b3b2076d2b6a49f9a5410178c39e24', "data-focus-trap-edge": true, onFocus: this.handleBottomFocus, tabindex: "0" }))));
    }
    static get is() { return "ifx-modal"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["modal.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["modal.css"]
        };
    }
    static get properties() {
        return {
            "opened": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "attribute": "opened",
                "defaultValue": "false"
            },
            "caption": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "caption",
                "defaultValue": "\"Modal Title\""
            },
            "captionAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "caption-aria-label"
            },
            "closeOnOverlayClick": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "close-on-overlay-click",
                "defaultValue": "true"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"default\" | \"alert-brand\" | \"alert-danger\"",
                    "resolved": "\"alert-brand\" | \"alert-danger\" | \"default\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "variant",
                "defaultValue": "\"default\""
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"s\" | \"m\" | \"l\"",
                    "resolved": "\"l\" | \"m\" | \"s\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "size",
                "defaultValue": "\"s\""
            },
            "alertIcon": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "alert-icon",
                "defaultValue": "\"\""
            },
            "okButtonLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "ok-button-label",
                "defaultValue": "\"OK\""
            },
            "cancelButtonLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "cancel-button-label",
                "defaultValue": "\"Cancel\""
            },
            "closeButtonAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "close-button-aria-label"
            },
            "showCloseButton": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "show-close-button",
                "defaultValue": "true"
            }
        };
    }
    static get states() {
        return {
            "showModal": {},
            "slotButtonsPresent": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxOpen",
                "name": "ifxOpen",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "ifxClose",
                "name": "ifxClose",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "hostElement"; }
    static get watchers() {
        return [{
                "propName": "opened",
                "methodName": "openedChanged"
            }];
    }
}
//# sourceMappingURL=modal.js.map
