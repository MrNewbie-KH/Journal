import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { Category } from "@prisma/client";
import prisma from "../prisma/prisma";
const createCategory = asyncWrapper(async (req:Request,res:Response,next:NextFunction)=>{
    const category:Category = {...req.body};
    const data = await prisma.category.create({data:category})
    res.status(200).json({data})

});
const getAllCategories = asyncWrapper(async (req:Request,res:Response,next:NextFunction)=>{
    const data = await prisma.category.findMany()
    res.status(200).json({data})

});
const updateCategory = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const categoryId = req.params.id;
    const data = await prisma.category.update({
        where: { id: categoryId },
        data: { name: name }
    });
    res.status(200).json({ data });
});
const deleteCategory = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;
    const data = await prisma.category.delete({
        where: { id: categoryId }
    });
    res.status(201).json({ message:"Category deleted successfully" });
});

export {createCategory,getAllCategories,updateCategory,deleteCategory} 