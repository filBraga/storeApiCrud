const sinon = require('sinon');
const { expect } = require('chai');

const item = 'sale' //in single
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
    const resultExecute = {
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
    }

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves([resultExecute])
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await model.getAll();
      expect(result).to.be.an('object');
    })

    it('o array não esta vazio', async () => {
      const result = await model.getAll();
      expect(result).to.be.not.empty;
    })

  });

})

// Create
describe(`${item} => ${mscLayer} => createSales`, () => {
  describe("Negative Payload", async () => {
    const payloadError =  [];
    const payload =  [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];

    before(async () => {
      const execute = [{ insertId: 1 }];
  
      sinon.stub(connection, "execute").resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it(`${item} => ${mscLayer} => status: 400`, async () => {
      const response = await model.createSales(payloadError);

      expect(response).to.be.a('number');
    });

  //   it(`${item} => ${mscLayer} => "Dados inválidos"`, async () => {
  //     await model.createSales(payloadError);

  //     expect(response.json.calledWith({message: "Dados inválidos"})).to.be.equal(true);
  //   });
  });

  // describe(`${item} => ${mscLayer} => success`, async () => {
  //   const response = {};
  //   const request = {};

  //   before(() => {
  //     request.body = {
  //       "name": "martelo",
  //       "quantity": 10
  //     }	;

  //     response.status = sinon.stub().returns(response);
  //     response.send = sinon.stub().returns();
  //     response.json = sinon.stub().returns();

  //     sinon.stub(service, "create").resolves(true);
  //   });

  //   after(() => {
  //     service.createSales.restore();
  //   });

  //   it(`${item} => ${mscLayer} => status: 201`, async () => {
  //     await controller.createSales(request, response);

  //     expect(response.status.calledWith(201)).to.be.equal(true);
  //   });

  //   it(`${item}  => ${mscLayer} => success!`, async () => {
  //     await controller.createSales(request, response);

  //     expect(response.json.calledWith(true)).to.be.equal(
  //       true
  //     );
  //   });
  // });
});