const sinon = require('sinon');
const { expect } = require('chai');

const item = 'product' //in single
const mscLayer = 'Model' //in single

const service = require(`../../../services/${item}sServices`);
const controller = require(`../../../controllers/${item}sControllers`);
const model = require(`../../../models/${item}sModels`);

const connection = require('../../../models/connection');


// Get All
describe(`${item} => ${mscLayer} => getAll`, () => {
  describe(`Negative ${item} in DB`, () => {
    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute)
    })

    after(() => {
      connection.execute.restore();
    })

    it(`${item} => ${mscLayer} => return arr`, async () => {
      const result = await model.getAll();
      expect(result).to.be.an('array');
    })

    it(`${item} => ${mscLayer} => array: empty`, async () => {
      const result = await model.getAll();
      expect(result).to.be.empty;;
    })
  })

  describe(`Positive ${item} in DB`, async () => {
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
      const result = await model.getAll();
      expect(result).to.be.an('array');
    })

    it('o array não esta vazio', async () => {
      const result = await model.getAll();
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const [result] = await model.getAll();
      expect(result).to.be.an('object');
    })


  });

})

// Create
describe(`${item} => ${mscLayer} => create`, () => {
  describe("Negative Payload", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      response.json = sinon.stub().returns();

      sinon.stub(service, "create").resolves(false);
    });

    after(() => {
      service.create.restore();
    });

    it(`${item} => ${mscLayer} => status: 400`, async () => {
      await controller.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it(`${item} => ${mscLayer} => "Dados inválidos"`, async () => {
      await controller.create(request, response);

      expect(response.json.calledWith({message: "Dados inválidos"})).to.be.equal(true);
    });
  });

  describe(`${item} => ${mscLayer} => success`, async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        "name": "martelo",
        "quantity": 10
      }	;

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      response.json = sinon.stub().returns();

      sinon.stub(service, "create").resolves(true);
    });

    after(() => {
      service.create.restore();
    });

    it(`${item} => ${mscLayer} => status: 201`, async () => {
      await controller.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it(`${item}  => ${mscLayer} => success!`, async () => {
      await controller.create(request, response);

      expect(response.json.calledWith(true)).to.be.equal(
        true
      );
    });
  });
});