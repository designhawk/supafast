'use strict';

var index = require('./index-BfM4jcLt.js');

const segmentCss = () => `.segment{display:flex;align-items:center;justify-content:center;gap:8px;position:relative;border:1px solid #BFBBBB;border-radius:1px;padding:0 8px 0 8px;height:34px;background-color:#FFFFFF;transition:all 100ms ease;transition-property:color, background;font:600 0.875rem/1.25rem "Source Sans 3"}.segment:focus-visible{color:#FFFFFF;background-color:#0A8276}.segment:hover{color:#FFFFFF;background-color:#08665C;cursor:pointer}.segment:active{background-color:#06534B}.segment.segment--selected{color:#FFFFFF;background-color:#0A8276}.segment.segment--small{height:30px}.segment::after{position:absolute;top:0;left:0;width:100%;height:100%;outline:1px solid #BFBBBB;border-radius:1px;content:""}`;

const Segment = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.segmentSelect = index.createEvent(this, "segmentSelect", 5);
    }
    segmentSelect;
    icon;
    segmentIndex;
    selected = false;
    value;
    handleSegmentClick() {
        if (this.selected)
            return;
        this.selected = true;
        this.segmentSelect.emit(this.segmentIndex);
    }
    handleSegmentKeyDown(event) {
        if (event.code === "Enter" || event.code === "Space") {
            if (this.selected)
                return;
            this.selected = true;
            this.segmentSelect.emit(this.segmentIndex);
        }
    }
    render() {
        return (index.h("div", { key: '507508f20c8f117612d0026ef64ec0eed2a60d39', class: `segment ${this.selected ? "segment--selected" : ""}`, tabIndex: 0, onClick: () => {
                this.handleSegmentClick();
            }, onKeyDown: (e) => {
                this.handleSegmentKeyDown(e);
            } }, index.h("ifx-icon", { key: '4327359a404e54a7c3050b28f464cca7e4ab516f', icon: this.icon }), " ", index.h("slot", { key: '06b002eb7f16b55c839ef1003cce515c3ef065e3' })));
    }
};
Segment.style = segmentCss();

exports.ifx_segment = Segment;
//# sourceMappingURL=ifx-segment.entry.cjs.js.map

//# sourceMappingURL=ifx-segment.cjs.entry.js.map