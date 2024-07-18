exports.font = (req, res) => {
    res.sendFile(`${__dirname}/font/` + req.params["font"])
}
exports.css = (req, res)=> {
    res.sendFile(`${__dirname}/css/style.css`)
}
exports.img = (req, res)=> {
    res.sendFile(`${__dirname}/img/` + req.params["imgg"])
}
exports.script = (req, res)=> {
    res.sendFile(`${__dirname}/app/` + req.params["jsfiles"])
}