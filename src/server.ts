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

  //CORS Should be restricted 
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
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
  /**************************************************************************** */

  //! END @TODO1
  
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