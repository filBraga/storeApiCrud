const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe(' salesModel => Busca todos os filme no BD', () => {
  describe('quando não existe nenhum products criado', () => {

    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute)
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    })

    it('o array está vazio', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.empty;
    })
  });

  describe('quando existem products registrado no BD', () => {
    const resultExecute = [
      {
        "saleId": 1,
        "date": "2022-05-19T13:43:01.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-05-19T13:43:01.000Z",
        "productId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-05-19T13:43:01.000Z",
        "productId": 3,
        "quantity": 15
      }
    ]

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves([resultExecute])
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    })

    it('o array não esta vazio', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.be.an('object');
    })

    it('o objeto que esta no array contem os atributos saleId, date, productId e quantity ', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity',
      )
    })
  })
})