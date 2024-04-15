import { VanillaContextMenu } from "vanilla-context-menu";
import { Component } from "./../../common/component.js";
import "./action-menu.scss";

export class ActionMenu extends Component {
    constructor() {
        super("button", "action-menu");
    }

    createMenuItem(imagePath, alt) {
        const html = `
            <li class="context-menu__item">
                <button>
                    <img src="${imagePath}" alt="${alt}">
                    Ответить
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

    render() {
        const html = `
            <div class="action-menu__crumb"></div>
            <div class="action-menu__crumb"></div>
            <div class="action-menu__crumb"></div>
        `;

        this.element.addEventListener("click", () => {
            this.createActionMenu();
            for (let i = 0; i < 1; i++) {
                this.createMenuItem("", "Отправить");
            }
        });

        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }
}
