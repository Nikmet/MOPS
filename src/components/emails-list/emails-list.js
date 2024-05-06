import { Email } from "../mail/email.js";
import { Component } from "./../../common/component.js";
import "./email-list.scss";

export class EmailslList extends Component {
    #filterData;

    constructor(appState) {
        super("div", "emails-list");
        this.appState = appState;
    }

    async getEmails() {
        const res = await fetch("/api/getEmails", {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
            },
        });
        const data = await res.json();
        console.log(data);
    }

    async getData() {
        const response = await fetch(`./static/data.json`);
        const data = await response.json();
        return data;
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
            // const clearFetch = await fetch("/api/clearData");

            await this.getEmails();
            const data = await this.getData();

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
