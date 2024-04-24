import { Component } from "../../common/component.js";
import "./email.scss";

export class Email extends Component {
    constructor(data) {
        super("div", "email");
        this.data = data;
        this.theme = data.theme;
    }

    render() {
        const html = `
            <div class="email__content">
                <div class="email__img">
                    <img src="./photo.jpg" alt="фото">
                </div>
                <div class="email__text">
                    <div class="email__sender">${this.data.sender}</div>
                    <div class="email__title">${this.data.title}</div>
                </div>
            </div>
            <div class="email__buttons">
            </div>
        `;
        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }
}
