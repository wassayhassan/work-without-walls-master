import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../Css Files/CreditCard.css";
const Creditcard = () => {
  const [CardNumber, setCardNumber] = useState("");
  const [CardCVC, setCardCVC] = useState("");
  const [CardExpiry, setCardExpiry] = useState("");
  const [CardHolderName, setCardHolderName] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");
  const validateCreditCard = async (e) => {
    if (CardHolderName === " ") {
      setErrorMessage1("Enter valid Credit Card holder Number!");
      return;
    } else if (CardCVC === " ") {
      setErrorMessage2("Enter valid Credit Card CVC!");
      return;
    } else if (CardExpiry === " ") {
      setErrorMessage3("Enter valid Credit Expiry Date!");
      return;
    } else if (CardNumber === " ") {
      setErrorMessage4("Enter valid Card Number!");
      return;
    } else {
      alert("Successful");
    }
  };
  return (
    <div className="padding">
      <div className="row">
        <div className="container-fluid d-flex justify-content-center">
          <div className="col-sm-8 col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-6">
                    <span>CREDIT/DEBIT CARD PAYMENT</span>
                  </div>
                  <div
                    className="col-md-6 text-right"
                    style={{ marginTop: "-5px" }}
                  >
                    <img
                      src="https://img.icons8.com/color/36/000000/visa.png"
                      alt=""
                      style={{ width: "3rem", height: "3rem" }}
                    />
                    <img
                      src="https://img.icons8.com/color/36/000000/mastercard.png"
                      alt=""
                      style={{ width: "3rem", height: "3rem" }}
                    />
                    <img
                      src="https://img.icons8.com/color/36/000000/amex.png"
                      alt=""
                      style={{ width: "3rem", height: "3rem" }}
                    />
                  </div>
                </div>
              </div>
              <div className="card-body" style={{ height: 350 }}>
                <div className="form-group">
                  <label htmlFor="cc-number" className="control-label">
                    CARD NUMBER
                  </label>
                  <input
                    id="cc-number"
                    value={CardNumber}
                    type="number"
                    className="input-lg form-control cc-number"
                    autoComplete="cc-number"
                    placeholder="•••• •••• •••• ••••"
                    required=""
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {errorMessage4}
                  </span>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cc-exp" className="control-label">
                        CARD EXPIRY
                      </label>
                      <input
                        value={CardExpiry}
                        id="cc-exp"
                        type="number"
                        className="input-lg form-control cc-exp"
                        placeholder="•• / ••"
                        required="true"
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {errorMessage3}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cc-cvc" className="control-label">
                        CARD CVC
                      </label>
                      <input
                        id="cc-cvc"
                        value={CardCVC}
                        type="number"
                        className="input-lg form-control cc-cvc"
                        autoComplete="off"
                        placeholder="•••"
                        required=""
                        onChange={(e) => setCardCVC(e.target.value)}
                      />
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {errorMessage2}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="numeric" className="control-label">
                    CARD HOLDER NAME
                  </label>
                  <input
                    type="text"
                    className="input-lg form-control"
                    value={CardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                  />
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {errorMessage1}
                  </span>
                </div>
                <div className="form-group text-center">
                  <Link to="/postYourGIG">
                    <Button
                      variant="success"
                      style={{ fontSize: ".8rem" }}
                      // onClick={<PostYourGIG />}
                    >
                      Make Payment
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creditcard;
