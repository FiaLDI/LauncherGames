const fs = require('fs');
const child_process = require('child_process');
const path = require('path');

const express = require("express");
const consolidate = require('consolidate');

const app = express();
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views/`);

const urlencodedParser = express.urlencoded({extended: false});

const citeRouter = require('./Router');
app.use(citeRouter);
let curGames = [];
let curPage = 'index';

app.get('/', (req, res)=> {
    res.render(curPage, {
        title: 'Launcher',
    })
});

app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    
    let curCommand = JSON.parse(JSON.stringify(request.body));
    console.log(curCommand)

    if (curCommand.add_game) {
        let pathGame = path.resolve(__dirname, 'games')
        fs.readdir( pathGame,(err, files) => {
            curGames = []
            files.forEach((val, idx) => {
                fs.rename(path.resolve(pathGame, val), path.resolve(pathGame, val.replace(' ', '')), (err) => {
                    return;
                } )
                curGames.push({
                    name: `${val}`,
                    cmd: path.resolve(pathGame, val.replace(' ', '')),
                })
                
            })
            
        })
        setTimeout(()=>{
            fs.writeFile(`${__dirname}/json/games_config.json`, JSON.stringify(curGames, null, 2), (err) => {
            if(err) {
                return;
            }
        }) 
        }, 1000)
        
    }

    if (curCommand.start_cmd) {
        child_process.exec(`start ${curCommand.start_cmd}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
        })
    }

    response.render(curPage, {
        title: 'Launcher',
        games: curGames,
    })
    
});

   
app.listen(3000, ()=>console.log("Сервер запущен..."));
