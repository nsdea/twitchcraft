import express from 'express'
import yaml from 'yamljs'
import path from 'path'
const app = express()



var commands = yaml.load(path.resolve(process.cwd(),'../../config/commands.yml')) // global configs

app.get('/', (_req: express.Request , res: express.Response) => {
    res.sendFile(path.resolve(process.cwd(), '../client/index.html'));
});

app.get('/list', (_req: express.Request, res: express.Response) => {
    console.log(commands);
    
    res.json(commands)
})
app.use(express.static('../client'))

app.listen(3000)