(function () {
    'use strict';
    const express = require('express');
    const cors = require('cors');
    const morgan = require('morgan');
    const cookieParser = require('cookie-parser');
    const { tokenAPI } = require('./components/token');

    const app = express();
    app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
    app.use(morgan('dev'))
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser('some_secret_1234'));

    app.get("/", (req, res) => {
        return res.json({ message: 'Wellcome to Drive ' });
    });
    //router
    app.use('/api', tokenAPI);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    const port = process.env.PORT || 3000;


    // process.on('uncaughtException', (error) => {
    //     console.log(error, 'error uncaughtException');
    // })

    // process.on('SIGTERM', (error) => {
    //     console.log(error, 'error SIGTERM');
    // })

    // process.once("SIGUSR2", () => server.close(err => process.kill(process.pid, "SIGUSR2")));

    server.listen(port, () => console.log(`Server running🔥 on http://localhost:3000`)).on('error', console.log);
    // http.listen(port, () => {
    //     console.log('server is running on port http://localhost:3000');
    // });


    module.exports = app;

}());

