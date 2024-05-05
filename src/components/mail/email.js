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
                    <div class="email__title">${this.data.theme}</div>
                </div>
            </div>
            <div class="email__buttons">
                <button class="email__buttons-read">
                    <img src="./read.svg" alt="read">                
                </button>
                <button class="email__buttons-spam">
                    <img src="./spam.svg" alt="spam">                
                </button>
                <button class="email__buttons-favorites">
                    ${this.data.favorites ? '<img src="./favorites-done.svg" alt="favorites">' : '<img src="./favorites.svg" alt="favorites">'}        
                </button>
                <button class="email__buttons-delete">
                    <img src="./close-brown.svg" alt="delete">                
                </button>
            </div>
        `;

        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }
}
