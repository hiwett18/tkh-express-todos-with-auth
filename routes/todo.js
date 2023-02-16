import express from "express";
import prisma from "../db/index.js";

//Creates a new instance of a router
const router = express.Router();

// /todo
router.get("/", async (request, response) => {
  //Gets many todos from our database based on the login user
  const todos = await prisma.todo.findMany({
    where: {
      //request.user comes from passport and the data that was stored in the token's payload
      userId: request.user.id,
    },
    //Only chooses the fields you wish to get back from a table
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  response.status(200).json({
    success: true,
    todos,
  });
});

// /todo/new
router.post("/new", async (request, response) => {
  //Uses the ORM to create a new todo
  const newTodo = await prisma.todo.create({
    data: {
      name: request.body.name,
      description: request.body.description,
      userId: request.user.id,
    },
  });

  //If we get data back from the ORM
  if (newTodo) {
    //We can send a positive response to the client
    response.status(201).json({
      success: true,
    });
  } else {
    //If we get nothing back, send back an error code
    response.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;
