import { Component } from "./../../common/component.js";
import "./search.scss";

export class Search extends Component {
    constructor() {
        super("div", "search");
    }

    render() {
        const html = `
            <div class="search__buttons">
                <button class="search__button search__button-back">
                    <img src="./static/arrow-orange.svg" alt="Назад">
                </button>
                <button class="search__button search__button-forward">
                    <img src="./static/arrow-orange.svg" alt="Вперед">
                </button>
            </div>
            <div class="search__input">
                <input type="text" placeholder="Поиск по теме...">
                <button>
                    <img src="./static/search-brown.svg" alt="Поиск">
                </button>
            </div>
        `;
        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }
}
