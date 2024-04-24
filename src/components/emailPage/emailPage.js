import { Component } from "./../../common/component.js";
import "./emailPage.scss";

export class EmailPage extends Component {
    constructor() {
        super("div", "email-page");
    }

    render() {
        const html = `
            <div class="email-page__wrapper">
                <div class="email-page__recipients-wrapper">
                    <div class="email-page__recipients">
                        <p>Кому:</p>
                        <div class="email-page__recipient">
                            <button>
                                <img src="./close-brown.svg" alt="remove">
                            </button>
                            <p>metlov.nm@yandex.ru</p>
                        </div>
                    </div>
                    <button>
                        <p>+</p>
                    </button>
                </div>
                <div class="email-page__theme">
                    <label for="theme">Тема:</label>
                    <input type="text" id="theme">
                </div>
                <div class="email-page__attachments-wrapper">
                    <div class="email-page__attachments">
                        <div class="email-page__attachment email-page__attachment-excel">
                            <img src="./excel.svg" alt="excel file">
                            <p>Table.xlsx</p>
                            <button>
                                <img src="./close-white.svg" alt="remove">
                            </button>
                        </div>
                        <div class="email-page__attachment email-page__attachment-word">
                            <img src="./word.svg" alt="word file">
                            <p>Document.docx</p>
                            <button>
                                <img src="./close-white.svg" alt="remove">
                            </button>
                        </div>                    
                    </div>
                    <button>
                        <img src="./paper-clip.png" alt="add attachment">
                    </button>
                </div>
                <textarea id="email-text" placeholder="Текст письма"></textarea>
                <div class="email-page__btns">
                    <button class="email-page__btn email-page__btn-draft">Сохранить в черновики</button>                
                    <button class="email-page__btn email-page__btn-send">Отправить</button>                
                </div>
            </div>
        `;
        this.element.insertAdjacentHTML("beforeend", html);
        return this.element;
    }
}
