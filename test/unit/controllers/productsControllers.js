// FILE TEST

const sinon = require('sinon');
const { expect } = require('chai');

const productServices = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');

// req, res, next

describe('PruductsControllers => Chamada do controller getAll', () => {
  describe('Quando não existem produtos no banco', () => {
    const response = {}
    const request = {}

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productServices, 'getAll').resolves([]);
    })

    after(() => {
      productServices.getAll.restore();
    })

    it('é retornado o metodo "status" passando o codigo 200', async () => {
      await productsController.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('é retornado o metodo json contendo um array', async () => {
      await productsController.getAll(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productServices, 'getAll')
        .resolves([
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
        ]);
    })

    after(() => {
      productServices.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productsController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });


  });

})