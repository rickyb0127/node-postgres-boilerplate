import { initDbSchema } from "./db";
import { DB_User } from './models/DB_User';
const express = require('express');
import type { Request, Response } from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server started on port ${port}`));

initDbSchema();

app.get("/api/v1/users", async(req: Request, res: Response) => {
  try {
    const users = await DB_User.findAll();

    res.send({
      status: 200,
      users
    });
  } catch(err) {
    res.send({
      status: 400,
      err
    });
  }
});

app.post("/api/v1/user", async(req: Request, res: Response) => {
  try {
    const user = await DB_User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    res.send({
      status: 200,
      user
    });
  } catch(err) {
    res.send({
      status: 400,
      err
    });
  }
});