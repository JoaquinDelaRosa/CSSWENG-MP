import express = require('express');
const serverless = require("serverless-http")
const path = require('path');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.json({"message": "This ran"});
});

export default  serverless(router);