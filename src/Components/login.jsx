import React, { useState } from "react";

function Login() {
  const [userOne, setUserOne] = useState();
  const [userTwo, setuserTwo] = useState();
  const [show, setShow] = useState(true);



  const  handleUsers = (e) => {
    if (userOne.length > 0 && userTwo.length > 0) {
      localStorage.setItem("userOne", userOne);
      localStorage.setItem("userTwo", userTwo);
      setShow(false);
    } else {
      alert("Plese enter name");
    }
    e.preventDefault();
  }

  return (
    <>
      {show && (
        <>
          <div className="container-login">
            <div className="login">
              <h3>Welcome To Tik Tok Tow</h3>
              <form>
                <label>
                  Player "X"
                  <input
                    onChange={(e) => setUserOne((prev) => e.target.value)}
                    type="text"
                    name="nameone"
                    required
                  ></input>
                </label>
                <label>
                  Player "O"
                  <input
                    onChange={(e) =>  setuserTwo((prev) => e.target.value)}
                    type="text"
                    name="nametwo"
                    required
                  ></input>
                </label>
                <div className="container-btn">
                  <button type="supmit" className="btn" onClick={handleUsers}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="background"></div>
        </>
      )}
    </>
  );
}

export default Login;
