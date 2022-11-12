import axios from "axios";
import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [CNIC, setCNIC] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlesubmit = () => {
    if (newPassword !== reEnterPassword) {
      alert("Passwords are not same...");
      return;
    } else {
      setIsLoading(true);
      axios
        .put("/auth/reset-password", {
          CNIC,
          password: newPassword,
        })
        .then((res) => {
          setIsLoading(false);
          alert("Your password has been reset");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <div>
      <input
        type="number"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder="CNIC Number"
        value={CNIC}
        onChange={(e) => setCNIC(e.target.value)}
      />

      <input
        type="password"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder="Re-type Password"
        value={reEnterPassword}
        onChange={(e) => setReEnterPassword(e.target.value)}
      />
      <button onClick={handlesubmit} type="button" className="btn btn-primary">
        {isLoading ? "Loading ..." : "SUBMIT"}
      </button>
    </div>
  );
};

export { ForgotPasswordPage };
