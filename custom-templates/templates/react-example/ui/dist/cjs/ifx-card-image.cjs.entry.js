'use strict';

var index = require('./index-BfM4jcLt.js');

const cardImageCss = () => `.card-image{width:100%;height:100%;vertical-align:bottom;object-fit:cover}`;

const CardImage = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.imgPosition = index.createEvent(this, "imgPosition", 7);
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
        return index.h("img", { key: '4d873a7dd8edba0b7e1dfb3696420beb6d1273d2', src: this.src, alt: this.alt, class: "card-image" });
    }
};
CardImage.style = cardImageCss();

exports.ifx_card_image = CardImage;
//# sourceMappingURL=ifx-card-image.entry.cjs.js.map

//# sourceMappingURL=ifx-card-image.cjs.entry.js.map