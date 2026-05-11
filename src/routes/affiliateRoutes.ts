import { Router } from 'express';
import { AffiliateController } from '../controllers/AffiliateController';

const router = Router();

router.get('/',              AffiliateController.index);    // Lista todos los afiliados
router.get('/new',           AffiliateController.newForm);  // Formulario para crear afiliado
router.post('/',             AffiliateController.create);   // Guarda nuevo afiliado
router.get('/:id',           AffiliateController.show);     // Detalle de un afiliado
router.get('/:id/edit',      AffiliateController.editForm); // Formulario para editar afiliado
router.put('/:id',           AffiliateController.update);   // Actualiza datos del afiliado
router.delete('/:id',        AffiliateController.delete);   // Elimina un afiliado
router.post('/:id/simulate', AffiliateController.simulate); // Simula descuento según membresía

export default router;
