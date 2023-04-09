import React from "react";
import ProfileForm from "./ProfileForm";

const CreateProfile = () => {
  const handleSubmit = (data) => {
    // Submit the form data to the server here
    console.log(data);
  };

  return <ProfileForm onSubmit={handleSubmit} />;
};

export default CreateProfile;