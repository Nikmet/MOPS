import { Component } from "./../../common/component.js";
import "./emailPage.scss";

export class EmailPage extends Component {
    constructor() {
        super("div", "email-page");
    }

    render() {
        const html = `
            email редактор
        `;
        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }
}