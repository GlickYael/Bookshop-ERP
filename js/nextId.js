class NextId {
    constructor(initialId) {
        this._id = initialId;
    }

    get id() {
        return this._id++;
    }

    set id(value) {
        this._id = value;
    }
}