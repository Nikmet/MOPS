import { EmailslList } from "../emails-list/emails-list.js";
import { Menu } from "../menu/menu.js";
import { Component } from "./../../common/component.js";
import "./main.scss";

export class Main extends Component {
    constructor(appState) {
        super("main", "main");
        this.appState = appState;
    }

    async render() {
        this.element.append(new Menu().render());
        this.element.append(await new EmailslList(this.appState).render());
        return this.element;
    }
}
