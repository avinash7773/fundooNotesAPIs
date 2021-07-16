const chai = require("chai")
const chaiHTTP = require("chai-http")
const server = require("../server")
const userInput = require("./userInput.json")
const mocha = require("mocha")
const { message } = require("../app/middleware/uservalidator")
const should = require("should")


//Assertion style
chai.should()

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
          err ? done(err) :
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('User registered successfully');
          res.body.should.have.property('data').which.is.an('object');
          done()
      });
    });
  
    it('givenData_whenFirstNameIsInValid_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserFirstNameFail1;
    chai
      .request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        err ? done(err) :
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
        done()
      });
  });

  it('givenData_whenLastNameIsInValid_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserLastNameFail2;
    chai
      .request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        err ? done(err) :
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
        done()
      });
  });
 
  it('givenData_whenEmailIsInValid_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserEmailFail;
    chai
      .request(server)
      .post('/register')
      .send(userDetails)
      .end((err, res) => {
        err ? done(err) :
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql(
            `"email" with value "${userDetails.email}" fails to match the required pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/`
          );
        res.body.should.have.property('data').should.be.a('object');
        done()
      });
  });
});

/**
 * @description: User Login test cases.
 *               Contains positive and negative scenarios.
 */
describe('POST - User Login', () => {
      it('givenLoginDetails_whenValidEmailAndValidPassword', (done) =>{
        const userCredentials = userInput.userLoginPass;
        chai
          .request(server)
          .post('/Login')
          .send(userCredentials)
          .end((err, res) => {
            err ? done(err) :
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message')
            .eql('Log in Successfully!!!!')
            done()
        })
      })
 
     it('givenLoginDetails_whenInValidEmailAndValidPassword_shouldReturnError', (done) => {
        const userCredentials = userInput.userLoginWrongEmailFail;
        chai
          .request(server)
          .post('/Login')
          .send(userCredentials)
          .end((err, res) => {
            err ? done(err) :
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message')
            .eql('Email not found');
            done()
        });
      });

      it('givenDetails_whenValidEmailAndInValidPassword_shouldReturnError', (done) => {
        const userCredentials = userInput.userLoginWrongPasswordFail;
        chai
          .request(server)
          .post('/Login')
          .send(userCredentials)
          .end((err, res) => {
            err ? done(err) :
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Incorrect password');
            done()
        });
      });
})

/**
 * @description : test cases for forgotpassword api
 *               Contains positive and negative scenarios.
 *                
 */
describe('Post-ForgotPassword', () =>{
  it('givenDetails_whenValidEmail', (done) => {
    const email = userInput.userForgotPasswordPass;
    chai
      .request(server)
      .post('/forgotpassword')
      .send(email)
      .end((err, res) => {
        err ? done(err) :
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('link sent Successfully!!!!');
        done()
      });
  })

  it('givenDetails_whenInValidEmail', (done) => {
    const email = userInput.userForgotPasswordFail;
    chai
      .request(server)
      .post('/forgotpassword')
      .send(email)
      .end((err, res) => {
        err ? done(err) :
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Email not found');
        done()
      }); 
  });
  
  it('givenDetails_EmailUserIsNotRegister', (done) => {
    const email = userInput.userForgotPasswordFail1
    chai
      .request(server)
      .post('/forgotpassword')
      .send(email)
      .end((err, res) => {
        err ? done(err) :  
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Email not found');
        done()
      }); 
  }); 

})

describe('Post-ResetPassword', () => {
  it('givenDetails_whenValidNewPasswordAndValidToken',  () => {
    let password = userInput.userForgotPasswordPass;
    let inputToken = userInput.userResetPasswordToken;
    chai
      .request(server)
      .put('/resetpassword')
      .set('token',inputToken)
      .send(password)
      .end((err, res) => {
        err ? (err) : 
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Password reset Successfully!!!');
        
      });
  })

  it('givenDetails_whenInValidNewPasswordAndValidToken',  () => {
    let password = userInput.userForgotPasswordPass;
    let inputToken = userInput.userResetPasswordToken;
    chai
      .request(server)
      .put('/resetpassword')
      .set('token',inputToken)
      .send(password)
      .end((err, res) => {
        err ? err : 
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message')
        .eql(`"password" with value "${password.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/` ||
        'Invalid password!!!!');
    });
  })

  it('givenDetails_whenValidNewPasswordAndInValidToken',  () => {
    let password = userInput.userForgotPasswordPass;
    let inputToken = userInput.userResetPasswordWrongToken;
    chai
      .request(server)
      .put('/resetpassword')
      .set('token',inputToken)
      .send(password)
      .end((err, res) => {
        err ? err : 
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message')
        .eql(`"password" with value "${password.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/` ||
        'Invalid password!!!!');
    });
  })

}) 
