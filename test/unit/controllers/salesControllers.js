// FILE TEST

const sinon = require('sinon');
const { expect } = require('chai');

const saleServices = require('../../services/movieService');
const salesController = require('../../controllers/movieController');

// req, res, next

describe('Chamada do controller getAll', () => {
  describe('Quando não existem filmes no banco', () => {
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

  describe('quando existem filmes no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(saleServices, 'getAll')
        .resolves();
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