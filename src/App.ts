import express, { Application } from 'express'
import morgan from 'morgan'
import TweetRoute from './routes/tweet.route'
import SignupRoute from "./routes/signup.route"


// Routes
import IndexRoutes from './routes/index.route'


// The following class creates the app and instantiates the server
export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
// private method that sets the port for the sever, to one from index.route.ts, and external .env file or defaults to 3000
    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
// private method to setting up the middleware to handle json responses, one for dev and one for prod
    private middlewares() {
        this.app.use(express.json());
    }
// private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
    private routes() {
        this.app.use(IndexRoutes);
        this.app.use("/apis/tweet", TweetRoute);
        this.app.use("apis/sign-up", SignupRoute)

    }
// starts the server and tells the terminal to post a message that the server is running and on what port
    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}