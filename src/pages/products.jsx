import React from "react";
import { Link } from "react-router-dom";

function Products() {
  return (
    <div>
      <h1>This is products page</h1>
      <h3>Select a product to continue...</h3>
      <ul>
        <li>
          <Link to="/products/product1">Product 1</Link>
        </li>
        <li>
          {" "}
          <Link to="/products/product2">Product 2</Link>
        </li>
        <li>
          {" "}
          <Link to="/products/product3">Product 3</Link>
        </li>
        <li>
          {" "}
          <Link to="/products/product4">Product 4</Link>
        </li>
        <li>
          {" "}
          <Link to="/products/product100">Product 100</Link>
        </li>
        <li>
          {" "}
          <Link to="/products/product1000">Product 1000</Link>
        </li>
        <li>
          {" "}
          <Link to="/products/caquita">Product 564654</Link>
        </li>
      </ul>
    </div>
  );
}

export default Products;
