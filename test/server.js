let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app/server");

let should = chai.should();

chai.use(chaiHttp);

describe("Brands", () => {
  describe("/GET brands", () => {
    it("it should GET all the brands", (done) => {
      // nothing to really arrange, so we can just into act
      chai
        .request(server)
        .get("/brands")
        // assert
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(5);
          done();
        });
    });
  });

  describe("/GET products in brand", () => {
    it("it should GET all the products in a brand", (done) => {
      // nothing to arrange
      chai
        .request(server)
        .get("/brands/1/products")
        .query({id: 1})
        // assert
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(3);
          res.body[0].should.be.an("object");
          done();
        });
    });

    it("it should fail if brand is not found", (done) => {
      // nothing to arrange
      chai
        .request(server)
        .get("/brands/6/products")
        .query({id: 6})
        // assert
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

describe("Products", () => {
  describe("/GET products", () => {
    it("it should GET all of the products with a relevant name", (done) => {
      // arrange
      let search = "sunglasses";
      // act
      chai
        .request(server)
        .get(`/products?query=${search}`)
        .query(search)
        // assert
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(2);
          done();
        });
    });

    it("it should GET all of the products with a relevant description", (done) => {
      // arrange
      let search = "AWFUL";
      // act
      chai
        .request(server)
        .get(`/products?query=${search}`)
        .query(search)
        // assert
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(1);
          done();
        });
    });

    it("it should return a 400 if the query is less than 3 letters", (done) => {
      // arrange
      let search = "in";
      // act
      chai
        .request(server)
        .get(`/products?query=${search}`)
        .query(search)
        // assert
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("it should return a 404 if no relevant products are found", (done) => {
      // arrange
      let search = "California";
      // act
      chai
        .request(server)
        .get(`/products?query=${search}`)
        .query(search)
        // assert
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
