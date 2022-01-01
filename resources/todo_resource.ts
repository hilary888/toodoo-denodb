import {Drash} from "../deps.ts";
import {Todos} from "../models/todos.ts";

export class TodoResource extends Drash.Resource {
    public paths = [
        "/todo",
        "/todo/:id"
    ];


    public async POST(
        request: Drash.Request,
        response: Drash.Response
    ): Promise<void> {
        const todoTitle: string = request.bodyParam("title")!;
        const todoBody: string = request.bodyParam("body")!;

        const result = await Todos.create({
            title: todoTitle,
            body: todoBody
        });

        return response.json({
            "success": true,
            "payload": result,
        });
    }


    public async GET(
        request: Drash.Request,
        response: Drash.Response
    ): Promise<void> {
        const todoId = request.pathParam("id");
        const id = parseInt(todoId || "");

        if (id && !(isNaN(id))) {
            return response.json({
                success: true,
                payload: await Todos.where({id: id}).get()
            })
        } else if (todoId === undefined) {
            return response.json({
                success: true,
                payload: await Todos.all()
            });
        } else {
            throw new Drash.Errors.HttpError(
                400,
                "There was an error processing your request"
            )
        }
        
    }


    public async PUT(
        request: Drash.Request,
        response: Drash.Response
    ): Promise<void> {
        const id = parseInt(request.pathParam("id") || "");
        const todoTitle: string = request.bodyParam("title")!;
        const todoBody: string = request.bodyParam("body")!;

        if(!id || isNaN(id)) {
            throw new Drash.Errors.HttpError(
                400,
                "This resource requires a todo id which is a number"
            );
        }

        // Update todo
        await Todos.where({id: id}) .update({
            title: todoTitle,
            body: todoBody
        });

        const todoRecord = await Todos.where({id: id}).get();

        return response.json({
            success: true,
            payload: todoRecord
        });
    }


    public async DELETE(
        request: Drash.Request,
        response: Drash.Response
    ): Promise<void> {
        const id = parseInt(request.pathParam("id") || "");
        if(!id || isNaN(id)) {
            throw new Drash.Errors.HttpError(
                400,
                "This resource requires a todo id which is a number"
            );
        }

        return response.json({
            success: true,
            payload: await Todos.deleteById(id),
        });
    }
}