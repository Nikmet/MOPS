import { EmailslList } from "../emails-list/emails-list.js";
import { Menu } from "../menu/menu.js";
import { Component } from "./../../common/component.js";
import "./main.scss";

export class Main extends Component {
    constructor() {
        super("main", "main");
    }

    render() {
        this.element.append(new Menu(this.appState).render());
        this.element.append(new EmailslList(this.appState).render());
        return this.element;
    }
}
