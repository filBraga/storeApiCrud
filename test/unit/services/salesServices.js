const sinon = require('sinon');
const { expect } = require('chai');

const item = 'sale' //in single
const mscLayer = 'Service' //in single

const service = require(`../../../services/${item}sServices`);
const controller = require(`../../../controllers/${item}sControllers`);

const productsControllers = require(`../../../controllers/productsControllers`);

// Get All
describe(`${item} => ${mscLayer} => getAll`, () => {
  describe(`Negative ${item} in DB`, () => {
    const response = {}
    const request = {}

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(service, 'getAll').resolves([]);
    })

    after(() => {
      service.getAll.restore();
    })

    it(`${item} => ${mscLayer} => status: 200`, async () => {
      await controller.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it(`${item} => ${mscLayer} => json: array`, async () => {
      await controller.getAll(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe(`Positive ${item} in DB`, async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(service, 'getAll')
        .resolves([]);
    })

    after(() => {
      service.getAll.restore();
    });

    it(`${item} => ${mscLayer} => status: 200`, async () => {
      await controller.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it(`${item} => ${mscLayer} => json: array`, async () => {
      await controller.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });


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
      await productsControllers.create(request, response);

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