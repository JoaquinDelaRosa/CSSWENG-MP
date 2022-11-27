import express = require('express');
const path = require('path');
const router = express.Router();

router.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

export default router;