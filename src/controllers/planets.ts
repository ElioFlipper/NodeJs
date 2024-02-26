import {db} from '.././db.js'
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets`)
    res.status(200).json(planets)
}
const getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id = $1`, Number(id))
    res.status(200).json(planet)
}


const create = async (req: Request, res: Response) => {
    const { name } = req.body
    const newPlanet = { name }
    const planet = await db.none(`INSERT INTO planets (name) VALUES ($1)`, name)
    res.status(201).json({ msg: "the planet was created" })
}


const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const planets = await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])
    res.status(200).json({ msg: "the planet was updated" })
}


const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const planets = await db.none(`DELETE FROM planets WHERE id=$1`, Number(id))
    res.status(200).json({ msg: "the planet was deleted" })
}

const createImage =  async (req: Request, res: Response) => {
    console.log(req.file);
    const {id} =  req.params;
    const fileName = req.file?.path

    if (fileName) {
        db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
        res.status(201).json({msg :"Image created successfully"})
    } else {
        res.status(400).json({msg :"Image not created"})
    }
}

export { getAll, getOneById, create, updateById, deleteById, createImage }