import React from "react";
import { useParams } from "react-router-dom";
import EditProfile from '../components/EditProfile';

const ProfilePage =() =>{
  const {id} = useParams();
  return(
    <div>
      <h1>Profile {id}</h1>
      <EditProfile/>
    </div>
  );
};

export default ProfilePage;
