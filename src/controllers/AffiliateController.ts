import { Request, Response } from 'express';
import { AffiliateModel, MembershipType } from '../models/AffiliateModel';

export const AffiliateController = {
  // GET /affiliates
  index(req: Request, res: Response): void {
    const affiliates = AffiliateModel.getAll();
    res.render('affiliates/index', { affiliates });
  },

  // GET /affiliates/new
  newForm(req: Request, res: Response): void {
    res.render('affiliates/form', { title: 'Nuevo afiliado', action: '/affiliates', method: 'POST' });
  },

  // POST /affiliates
  create(req: Request, res: Response): void {
    const { firstName, lastName, email, membershipType } = req.body;
    AffiliateModel.create({ firstName, lastName, email, membershipType });
    res.redirect('/affiliates');
  },

  // GET /affiliates/:id
  show(req: Request, res: Response): void {
    const affiliate = AffiliateModel.getById(Number(req.params.id));
    if (!affiliate) { res.status(404).send('Afiliado no encontrado'); return; }
    res.render('affiliates/show', { affiliate });
  },

  // GET /affiliates/:id/edit
  editForm(req: Request, res: Response): void {
    const affiliate = AffiliateModel.getById(Number(req.params.id));
    if (!affiliate) { res.status(404).send('Afiliado no encontrado'); return; }
    res.render('affiliates/form', {
      title: 'Editar afiliado',
      action: `/affiliates/${affiliate.id}?_method=PUT`,
      method: 'POST',
      affiliate,
    });
  },

  // PUT /affiliates/:id
  update(req: Request, res: Response): void {
    const { firstName, lastName, email, membershipType } = req.body;
    AffiliateModel.update(Number(req.params.id), { firstName, lastName, email, membershipType });
    res.redirect('/affiliates');
  },

  // DELETE /affiliates/:id
  delete(req: Request, res: Response): void {
    AffiliateModel.delete(Number(req.params.id));
    res.redirect('/affiliates');
  },

  // POST /affiliates/:id/simulate
  simulate(req: Request, res: Response): void {
    const affiliate = AffiliateModel.getById(Number(req.params.id));
    if (!affiliate) { res.status(404).send('Afiliado no encontrado'); return; }

    const amount = Number(req.body.amount);
    const result = AffiliateModel.calculateDiscount(affiliate.membershipType as MembershipType, amount);

    res.render('affiliates/show', {
      affiliate,
      simulation: {
        amount,
        discount: result.discount,
        finalPrice: result.finalPrice,
      },
    });
  },
};
