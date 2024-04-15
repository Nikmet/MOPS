import { Component } from "./../../common/component.js";
import "./menu.scss";

export class Menu extends Component {
    constructor(appState) {
        super("div", "menu");
        this.appState = appState;
    }

    render() {
        const html = `
            <button class="new-email-btn">
                <img src="./static/new-email.svg" alt="Написать письмо">
                Написать письмо
            </button>
            <ul class="menu__list">
                <li class="menu__item">
                    <img src="./static/arrow-brown.svg" alt="стрелка">
                    <a href="#">
                        <img src="./static/pow.svg" alt="Входящие">
                        Входящие
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./static/arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./static/paper-airplane.svg" alt="Входящие">
                        Отправленные
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./static/arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./static/bone.svg" alt="Входящие">
                        Черновики
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./static/arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./static/favorites.svg" alt="Входящие"> 
                        Избранное
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./static/arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./static/spam.svg" alt="Входящие">
                        СПАМ!
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./static/arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./static/close-brown.svg" alt="Входящие">
                        Удалённое
                    </a>
                </li>
            </ul>
            <p class="copyright">© ОАО “MOPS”</p>
        `;

        this.element.insertAdjacentHTML("beforeend", html);

        //! Переделать под текущую страницу
        const listOfItems = [...this.element.querySelectorAll(".menu__item")];
        for (const item of listOfItems) {
            item.addEventListener("click", () => {
                for (const item of listOfItems) {
                    item.querySelector("img").classList.add("invissible");
                }

                if (item.querySelector("img").classList.contains("invissible")) {
                    item.querySelector("img").classList.remove("invissible");
                }
            });
        }

        return this.element;
    }
}
