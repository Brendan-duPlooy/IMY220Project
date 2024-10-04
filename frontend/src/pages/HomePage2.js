import React from "react";
import { useParams } from "react-router-dom";
import Header2 from "../components/Header2";

const HomePage2 =() =>{
  const {id} = useParams();
  return(
    <div>
      <Header2/>
      <h1>Home</h1>
    </div>
  );
};

export default HomePage2;
