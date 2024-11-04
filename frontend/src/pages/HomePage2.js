import React from "react";
import { useParams } from "react-router-dom";
import Header2 from "../components/Header2";

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

const HomePage2 =() =>{
  const {id} = useParams();
  return(
    <div>
      <Header2/>
      <h1>Home</h1>
    </div>
  );
};

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

export default HomePage2;
