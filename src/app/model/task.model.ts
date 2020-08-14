export class Task {
    _id: string;
    name: string;
    description: string;
    isDone: boolean;

    constructor(
        id: string,
        name: string,
        description: string,
        isDone: boolean
    ){
        this._id = id;
        this.name = name;
        this.description = description;
        this.isDone = isDone;
    }
}