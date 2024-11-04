import React, { useState } from 'react';

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

const EditProfile = ({ name, bio, onSave }) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedBio, setUpdatedBio] = useState(bio);

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: updatedName, bio: updatedBio });
  };

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

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

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

export default EditProfile;

