export class Component {
    element;
    tag;
    className;

    constructor(tag, className) {
        this.tag = tag;
        this.className = className;
        this.element = document.createElement(tag);
        this.element.classList.add(className);
    }

    render() {
        return this.element;
    }
}
