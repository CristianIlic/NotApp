import React from "react";
import { Link } from "react-router-dom";

function Casa() {
  return (
    <div>
      <h1>this is home page</h1>
      <Link to="/products">
        {" "}
        <h4>Go to Products page</h4>
      </Link>
    </div>
  );
}

export default Casa;
