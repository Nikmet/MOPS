import { MainView } from "./views/main/mainView";
import "./common/reset.scss";

class App {
    routes = [{ path: "", view: MainView }];

    appState = {
        isMainPage: false,
    };

    constructor() {
        window.addEventListener("hashchange", this.route.bind(this));
        this.route();
    }

    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }

        const view = this.routes.find(r => r.path == location.hash).view;
        this.currentView = new view(this.appState);
        if (this.currentView instanceof MainView) {
            this.appState.isMainPage = true;
        } else {
            this.appState.isMainPage = false;
        }
        this.currentView.render();
    }
}

new App();
