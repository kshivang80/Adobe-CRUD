import React, { useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";

const EditProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user profile from the server here
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:8080/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = (data) => {
    // Submit the updated form data to the server here
    console.log(data);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return <ProfileForm user={user} onSubmit={handleSubmit} />;
};

export default EditProfile;
