import { r as registerInstance, c as createEvent, a as getElement, h, d as Host } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

function animationTo(element, keyframes, options) {
    const animated = element.animate(keyframes, { ...options, fill: "both" });
    animated.addEventListener("finish", () => {
        animated.commitStyles();
        animated.cancel();
    });
    return animated;
}
const keyframeDefaults = {
    easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
};
const KEYFRAMES = {
    fadeIn: [
        {
            offset: 0,
            ...keyframeDefaults,
            opacity: 0,
        },
        {
            offset: 1,
            ...keyframeDefaults,
            opacity: 1,
        },
    ],
    fadeOut: [
        {
            offset: 0,
            ...keyframeDefaults,
            opacity: 1,
        },
        {
            offset: 1,
            ...keyframeDefaults,
            opacity: 0,
        },
    ],
};

/**
 * Copy/pasted from https://github.com/andreasbm/focus-trap
 */
/**
 * Traverses the slots of the open shadowroots and returns all children matching the query.
 * We need to traverse each child-depth one at a time because if an element should be skipped
 * (for example because it is hidden) we need to skip all of it's children. If we use querySelectorAll("*")
 * the information of whether the children is within a hidden parent is lost.
 * @param {ShadowRoot | HTMLElement} root
 * @param skipNode
 * @param isMatch
 * @param {number} maxDepth
 * @param {number} depth
 * @returns {HTMLElement[]}
 */
function queryShadowRoot(root, skipNode, isMatch, maxDepth = 20, depth = 0) {
    const matches = [];
    // If the depth is above the max depth, abort the searching here.
    if (depth >= maxDepth) {
        return matches;
    }
    // Traverses a slot element
    const traverseSlot = ($slot) => {
        // Only check nodes that are of the type Node.ELEMENT_NODE
        // Read more here https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        const assignedNodes = $slot
            .assignedNodes()
            .filter((node) => node.nodeType === 1);
        if (assignedNodes.length > 0) {
            const $slotParent = assignedNodes[0].parentElement;
            return queryShadowRoot($slotParent, skipNode, isMatch, maxDepth, depth + 1);
        }
        return [];
    };
    // Go through each child and continue the traversing if necessary
    // Even though the typing says that children can't be undefined, Edge 15 sometimes gives an undefined value.
    // Therefore we fallback to an empty array if it is undefined.
    const children = Array.from(root.children || []);
    for (const $child of children) {
        // Check if the element and its descendants should be skipped
        if (skipNode($child)) {
            // console.log('-- SKIP', $child);
            continue;
        }
        // console.log('$child', $child);
        // If the element matches we always add it
        if (isMatch($child)) {
            matches.push($child);
        }
        if ($child.shadowRoot != null) {
            // If the element has a shadow root we need to traverse it
            matches.push(...queryShadowRoot($child.shadowRoot, skipNode, isMatch, maxDepth, depth + 1));
        }
        else if ($child.tagName === "SLOT") {
            // If the child is a slot we need to traverse each assigned node
            matches.push(...traverseSlot($child));
        }
        else {
            // Traverse the children of the element
            matches.push(...queryShadowRoot($child, skipNode, isMatch, maxDepth, depth + 1));
        }
    }
    return matches;
}
/**
 * Returns whether the element is hidden.
 * @param $elem
 */
function isHidden($elem) {
    return ($elem.hasAttribute("hidden") ||
        ($elem.hasAttribute("aria-hidden") &&
            $elem.getAttribute("aria-hidden") !== "false") ||
        // A quick and dirty way to check whether the element is hidden.
        // For a more fine-grained check we could use "window.getComputedStyle" but we don't because of bad performance.
        // If the element has visibility set to "hidden" or "collapse", display set to "none" or opacity set to "0" through CSS
        // we won't be able to catch it here. We accept it due to the huge performance benefits.
        $elem.style.display === `none` ||
        $elem.style.opacity === `0` ||
        $elem.style.visibility === `hidden` ||
        $elem.style.visibility === `collapse`);
    // If offsetParent is null we can assume that the element is hidden
    // https://stackoverflow.com/questions/306305/what-would-make-offsetparent-null
    // || $elem.offsetParent == null;
}
/**
 * Returns whether the element is disabled.
 * @param $elem
 */
function isDisabled($elem) {
    return ($elem.hasAttribute("disabled") ||
        ($elem.hasAttribute("aria-disabled") &&
            $elem.getAttribute("aria-disabled") !== "false"));
}
/**
 * Determines whether an element is focusable.
 * Read more here: https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194
 * Or here: https://stackoverflow.com/questions/18261595/how-to-check-if-a-dom-element-is-focusable
 * @param $elem
 */
