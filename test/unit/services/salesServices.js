// test file

const salesModel = require('../../../models/productsModel');
const salesServices = require('../../../services/productsServices');
const { expect } = require('chai');

const sinon = require('sinon')

describe(' salesServices => Busca de todos os products no BD', () => {
  describe('quando não existe nenhum product criado', () => {

    before(() => {
      sinon.stub(salesModel, 'getAll')
        .resolves([]);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await salesServices.getAll();

      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const response = await salesServices.getAll();

      expect(response).to.be.empty;
    });
  })

  // describe('quando existem products registrados no BD', () => {

  //   before(() => {
  //     sinon.stub(productServices, 'getAll')
  //       .resolves();
  //   });

  //   after(() => {
  //     productServices.getAll.restore();
  //   });


  //   it('retorna um array', async () => {
  //     const response = await productServices.getAll();

  //     expect(response).to.be.an('array');
  //   });

  //   it('o array não está vazio', async () => {
  //     const response = await productServices.getAll();

  //     expect(response).to.be.not.empty;
  //   });

  //   it('o array possui itens do tipo objeto', async () => {
  //     const [item] = await productServices.getAll();

  //     expect(item).to.be.an('object');
  //   });

  //   it('tais itens possui as propriedades: "id", "name" e "quantity"', async () => {
  //     const [item] = await productServices.getAll();

  //     expect(item).to.include.all.keys('id', 'name', 'quantity')
  //   });
  // })
})