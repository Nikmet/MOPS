export class AbstractView {
    
    constructor() {
        this.app = document.getElementById('root')
    }

    seTitle(title) {
        document.title = title;
    }

    render() {
        return;
    }
    destroy() {
        return;
    }
}
