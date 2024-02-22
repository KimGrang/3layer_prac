import express from 'express';
import bodyParser from 'body-parser';

import router from './routers/index.js';
import logMiddleware from './middleware/log.middleware.js';
import errorHandlingMiddleware from './middleware/error-handling.middleware.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(logMiddleware);
app.use(express.json())
app.use('/api', router)
app.use(errorHandlingMiddleware);

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});