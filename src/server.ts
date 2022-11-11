import express from 'express';
import {filterImageFromURL, deleteLocalFile} from './util/util';
import { Request, Response } from "express";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(express.urlencoded({extended: true}));
  app.use(express.json())

  let fileSystem = require('fs');


  app.get("/filteredimage", async (request: Request, response: Response) => {
    let image_url:string = request.query.image_url.toString();
    console.log(image_url);
    if(!image_url){
      response.sendStatus(400).send("try GET /filteredimage?image_url={{??}}")
    }
    
    let path:string = await filterImageFromURL(image_url)
    console.log(path);
    if(!path){
      response.sendStatus(400).send("Error getting image!")
    }

    response.sendFile(path)

    response.on("close",function () {
      deleteLocalFile(path)
    })

  })
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (_req, res: { send: (arg0: string) => void; } ) => {
    res.send("try GET /filteredimage?image_url={{}}")
    //res.send("hello");
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();