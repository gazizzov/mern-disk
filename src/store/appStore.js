import {makeAutoObservable} from "mobx";

class appStore {
    loader = false;

    constructor() {
        makeAutoObservable(this);
    }

    showLoader() {
        this.loader = true;
    }

    hideLoader() {
        this.loader = false;
    }


}

const a = new appStore();
export default a;