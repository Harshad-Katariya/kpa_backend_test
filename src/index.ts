import express, { Application, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv';
import * as rfs from 'rotating-file-stream';
import path from 'path';
import 'reflect-metadata';
import morgan from 'morgan';
import bodyParser, { urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRoute from './routes/indexRoute';

dotenv.config()

const originalPath = path.resolve(__dirname, '../Uploads'); // Adjust the relative path
export default class Server {
    public app: Application

    constructor() {
        this.app = express()
        this.config();
        this.routes();
    }
    config(): void {
        this.app.set('port', process.env.PORT_NUM || 7000)
        var accessLogStream = rfs.createStream('access.log',
            {
                interval: '1d',
                path: path.join(__dirname, 'log')
            })

        this.app.use(morgan('combined', { stream: accessLogStream }));
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cookieParser())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use('/uploads', express.static(originalPath))
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            bodyParser.json()(req, res, err => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ message: 'Invalid input found' })
                }
                next();
            });
        });

    }
    routes(): void {
        this.app.use('/', indexRoute)
        this.app.all('*', function (req, res) {
            res.status(404).send({ message: '404! Page not found' });
        });
    }
    start(): void {
        this.app.listen(this.app.get('port'), process.env.HOST as string, () => {
            console.log('Server Is Running On :-', 'http' + ':' + '//' + process.env.HOST + ':' + process.env.PORT_NUM);
        })
        process.on('uncaughtException', (error) => {
            console.log('Oh my god, something terrible happened: ', error);
            process.exit(1);
        })

        process.on('unhandledRejection', (error, promise) => {
            console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
            console.log(' The error was: ', error);
        });
    }
}
const server = new Server();
server.start();