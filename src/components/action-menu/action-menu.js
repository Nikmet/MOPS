import { Component } from "./../../common/component.js";
import "./action-menu.scss";

export class ActionMenu extends Component {
    constructor() {
        super("button", "action-menu");
        this.arrOfActions = [
            { name: "Ответить", path: "./static/answer.svg" },
            { name: "Переслать", path: "./static/send-arrow.svg" },
            { name: "СПАМ!", path: "./static/spam.svg" },
            { name: "Прочитать", path: "./static/read.svg" },
            { name: "Избранное", path: "./static/favorites.svg" },
            { name: "Удалить", path: "./static/close-brown.svg" },
        ];
        this.opened = false;
    }

    createMenuItem(imagePath, name) {
        const html = `
            <li class="context-menu__item">
                <button>
                    <img src="${imagePath}" alt="${name}">
                    ${name}
                </button>
            </li>
        `;

        this.element.querySelector(".context-menu__list").insertAdjacentHTML("beforeend", html);
        return this.element;
    }

    createActionMenu() {
        const html = `
            <div class="context-menu">
                <div class="context-menu__title">
                    Действия с письмом
                </div>
                <ul class="context-menu__list"></ul>
            </div>
        `;

        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }

    removeActionMenu() {
        this.element.querySelector(".context-menu").remove();
    }

    render() {
        const html = `
            <div class="action-menu__crumb"></div>
            <div class="action-menu__crumb"></div>
            <div class="action-menu__crumb"></div>
        `;

        this.element.addEventListener("click", event => {
            if (!event.target.closest(".context-menu")) {
                if (!this.opened) {
                    this.createActionMenu();
                    for (const item of this.arrOfActions) {
                        this.createMenuItem(item.path, item.name);
                    }
                    this.opened = true;
                } else {
                    this.removeActionMenu();
                    this.opened = false;
                }
            }
        });

        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }
}
