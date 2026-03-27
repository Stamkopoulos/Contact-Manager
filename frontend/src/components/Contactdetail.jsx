import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { updatePhoto } from "../api/ContactService";
import { getContact } from "../api/ContactService";
import { Link } from "react-router-dom";
const Contactdetail = ({ updateContact, updateImage }) => {
  const inputRef = useRef();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "",
    photoUrl: "",
  });

  const { id } = useParams();

  const fetchContact = async (id) => {
    try {
      const { data } = await getContact(id);
      setContact(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const selectImage = () => {
    inputRef.current.click();
  };

  const updatePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);
      await updateImage(formData);
      setContact((prev) => ({
        ...prev,
        photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`,
      }));
      console.log("data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContact(id);
  }, []);

  return (
    <>
      <Link to={"/contacts"} className="link">
        <i className="bi bi-arrow-left"></i> Back to list
      </Link>
      <div className="profil">
        <div className="profile__details">
          <img
            src={contact.photoUrl}
            alt={`Profile photo of ${contact.name}`}
          />
          <div className="profile__metadata">
            <p className="profile__name">{contact.name}</p>
            <p className="profile__muted">
              JPG, GIF, OR PNG. Max size of 10MG.
            </p>
            <button className="btn" onClick={selectImage}>
              <i className="bi bi-cloud-upload"></i>Change photo
            </button>
          </div>
        </div>
        <div className="profile__settings">Settings will go here </div>
      </div>
      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={inputRef}
          onChange={(event) => updatePhoto(event.target.files[0])}
          name="file"
          accept="image/*"
        />
      </form>
    </>
  );
};

export default Contactdetail;
