import { Email } from "../mail/email.js";
import { Component } from "./../../common/component.js";
import "./email-list.scss";

export class EmailslList extends Component {
    constructor(appState) {
        super("div", "emails-list");
        this.appState = appState;
    }

    async getData() {
        const response = await fetch("./static/data.json");
        const data = await response.json();
        return data.data;
        this.filterData;
    }

    async render() {
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

        const data = await this.getData();

        if (this.appState.filterQuery !== "") {
            this.filterData = data.filter(email => {
                return email.theme === this.appState.filterQuery;
            });
            console.log(this.filterData);
        } else {
            this.filterData = data;
        }

        for (const email of this.filterData) {
            this.element.append(new Email(email).render());
        }

        return this.element;
    }
}
