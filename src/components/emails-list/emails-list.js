import { Email } from "../mail/email.js";
import { Component } from "./../../common/component.js";
import "./email-list.scss";

export class EmailslList extends Component {
    constructor(appState) {
        super("div", "emails-list");
        this.appState = appState;
    }

    render() {
        const html = `
            <div class="emails-list__title">
                <img src="./static/email.svg" alt="email">
                <p>Входящие: ${12}</p>
                <button>
                    <img src="./static/reload.svg" alt="reload">
                </button>
            </div>
        `;
        this.element.insertAdjacentHTML("beforeend", html);

        this.element.append(new Email().render());
        this.element.append(new Email().render());
        this.element.append(new Email().render());
        this.element.append(new Email().render());
        this.element.append(new Email().render());
        this.element.append(new Email().render());
        this.element.append(new Email().render());
        this.element.append(new Email().render());
        this.element.append(new Email().render());
        this.element.append(new Email().render());
        this.element.append(new Email().render());

        return this.element;
    }
}
