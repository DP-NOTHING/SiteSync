import React from "react";
import { useParams } from "react-router";
export default DeployDetail = () => {
  const { id } = useParams();
  return <div>Details for {id}</div>;
};
