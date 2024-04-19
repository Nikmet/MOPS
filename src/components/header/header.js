import { ActionMenu } from "../action-menu/action-menu.js";
import { Search } from "../search/search.js";
import { Component } from "./../../common/component.js";
import "./header.scss";

export class Header extends Component {
    constructor(appState) {
        super("header", "header");
        this.appState = appState;
    }

    render() {
        const html = `
            <a href="#">
                <img src="./static/logo.svg" alt="Логотип">
            </a>
        `;
        this.element.insertAdjacentHTML("beforeend", html);

        if (this.appState.isMainPage) {
            this.element.append(new Search(this.appState).render());
        }
        this.element.append(new ActionMenu().render());
        return this.element;
    }
}
