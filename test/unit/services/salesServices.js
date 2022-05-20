const sinon = require('sinon');
const { expect } = require('chai');

const item = 'sale' //in single
const mscLayer = 'Service' //in single

const service = require(`../../../services/${item}sServices`);
const controller = require(`../../../controllers/${item}sControllers`);
const model = require(`../../../models/${item}sModels`);

const productsControllers = require(`../../../controllers/productsControllers`);

// Get All
describe(`${item} => ${mscLayer} => getAll`, () => {
  describe(`Negative ${item} in DB`, () => {

    before(() => {
      sinon.stub(model, 'getAll')
        .resolves([]);
    });


    after(() => {
      model.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await service.getAll();

      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const response = await service.getAll();

      expect(response).to.be.empty;
    });
  })

  describe('quando existem products registrado no BD', () => {

    before(() => {
      sinon.stub(model, 'getAll')
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
    });

    after(() => {
      model.getAll.restore();
    });


    it('retorna um array', async () => {
      const response = await service.getAll();

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await service.getAll();

      expect(response).to.be.not.empty;
    });

    it('o array possui itens do tipo objeto', async () => {
      const [item] = await service.getAll();

      expect(item).to.be.an('object');
    });
  })
})


// Get Single
describe(`${item} => ${mscLayer} => getSingle`, () => {
  describe(`Negative ${item} in DB`, () => {

    before(() => {
      sinon.stub(model, 'getSaleById')
        .resolves([]);
    });


    after(() => {
      model.getSaleById.restore();
    });

    it('retorna um array', async () => {
      const response = await service.getSingle(4);

      expect(response).to.be.an('array');
    });
  })
})

// getSaleProductsById
describe(`${item} => ${mscLayer} => getSaleProductsById`, () => {
  describe(`Negative ${item} in DB`, () => {

    before(() => {
      sinon.stub(model, 'getSaleById')
        .resolves([[]]);
    });


    after(() => {
      model.getSaleById.restore();
    });

    it('retorna um error', async () => {

      try {
        const response = await service.getSaleProductsById(4);
      } catch (error) {
        console.log(error);
        expect(error.status.calledWith(404)).to.be.equal(true);;
      }
      

      
    });
  })
})