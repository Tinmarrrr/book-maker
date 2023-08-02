import React, { useState } from "react";
import "../styles/components/AddPageModal.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type AddPageModalProps = {
  closeModal: () => void;
};

type UpdateTextareaContent = {
  target: { value: React.SetStateAction<string> };
};

function AddPageModal(props: AddPageModalProps) {
  const [content, setContent] = useState("");

  const updateTextareaContent = (event: UpdateTextareaContent) => {
    setContent(event.target.value);
  };

  const addPage = () => {
    const qs = require("qs");
    let data = qs.stringify({
      content: `${content}`,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response: { data: any }) => {
        console.log(JSON.stringify(response.data));
        toast("Page added 📖");
      })
      .catch((error: any) => {
        console.log(error);
        toast("Page can't be added 📘");
      });
  };

  return (
    <div className="modal">
      <Toaster />
      <h2>Add a page</h2>
      <textarea
        className="input"
        placeholder="Content of the page"
        value={content}
        onChange={updateTextareaContent}
      />
      <button className="close-button" onClick={addPage}>
        Add page
      </button>

      <button className="close-button" onClick={props.closeModal}>
        Close the modal
      </button>
    </div>
  );
}
export default AddPageModal;
