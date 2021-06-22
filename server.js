const express = require('express')
const { spawn } = require('child_process')
const app = express()
const port = 3001

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/lyric', (req, res) => {
    let dataToSend;
    // spawn new child process to call the python script
    //  const python = spawn('python', ['script1.py']);
    const python = spawn('python', ['lyrics.py', req.body.lyrics.replace(/(?:\\[rn]|[\r\n]+)+/g, " ")]);
    // collect data from script
    python.stdout.on('data', function (data) {
        data2Send = data.toString()
        dataToSend = data2Send.split('.');
    });

    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        // send data to browser
        res.send(dataToSend)
    });
        // res.end()
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})