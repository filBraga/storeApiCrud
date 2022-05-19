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

  describe("salesControllers => Ao chamar o controller de create", () => {
    describe("quando o payload informado não é válido", async () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
  
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
  
        sinon.stub(saleServices, "create").resolves(false);
      });
  
      after(() => {
        saleServices.create.restore();
      });
  
      it("é chamado o status com o código 400", async () => {
        await salesController.create(request, response);
  
        expect(response.status.calledWith(400)).to.be.equal(true);
      });
  
      it('é chamado o send com a mensagem "Dados inválidos"', async () => {
        await salesController.create(request, response);
  
        expect(response.send.calledWith("Dados inválidos")).to.be.equal(true);
      });
    });
  
    describe("quando é inserido com sucesso", async () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {
          "id": 3,
          "itemsSold": [
            {
              "productId": 1,
              "quantity": 2
            },
            {
              "productId": 2,
              "quantity": 5
            }
          ]
        };
  
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
  
        sinon.stub(saleServices, "create").resolves(true);
      });
  
      after(() => {
        saleServices.create.restore();
      });
  
      it("é chamado o status com o código 201", async () => {
        await salesController.create(request, response);
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é chamado o send com a mensagem "Product criado com sucesso!"', async () => {
        await salesController.create(request, response);
  
        expect(response.send.calledWith("Product criado com sucesso!")).to.be.equal(
          true
        );
      });
    });

})})