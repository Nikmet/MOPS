import { Component } from "./../../common/component.js";
import "./menu.scss";

export class Menu extends Component {
    constructor(appState) {
        super("div", "menu");
        this.appState = appState;
    }

    render() {
        const html = `
            <a href="#email" class="new-email-btn">
                <img src="./new-email.svg" alt="Написать письмо">
                Написать письмо
            </a>
            <ul class="menu__list">
                <li class="menu__item">
                    <img src="./arrow-brown.svg" alt="стрелка">
                    <a href="#">
                        <img src="./pow.svg" alt="Входящие">
                        Входящие
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./paper-airplane.svg" alt="Входящие">
                        Отправленные
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./bone.svg" alt="Входящие">
                        Черновики
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./favorites.svg" alt="Входящие"> 
                        Избранное
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./spam.svg" alt="Входящие">
                        СПАМ!
                    </a>
                </li>
                <li class="menu__item">
                    <img src="./arrow-brown.svg" alt="стрелка" class="invissible">
                    <a href="#">
                        <img src="./close-brown.svg" alt="Входящие">
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
