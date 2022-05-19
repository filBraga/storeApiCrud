const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe(' salesModel => Busca todos os filme no BD', () => {
  describe('quando não existe nenhum sales criado', () => {

    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute)
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    })

    it('o array está vazio', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.empty;
    })
  });

  describe('quando existem sales registrado no BD', () => {
    const resultExecute = [
      {
        "saleId": 1,
        "date": "2022-05-19T13:43:01.000Z",
        "saleId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-05-19T13:43:01.000Z",
        "saleId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-05-19T13:43:01.000Z",
        "saleId": 3,
        "quantity": 15
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
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    })

    it('o array não esta vazio', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.be.an('object');
    })

    it('o objeto que esta no array contem os atributos saleId, date, saleId e quantity ', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'saleId',
        'quantity',
      )
    })
  })
})

describe("Insere uma nova sale no BD", () => {
  const payloadMovie = {
    "id": 1,
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

  before(async () => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("quando é inserido com sucesso", async () => {
    it("retorna um objeto", async () => {
      const response = await salesModel.createSales(payloadMovie);

      expect(response).to.be.a("object");
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await salesModel.createSales(payloadMovie);

      expect(response).to.have.a.property("id");
    });
  });
});

// describe("salesModel => Ao chamar o controller de createSales", () => {
//   describe("quando o payload informado não é válido", async () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {};

//       response.status = sinon.stub().returns(response);
//       response.send = sinon.stub().returns();

//       sinon.stub(salesModel, "createSales").resolves(false);
//     });

//     after(() => {
//       salesModel.createSales.restore();
//     });

//     it("é chamado o status com o código 400", async () => {
//       await salesModel.createSales(request, response);

//       expect(response.status.calledWith(400)).to.be.equal(true);
//     });

//     it('é chamado o send com a mensagem "Dados inválidos"', async () => {
//       await salesModel.createSales(request, response);

//       expect(response.send.calledWith("Dados inválidos")).to.be.equal(true);
//     });
//   });

//   describe("quando é inserido com sucesso", async () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {
//         "id": 4,
//         "itemsSold": [
//           {
//             "productId": 1,
//             "quantity": 2
//           },
//           {
//             "productId": 2,
//             "quantity": 5
//           }
//         ]
//       };

//       response.status = sinon.stub().returns(response);
//       response.send = sinon.stub().returns();

//       sinon.stub(salesModel, "createSales").resolves(true);
//     });

//     after(() => {
//       salesModel.createSales.restore();
//     });

//     it("é chamado o status com o código 201", async () => {
//       await salesModel.createSales(request, response);

//       expect(response.status.calledWith(201)).to.be.equal(true);
//     });

//     it('é chamado o send com a mensagem "Sales criado com sucesso!"', async () => {
//       await salesModel.createSales(request, response);

//       expect(response.send.calledWith("sale criado com sucesso!")).to.be.equal(
//         true
//       );
//     });
//   });
// });

// describe("salesModel => Ao chamar o controller de createSalesProducts", () => {
//   describe("quando o payload informado não é válido", async () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {};

//       response.status = sinon.stub().returns(response);
//       response.send = sinon.stub().returns();

//       sinon.stub(salesModel, "createSalesProducts").resolves(false);
//     });

//     after(() => {
//       salesModel.createSalesProducts.restore();
//     });

//     it("é chamado o status com o código 400", async () => {
//       await salesModel.createSalesProducts(request, response);

//       expect(response.status.calledWith(400)).to.be.equal(true);
//     });

//     it('é chamado o send com a mensagem "Dados inválidos"', async () => {
//       await salesModel.createSalesProducts(request, response);

//       expect(response.send.calledWith("Dados inválidos")).to.be.equal(true);
//     });
//   });

//   describe("quando é inserido com sucesso", async () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {
//         "id": 4,
//         "itemsSold": [
//           {
//             "productId": 1,
//             "quantity": 2
//           },
//           {
//             "productId": 2,
//             "quantity": 5
//           }
//         ]
//       };

//       response.status = sinon.stub().returns(response);
//       response.send = sinon.stub().returns();

//       sinon.stub(salesModel, "createSalesProducts").resolves(true);
//     });

//     after(() => {
//       salesModel.createSalesProducts.restore();
//     });

//     it("é chamado o status com o código 201", async () => {
//       await salesModel.createSalesProducts(request, response);

//       expect(response.status.calledWith(201)).to.be.equal(true);
//     });

//     it('é chamado o send com a mensagem "Sales criado com sucesso!"', async () => {
//       await salesModel.createSalesProducts(request, response);

//       expect(response.send.calledWith("sale criado com sucesso!")).to.be.equal(
//         true
//       );
//     });
//   });
// });