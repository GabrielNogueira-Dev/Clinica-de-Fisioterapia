import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export const validateSchema = (schema:ZodType) => async (req:Request, res:Response, next: NextFunction) => {
    try{
        await schema.parseAsync({
            body: req.body,
            query:req.query,
            params:req.params
        })
        return next();
    }catch(err){
        if(err instanceof ZodError){
            return res.status(400).json({
                error: "Error de validacao zod",
                details: err.issues.map(issue => ({
                    campo: issue.path.slice(1).join("."),
                    mensagens: issue.message
                }))
            })
        }
        return res.status(500).json({
            err: "Error interno do servidor"
        })
    }
}