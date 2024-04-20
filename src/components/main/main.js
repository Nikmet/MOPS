import { EmalView } from "../../views/emailView/emailView.js";
import { EmailPage } from "../emailPage/emailPage.js";
import { EmailslList } from "../emails-list/emails-list.js";
import { Menu } from "../menu/menu.js";
import { Component } from "./../../common/component.js";
import "./main.scss";

export class Main extends Component {
    constructor(appState, currentView) {
        super("main", "main");
        this.appState = appState;
        this.currentView = currentView;
    }

    async render() {
        this.element.append(new Menu().render());

        if (!(this.currentView instanceof EmalView)) {
            this.element.append(await new EmailslList(this.appState).render());
        } else {
            this.element.append(new EmailPage().render());
        }

        return this.element;
    }
}