function isFocusable($elem) {
    // Discard elements that are removed from the tab order.
    if ($elem.getAttribute("tabindex") === "-1" ||
        isHidden($elem) ||
        isDisabled($elem)) {
        return false;
    }
    return (
    // At this point we know that the element can have focus (eg. won't be -1) if the tabindex attribute exists
    $elem.hasAttribute("tabindex") ||
        // Anchor tags or area tags with a href set
        (($elem instanceof HTMLAnchorElement || $elem instanceof HTMLAreaElement) &&
            $elem.hasAttribute("href")) ||
        // Form elements which are not disabled
        $elem instanceof HTMLButtonElement ||
        $elem instanceof HTMLInputElement ||
        $elem instanceof HTMLTextAreaElement ||
        $elem instanceof HTMLSelectElement ||
        // IFrames
        $elem instanceof HTMLIFrameElement);
}

const modalCss = () => `:host{display:block}.modal-container{display:none;justify-content:center;align-items:center;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1060;overflow-y:auto;font-family:var(--ifx-font-family)}.modal-container.open{display:flex}.modal-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#1D1D1D;opacity:0.5;z-index:0}.modal-content-container{position:absolute;display:flex;justify-content:center;width:90%;min-height:218px;background-color:#fff;border-radius:0;box-shadow:0 2px 10px rgba(0, 0, 0, 0.1);box-sizing:border-box;align-items:stretch}.modal-content-container.no-overflow{overflow:hidden}.modal-content-container.no-overflow .modal-body{overflow-y:auto}@media screen and (min-width: 768px){.modal-content-container{width:540px;min-height:132px}.modal-content-container.m,.modal-content-container.l,.modal-content-container.s{width:90%}}@media screen and (min-width: 1024px){.modal-content-container.s{width:47vw}.modal-content-container.m{width:63vw}.modal-content-container.l{width:80%}}.modal-content{display:flex;flex-direction:column;width:100%;max-height:90vh}.modal-icon-container{display:flex;align-items:center;justify-content:center;width:32px;background-color:#0A8276;align-self:stretch}.modal-icon-container.danger{background-color:#CD002F}.modal-icon-container ifx-icon{color:#FFFFFF}.modal-header{display:flex;justify-content:space-between;align-items:center;padding:24px;min-height:76px;max-height:105px;box-sizing:border-box;border-radius:1px 1px 0px 0px;border-bottom:1px solid #EEEDED}.modal-caption{max-height:56px;display:-webkit-box;overflow:hidden;white-space:pre-wrap;word-wrap:break-word;-webkit-line-clamp:2;-webkit-box-orient:vertical}.modal-header h2{margin:0;font-weight:600;font-size:1.25rem;line-height:28px}.modal-header button{background:none;border:none;font-size:1.5em;padding:0;cursor:pointer}.modal-close-button{align-self:flex-start;margin-right:-8px}.modal-body{padding:16px 24px;min-height:56px;box-sizing:border-box;flex:1}.modal-footer.buttons-present ::slotted(*){display:flex;justify-content:flex-end;gap:16px;padding:16px 24px 32px 16px}.modal-border{display:flex;align-items:center;justify-content:center;width:100%;font-size:1.5em;flex-grow:1}.modal-border.primary{background-color:#0A8276}.modal-border.secondary{background-color:#575352}.modal-border.danger{background-color:#CD002F}.modal-border.success{background-color:#4CA460}.modal-border.warning{background-color:#E16B25}.modal-border.orange{background-color:#E16B25}.modal-border.ocean{background-color:#0A8276}.modal-border.grey{background-color:#575352}.modal-border.grey-200{background-color:#EEEDED}.modal-border.red{background-color:#CD002F}.modal-border.green{background-color:#4CA460}.modal-border.berry{background-color:#9C216E}`;

const IfxModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxOpen = createEvent(this, "ifxOpen", 7);
        this.ifxClose = createEvent(this, "ifxClose", 7);
    }
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
    get hostElement() { return getElement(this); }
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
    static get watchers() { return {
        "opened": [{
                "openedChanged": 0
            }]
    }; }
};
IfxModal.style = modalCss();

export { IfxModal as ifx_modal };
//# sourceMappingURL=ifx-modal.entry.js.map

//# sourceMappingURL=ifx-modal.entry.js.map