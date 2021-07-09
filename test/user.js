const chai = require("chai")
const chaiHTTP = require("chai-http")
const server = require("../server")
const userInput = require("./userInput.json")
const mocha = require("mocha")


//Assertion style
chai.should();

chai.use(chaiHTTP);

/**
 * @description Test case for registering new user.
 *              Contains both positive and negative cases.
 */
  describe('POST', () => {
    it('givenData_whenValid', (done) => {
      const userDetails = userInput.registerUserPass;
      chai
        .request(server)
        .post('/register')
        .send(userDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('User registered successfully');
          res.body.should.have.property('data').which.is.an('object');
          err ? done(err) : done();
          
        });
    });
  
    it('givenData_whenFirstNameIsInValid_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserFirstNameFail1;
    chai
      .request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql(
            `"firstName" with value "${userDetails.firstName}" fails to match the required pattern: /^[A-Z]{1}[A-Za-z]{2,}/` ||
              'Some error occurred while adding user'
          );
        res.body.should.have.property('data').should.be.a('object');
        err ? done(err) : done();
      });
  });

  it('givenData_whenLastNameIsInValid_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserLastNameFail2;
    chai
      .request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql(
            `"lastName" with value "${userDetails.lastName}" fails to match the required pattern: /^[A-Z]{1}[A-Za-z]{2,}/` ||
            'Some error occurred while adding user'
          );
        res.body.should.have.property('data').should.be.a('object');
        err ? done(err) : done();
      });
  });
 
  it('givenData_whenEmailIsInValid_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserEmailFail;
    chai
      .request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql(
            `"email" with value "${userDetails.email}" fails to match the required pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/`
          );
        res.body.should.have.property('data').should.be.a('object');
        err ? done(err) : done();
      });
  });
});

/**
 * @description: User Login test cases.
 *               Contains positive and negative scenarios.
 */
describe('POST - User Login', () => {
 
     it('givenLoginDetails_whenInValidEmailAndValidPassword_shouldReturnError', (done) => {
        const userCredentials = userInput.userLoginWrongEmailFail;
        chai
          .request(server)
          .post('/Login')
          .send(userCredentials)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message')
            .eql('Email not found');
            err ? done(err) : done();
          });
      });

      it('givenDetails_whenValidEmailAndInValidPassword_shouldReturnError', (done) => {
        const userCredentials = userInput.userLoginWrongPasswordFail;
        chai
          .request(server)
          .post('/Login')
          .send(userCredentials)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Incorrect password');
            err ? done(err) : done();
          });
      });
})
    
    
    


    
  