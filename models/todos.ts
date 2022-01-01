import { Model, DataTypes } from "../deps.ts";


export class Todos extends Model {
    static table = "todos";
    static timestamps = true;

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            length: 255,
            type: DataTypes.STRING
        },
        body: {

            type: DataTypes.STRING
        },
    }
}
