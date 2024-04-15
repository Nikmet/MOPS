import { Component } from "../../common/component.js";
import "./email.scss";

export class Email extends Component {
    constructor() {
        super("div", "email");
    }

    render() {
        const html = `
            <div class="email__content">
                <div class="email__img">
                    <img src="./static/photo.jpg" alt="фото">
                </div>
                <div class="email__text">
                    <div class="email__sender">metlov.nm@yandex.ru</div>
                    <div class="email__title">Здорово, ублюдок, когда косарь вернешь?</div>
                </div>
            </div>
            <div class="email__buttons">
            </div>
        `;
        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }
}
