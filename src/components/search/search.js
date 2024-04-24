import { Component } from "./../../common/component.js";
import "./search.scss";

export class Search extends Component {
    constructor(appState) {
        super("div", "search");
        this.appState = appState;
    }

    render() {
        const html = `
            <div class="search__buttons">
                <button class="search__button search__button-back">
                    <img src="./arrow-orange.svg" alt="Назад">
                </button>
                <button class="search__button search__button-forward">
                    <img src="./arrow-orange.svg" alt="Вперед">
                </button>
            </div>
            <div class="search__input">
                <input type="text" placeholder="Поиск по теме...">
                <button class="filter-btn">
                    <img src="./search-brown.svg" alt="Поиск">
                </button>
            </div>
        `;

        this.element.insertAdjacentHTML("beforeend", html);

        this.element.addEventListener("click", e => {
            if (e.target.closest(".filter-btn")) {
                e.preventDefault();
                this.appState.filterQuery = this.element.querySelector("input").value;
                this.element.querySelector("input").focus();
            }
        });

        this.element.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.appState.filterQuery = this.element.querySelector("input").value;
                this.element.querySelector("input").focus();
            }
        });

        return this.element;
    }
}
