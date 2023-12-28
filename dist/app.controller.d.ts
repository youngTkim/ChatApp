import { Response, Request } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    isLogged(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signup({ id, password }: {
        id: string;
        password: string;
    }): Promise<void>;
    login({ id, password }: {
        id: string;
        password: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
