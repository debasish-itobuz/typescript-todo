import todoModel from "../models/todoModel";
import { Request, Response } from 'express'
import { todoValidation } from "../validators/todoValidators";

const postTodo = async (req: Request, res: Response) => {
    try {
        const parsedData = todoValidation.safeParse(req.body);
        if (!parsedData.success) {
            const messages = parsedData.error.issues.map((err) => err.message)
            return res.status(400).send({ errors: messages, message: "error" });
        }

        const data = await todoModel.create(parsedData.data)
        return res.status(200).send({ data: data, success: "200", message: "Data added successfully" })

    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: err, success: "400", message: "Data not added" })
    }
}

const getTodo = async (req: Request, res: Response) => {
    try {
        const data = await todoModel.find()
        return res.status(200).send({ data: data, success: "200", message: "Data fetched successfully" })
    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: null, success: "400", message: "Data not fetched" })
    }
}

const getTodoById = async (req: Request, res: Response) => {
    try {
        const data = await todoModel.findById(req.query.id)
        return res.status(200).send({ data: data, success: "200", message: "Data fetched successfully" })
    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: null, success: "400", message: "Data not fetched" })
    }
}

const updateTodo = async (req: Request, res: Response) => {
    try {
        const parsedData = todoValidation.safeParse(req.body);
        if (!parsedData.success) {
            const messages = parsedData.error.issues.map((err) => err.message)
            return res.status(400).send({ errors: messages, message: "error" });
        }

        const data = await todoModel.findByIdAndUpdate(req.query.id, parsedData.data)
        return res.status(200).send({ data: data, success: "200", message: "Data updated successfully" })

    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: err, success: "400", message: "Data not updated" })
    }
}

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const data = await todoModel.findByIdAndDelete(req.query.id)
        return res.status(200).send({ data: data, success: "200", message: "Data Deleted successfully" })
    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: null, success: "400", message: "Data not deleted" })
    }
}

const filterTodo = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        const data = await todoModel.find({ status: status })
        return res.status(200).send({ data: data, success: "200", message: "Data fetched successfully" })
    } catch (err) {
        console.log("Error", err)
        return res.status(400).send({ data: null, success: "400", message: "Data not fetched" })

    }
}

export { postTodo, getTodo, getTodoById, updateTodo, deleteTodo, filterTodo }