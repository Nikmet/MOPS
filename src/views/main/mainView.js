import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { Main } from "../../components/main/main.js";

export class MainView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.seTitle("MOPS email - Входящие");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if (path === "#") {
            this.render();
        }
    }

    render() {
        this.app.innerHTML = "";
        this.app.append(new Header(this.appState).render());
        this.app.append(new Main().render());
    }
}
