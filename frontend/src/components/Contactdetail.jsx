import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updatePhoto } from "../api/ContactService";
import { getContact } from "../api/ContactService";
import { Link } from "react-router-dom";
const Contactdetail = ({ updateContact, updateImage }) => {
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
            <button className="btn">
              <i className="bi bi-cloud-upload"></i>Change photo
            </button>
          </div>
        </div>
        <div className="profile__settings">Settings will go here </div>
      </div>
    </>
  );
};

export default Contactdetail;
