/**
 * Created by chao
 */

import * as koaRouter from 'koa-router';
import controller from '../controller';

const router = new koaRouter();
const {GameEvilPersonController} = controller;

router
.get('/api/find', GameEvilPersonController.find)
.post('/api/add', GameEvilPersonController.add)
.post('/api/update', GameEvilPersonController.update)
.post('/api/updateMany', GameEvilPersonController.updateMany)
.delete('/api/delete', GameEvilPersonController.delete)

export default router;
