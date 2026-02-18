import { r as registerInstance, h } from './index-CA_siwAQ.js';

const downloadCss = () => ``;

const Download = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    tokens = "css";
    render() {
        const fileMap = {
            css: "css-variables.css",
            scss: "scss-variables.scss",
        };
        const fileName = `infineon-tokens.${this.tokens}`;
        const sourceFile = fileMap[this.tokens];
        const fileUrl = `https://raw.githubusercontent.com/Infineon/public-assets/main/ifx-tokens/${sourceFile}`;
        return (h("ifx-link", { key: '6a78e39f63cdb5d92d0ff2b6cffa0a5ebc50e1ec', onClick: (e) => {
                e.preventDefault();
                fetch(fileUrl)
                    .then((res) => res.blob())
                    .then((blob) => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                });
            }, href: fileUrl, download: fileName, class: "download__wrapper", size: "m", variant: "bold" }, h("slot", { key: 'c91c1d2f9b07addc610ecfb881e0124b2590e66f' })));
    }
};
Download.style = downloadCss();

export { Download as ifx_download };
//# sourceMappingURL=ifx-download.entry.js.map

//# sourceMappingURL=ifx-download.entry.js.map