import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// HoC
import withHeader from "../../hoc/withHeader";
import withAuth from "../../hoc/withAuth";

// Components
import Input from "../../components/Input";
import InputFile from "../../components/InputFile/InputFile";
import InputTag from "../../components/InputTag/InputTag";

// Functions imported
import { uploadNewGif } from "../../services/gifApi";
import { uploadGifCloudinary } from "../../services/cloudinary";

// CSS
import "./style.css";
import { useSelector } from "react-redux";

// Initial State
const initialFormStateRegister = {
  value: "",
  isTouched: false,
  isError: false,
  errorMessage: "",
};

// Functions to validate strings
function validateTitle(string) {
  let error = {};
  if (string.length === 0) {
    error = {
      isError: true,
      errorMessage: "Title is required",
    };
  } else if (string.length <= 2) {
    error = {
      isError: true,
      errorMessage: "Minimum three characters",
    };
  } else {
    error = {
      isError: false,
      errorMessage: "",
    };
  }
  return error;
}

function validateFile(string) {
  let error = {};
  if (string.length === 0) {
    error = {
      isError: true,
      errorMessage: "File is required",
    };
  } else {
    error = {
      isError: false,
      errorMessage: "",
    };
  }
  return error;
}

function Upload() {
  const [title, setTitle] = useState(initialFormStateRegister);
  const [file, setFile] = useState({
    ...initialFormStateRegister,
    file: undefined,
  });
  const [tempTag, setTempTag] = useState("");
  const [tags, setTags] = useState([]);

  const { userData } = useSelector((state) => state.isAuthorized);

  const history = useHistory();

  function handleTitleChange(e) {
    if (title.isTouched) {
      const error = validateTitle(e.target.value);
      setTitle({
        ...title,
        ...error,
        value: e.target.value,
      });
    } else {
      setTitle({
        ...title,
        value: e.target.value,
      });
    }
  }

  function handleTitleBlur(e) {
    const error = validateTitle(e.target.value);
    setTitle({
      ...title,
      ...error,
      value: e.target.value,
      isTouched: true,
    });
  }

  function handleFileChange(e) {
    const error = validateFile(e.target.value);
    setFile({
      ...file,
      ...error,
      value: e.target.value,
      file: e.target.files[0],
      isTouched: true,
    });
  }

  function addTag() {
    if (!tags.includes(tempTag) & (tempTag !== "")) {
      setTags([...tags, tempTag]);
    }
    setTempTag("");
  }

  function deleteTag(e) {
    const index = e.currentTarget.dataset.index;
    const newTags = [...tags];
    newTags.splice(index, 1);

    setTags(newTags);
  }

  function resetForm() {
    setTitle(initialFormStateRegister);
    setFile(initialFormStateRegister);
    setTempTag("");
    setTags([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const titleError = validateTitle(title.value);
    setTitle({
      ...title,
      ...titleError,
      isTouched: true,
    });

    const fileError = validateFile(file.value);
    setFile({
      ...file,
      ...fileError,
      isTouched: true,
    });

    if (!titleError.isError & !fileError.isError) {
      uploadGifCloudinary(file.file)
        .then((resp) => {
          const data = {
            owner: userData._id,
            title: title.value,
            url: resp.data.url,
            tags: tags,
          };
          uploadNewGif(data)
            .then(() => {
              history.push("/");
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  return (
    <main>
      <div className="center">
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <div className="center">
            <h1 className="title-form-upload">Upload new GIF</h1>
          </div>
          <Input
            type="text"
            id="title"
            placeholder="Enter the GIF title..."
            value={title.value}
            label="Title *"
            isTouched={title.isTouched}
            isError={title.isError}
            errorMessage={title.errorMessage}
            handleChange={handleTitleChange}
            handleBlur={handleTitleBlur}
          />
          <InputFile
            id="file"
            value={file.value}
            label="File *"
            isTouched={file.isTouched}
            isError={file.isError}
            errorMessage={file.errorMessage}
            handleChange={handleFileChange}
          />
          <InputTag
            id="tags"
            value={tempTag}
            tags={tags}
            label="Tags"
            addTag={addTag}
            deleteTag={deleteTag}
            handleChange={(e) => setTempTag(e.target.value)}
          />
          <div className="buttons-wrapper">
            <button className="form-button" type="button" onClick={resetForm}>
              Clear
            </button>
            <button className="form-button color-yellowgreen" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default withAuth(withHeader(Upload));
