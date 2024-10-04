import React, { useState } from 'react';

const EditProfile = ({ name, bio, onSave }) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedBio, setUpdatedBio] = useState(bio);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: updatedName, bio: updatedBio });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Bio:
          <textarea
            value={updatedBio}
            onChange={(e) => setUpdatedBio(e.target.value)}
            maxLength="70"
          ></textarea>
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfile;

