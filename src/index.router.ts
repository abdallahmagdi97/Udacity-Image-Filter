import { Router, Request, Response } from 'express';
import { filterImageFromURL } from './util/util';

const router: Router = Router();

router.get( '/filteredimage/:image_url', async ( req: any, res: { send: (arg0: string) => void; } ) => {
    res.send("file");
    let { image_url } = req.params;
    var file = await filterImageFromURL(image_url);
    res.send( file);
  });

export const IndexRouter: Router = router;