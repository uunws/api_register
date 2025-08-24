import express, {Request, Response} from "express";
import * as database from './user.database';
import {StatusCodes} from "http-status-codes";

export const userRouter = express.Router();

userRouter.get("/users", async (req: Request, res: Response) => {
//   res.json([]); // for testing
    try {
      const users = await database.findAll()
      res.json(users) // respond with user in API
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : "get error"});
    }
});

userRouter.post("/users", async(req:Request, res:Response) => {
    try {
      const {username, email, password} = req.body || {};

      if (!username || !email || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({error : "Please provide all require parameters"});
      }
      const user = await database.findByEmail(email);
      if (user) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({error : "This email is already taken"});
      }
      // now we are secure to create a user (after checking if condition above)
      const newUser = await database.create({username,email,password});
      res.json(newUser);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : "post error"});
    }
});