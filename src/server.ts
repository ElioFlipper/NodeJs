import express from 'express'
// import 'express-async-errors'
// import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

type Planet = {
    id: number,
    name: string,
};
type Planets = Planet[];
let planets: Planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];

app.get('/api/planets', (req, res) => {
    res.status(200).json(planets)
})

app.get('/api/planets/:id', (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    res.status(200).json(planet)
})

app.post("/api/planets", (req, res) => {
    const { id, name } = req.body
    const newPlanet = { id, name }
    planets = [...planets, newPlanet]
    res.status(201).json({ msg: "the planet was created" })
})

app.put("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((p) => (p.id === Number(id) ? ({ ...p, name }) : p))
    console.log(planets)
    res.status(200).json({ msg: "the planet was updated" })
})

app.delete("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    planets = planets.filter((p) => p.id !== Number(id))
    res.status(200).json({ msg: "the planet was deleted" })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})