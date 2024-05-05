import { Email } from "../mail/email.js";
import { Component } from "./../../common/component.js";
import "./email-list.scss";

export class EmailslList extends Component {
    #filterData;

    constructor(appState) {
        super("div", "emails-list");
        this.appState = appState;
    }

    async getData(type) {
        const response = await fetch(`./${type}.json`);
        const data = await response.json();
        return data.data;
    }

    async render() {
        const html = `
            <div class="emails-list__title">
                <img src="./email.svg" alt="email">
                <p>Входящие: ${12}</p>
                <button>
                    <img src="./reload.svg" alt="reload">
                </button>
            </div>
        `;
        this.element.insertAdjacentHTML("beforeend", html);

        try {
            const clearFetch = await fetch("/api/clearData");
            const getFetch = await fetch("/api/getEmails");

            const data = await this.getData("data");

            if (this.appState.filterQuery !== "") {
                this.#filterData = data.filter(email => {
                    return email.theme === this.appState.filterQuery;
                });
            } else {
                this.#filterData = data;
            }

            for (const email of this.#filterData) {
                this.element.append(new Email(email).render());
            }

            return this.element;
        } catch (e) {
            console.log(e);
        }
    }
}
