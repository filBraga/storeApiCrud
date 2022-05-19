const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe(' productsModel => Busca todos os filme no BD', () => {
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
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    })

    it('o array está vazio', async () => {
      const result = await productsModel.getAll();

      expect(result).to.be.empty;
    })
  });

  describe('quando existem products registrado no BD', () => {
    const resultExecute = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América",
        "quantity": 30
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
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    })

    it('o array não esta vazio', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.be.an('object');
    })

    it('o objeto que esta no array contem os atributos id, title e directedBy ', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      )
    })
  })
})