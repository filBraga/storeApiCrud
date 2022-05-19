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

    // before(() => {
    //   sinon.stub(model, 'getSingle')
    //     .resolves([]);
    // });


    // after(() => {
    //   model.getSingle.restore();
    // });

    it('retorna um array', async () => {
      const response = await service.getSingle(1);

      expect(response).to.be.an('array');
    });
  })
})

//Create
describe(`${item} => ${mscLayer} => create`, () => {
  describe(`Negative ${item} in DB`, () => {

    const payload =   [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    it('retorna um array', async () => {
      const response = await service.create(payload);

      expect(response).to.be.a('object');
    });
  })
})