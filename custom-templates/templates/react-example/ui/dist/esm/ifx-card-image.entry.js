import { r as registerInstance, c as createEvent, h } from './index-CA_siwAQ.js';

const cardImageCss = () => `.card-image{width:100%;height:100%;vertical-align:bottom;object-fit:cover}`;

const CardImage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.imgPosition = createEvent(this, "imgPosition", 7);
    }
    src;
    alt;
    position;
    imgPosition;
    handlePosition(position) {
        this.imgPosition.emit(position);
    }
    componentWillLoad() {
        this.handlePosition(this.position);
    }
    componentDidUpdate() {
        this.handlePosition(this.position);
    }
    render() {
        return h("img", { key: '4d873a7dd8edba0b7e1dfb3696420beb6d1273d2', src: this.src, alt: this.alt, class: "card-image" });
    }
};
CardImage.style = cardImageCss();

export { CardImage as ifx_card_image };
//# sourceMappingURL=ifx-card-image.entry.js.map

//# sourceMappingURL=ifx-card-image.entry.js.map