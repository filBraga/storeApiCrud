// test file

const salesModel = require('../../../models/salesModel');
const salesServices = require('../../../services/salesServices');
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

  describe('quando existem products registrados no BD', () => {

    before(() => {
      sinon.stub(salesServices, 'getAll')
        .resolves();
    });

    after(() => {
      salesServices.getAll.restore();
    });


    it('retorna um array', async () => {
      const response = await salesServices.getAll();

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await salesServices.getAll();

      expect(response).to.be.not.empty;
    });

    it('o array possui itens do tipo objeto', async () => {
      const [item] = await salesServices.getAll();

      expect(item).to.be.an('object');
    });

    it('tais itens possui as propriedades: "id", "name" e "quantity"', async () => {
      const [item] = await salesServices.getAll();

      expect(item).to.include.all.keys('id', 'name', 'quantity')
    });
  })
})

describe(" salesServices => Insere um nova sale no BD", () => {
  describe("quando o payload informado não é válido", async () => {
    const payloadSales = {};

    it("retorna um boolean", async () => {
      const response = await salesServices.create(payloadSales);

      expect(response).to.be.a("boolean");
    });

    it('o boolean contém "false"', async () => {
      const response = await salesServices.create(payloadSales);

      expect(response).to.be.equal(false);
    });
  });

  describe("quando é inserido com sucesso", async () => {
    const payloadSales = {
      "id": 6,
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

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(MoviesModel, "create").resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      MoviesModel.create.restore();
    });

    it("retorna um objeto", async () => {
      const response = await salesServices.create(payloadSales);

      expect(response).to.be.a("object");
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await salesServices.create(payloadSales);

      expect(response).to.have.a.property("id");
    });
  });
});

describe(' salesServices => Busca sales by id', () => {
  describe('quando não existe nenhum product criado', () => {

    before(() => {
      sinon.stub(salesModel, 'getSaleProductsById')
        .resolves([]);
    });

    after(() => {
      salesModel.getSaleProductsById.restore();
    });

    it('retorna um array', async () => {
      const response = await salesServices.getSaleProductsById();

      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const response = await salesServices.getSaleProductsById();

      expect(response).to.be.empty;
    });
  })

  describe('quando existem products registrados no BD', () => {

    before(() => {
      sinon.stub(salesServices, 'getSaleProductsById')
        .resolves();
    });

    after(() => {
      salesServices.getSaleProductsById.restore();
    });


    it('retorna um array', async () => {
      const response = await salesServices.getSaleProductsById();

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await salesServices.getSaleProductsById();

      expect(response).to.be.not.empty;
    });

    it('o array possui itens do tipo objeto', async () => {
      const [item] = await salesServices.getSaleProductsById();

      expect(item).to.be.an('object');
    });

    it('tais itens possui as propriedades: "id", "name" e "quantity"', async () => {
      const [item] = await salesServices.getSaleProductsById();

      expect(item).to.include.all.keys('id', 'name', 'quantity')
    });
  })
})