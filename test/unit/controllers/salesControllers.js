// FILE TEST

const sinon = require('sinon');
const { expect } = require('chai');

const saleServices = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesController');

// req, res, next

describe('salesControllers => Chamada do controller getAll', () => {
  describe('Quando não existem vendas no banco', () => {
    const response = {}
    const request = {}

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleServices, 'getAll').resolves([]);
    })

    after(() => {
      saleServices.getAll.restore();
    })

    it('é retornado o metodo "status" passando o codigo 200', async () => {
      await salesController.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('é retornado o metodo json contendo um array', async () => {
      await salesController.getAll(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('quando existem sales no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(saleServices, 'getAll')
        .resolves([
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
        ]);
    })

    after(() => {
      saleServices.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await salesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });


  });

})