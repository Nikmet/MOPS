import { MainView } from "./views/main/mainView";
import "./common/reset.scss";
import { EmalView } from "./views/emailView/emailView";

class App {
    routes = [
        { path: "", view: MainView },
        { path: "#email", view: EmalView },
    ];
    currentView;
    appState = {
        filterQuery: "",
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
        this.currentView.render(this.currentView);
    }
}

new App();
