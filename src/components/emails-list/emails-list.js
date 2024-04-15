import { Component } from "./../../common/component.js";
import "./email-list.scss";

export class EmaislList extends Component {
    constructor(appState) {
        super("div", "emails-list");
        this.appState = appState;
    }

    render() {
        const html = `
            emails
        `;
        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }
}