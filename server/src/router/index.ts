

import * as koaRouter from 'koa-router';
import controller from '../controller';

const router = new koaRouter();
const {GameEvilPersonController,GameNameFilterController} = controller;

router
.get('/api/find', GameEvilPersonController.find)
.post('/api/add', GameEvilPersonController.add)
.post('/api/update', GameEvilPersonController.update)
.post('/api/updateMany', GameEvilPersonController.updateMany)
.post('/api/orc', GameNameFilterController.orc)
.post('/api/delete', GameEvilPersonController.delete)
.post('/api/filter/add', GameNameFilterController.add)
.post('/api/findNameMany', GameEvilPersonController.findNameMany)


export default router;
