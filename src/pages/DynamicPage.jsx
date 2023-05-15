import React from "react";
import { useParams } from "react-router-dom";

function DynamicPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>This is a dynamic page for {id} </h1>
    </div>
  );
}

export default DynamicPage;
