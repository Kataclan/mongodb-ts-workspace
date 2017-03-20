import * as express from 'express';
import G from '../globals/G'

import sadmin from './services/SAdmin';
import suser from './services/SUser';


var router = express.Router();

// API ROUTES
router.use('/api/sadmin', sadmin);
router.use('/api/suser', suser);

export default router;
