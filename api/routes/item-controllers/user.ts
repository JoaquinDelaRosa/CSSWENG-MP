/*
 * GET users listing.
 */
import express from 'express';
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("respond with a resource");
});

export default router;