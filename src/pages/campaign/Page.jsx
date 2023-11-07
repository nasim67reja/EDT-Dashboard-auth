import React, { useRef } from "react";
import Button from "../../components/common/inputs/Button";
import sad from "../../assets/campaign/sad.svg";
import { DialogC } from "../../components/common/feedback/Dialog";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../components/common/inputs/Input";
import ImageUploading from "react-images-uploading";
import cloudImage from "../../assets/campaign/cloud-upload.svg";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Page = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <div className="px-[4rem] py-10 flex-1 flex flex-col">
      <h3 className="heading-tertiary font-bold pb-10 border-b border-[#DDDDE0]">
        All Campaign
      </h3>
      <div className="flex-1 center">
        <div className="flex flex-col items-center gap-4">
          <img src={sad} className="border-b border-[#DDDDE0]" alt="" />
          <p className="text-large text-secondary">No campaign available</p>
          <Button
            className="rounded-md !px-4 !py-[10px] text-large"
            onClick={handleOpen}
          >
            Add Campaign +
          </Button>
          <Dialog
            size="xl"
            open={open}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
            className="border"
          >
            <DialogBody>
              <CreateCampaing handler={handleOpen} />
            </DialogBody>
          </Dialog>
          <SubmitCampaign />
        </div>
      </div>
    </div>
  );
};

export default Page;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-[1px] w-full">
      <label
        className="text-[14px] text-secondary"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className="border p-[10px]  text-[#000] text-small rounded-lg focus:outline-primary "
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

const FileUpload = ({ label, fileRef, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-1 w-full border">
      <label htmlFor="files">{label}</label>{" "}
      <input ref={fileRef} multiple={true} type="file" {...field} />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const CreateCampaing = ({ handler }) => {
  const fileRef = useRef(null);
  return (
    <div>
      <>
        <Formik
          initialValues={{
            name: "",
            number: "",
            email: "",
            occupation: "",
            voterID: "",
            address: "",
            district: "",
            files: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            number: Yup.string()
              .matches(
                /^\+88\d{11}$/,
                "Must start with +88 and be 14 characters long"
              )
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            occupation: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            voterID: Yup.string()
              .max(16, "Must be 16 characters or less")
              .required("Required"),
            address: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            district: Yup.string()
              .oneOf(
                ["New York", "Washintong", "Los angels", "other"],
                "Invalid district"
              )
              .required("Required"),
            files: Yup.mixed()
              .test("is-file-too-big", "File exceeds 10MB", () => {
                let valid = true;
                const files = fileRef?.current?.files;
                if (files) {
                  const fileArr = Array.from(files);
                  fileArr.forEach((file) => {
                    const size = file.size / 1024 / 1024;
                    if (size > 10) {
                      valid = false;
                    }
                  });
                }
                return valid;
              })
              .test(
                "is-file-of-correct-type",
                "File is not of supported type",
                () => {
                  let valid = true;
                  const files = fileRef?.current?.files;
                  if (files) {
                    const fileArr = Array.from(files);
                    fileArr.forEach((file) => {
                      const type = file.type.split("/")[1];
                      const validTypes = ["png", "jpg"];
                      if (!validTypes.includes(type)) {
                        valid = false;
                      }
                    });
                  }
                  return valid;
                }
              )
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
            console.log("values", values);
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="py-8">
            <div className="max-h-[80vh] px-14 overflow-auto w-full flex flex-col items-center gap-4 ">
              {InputField.map((el, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center gap-6 w-full"
                >
                  {el.map((child, ci) => (
                    <MyTextInput
                      key={ci}
                      label={child.label}
                      name={child.name}
                      type={child.address}
                      placeholder="..."
                      inputClass="!py-2 !mt-0 text-black"
                      labelClass="!text-[14px]"
                    />
                  ))}
                </div>
              ))}
              <div className="flex justify-center items-center gap-6 w-full">
                <MySelect label="Office sought" name="district">
                  <option value="">Mayor</option>
                  <option value="New York">New York</option>
                  <option value="Washintong">Washintong</option>
                  <option value="Los angels">Los angels</option>
                  <option value="other">Other</option>
                </MySelect>

                <MySelect label="District" name="district">
                  <option value="">-None_</option>
                  <option value="New York">New York</option>
                  <option value="Washintong">Washintong</option>
                  <option value="Los angels">Los angels</option>
                  <option value="other">Other</option>
                </MySelect>
              </div>
              <div className="flex justify-center items-center gap-6 w-full">
                <MySelect label="Constituency" name="district">
                  <option value="">New York</option>
                  <option value="New York">New York</option>
                  <option value="Washintong">Washintong</option>
                  <option value="Los angels">Los angels</option>
                  <option value="other">Other</option>
                </MySelect>

                <MySelect label="Year" name="district">
                  <option value="">2024</option>
                  <option value="New York">New York</option>
                  <option value="Washintong">Washintong</option>
                  <option value="Los angels">Los angels</option>
                  <option value="other">Other</option>
                </MySelect>
              </div>
              <div className="flex justify-center items-center gap-6 w-full">
                <MyTextInput
                  label="Campaign name"
                  name="name"
                  type="string"
                  placeholder="All Councill Districts"
                  inputClass="!py-2 !mt-0 text-black"
                  labelClass="!text-[14px]"
                />
                <MySelect label="Affiliation" name="district">
                  <option value="">Republican</option>
                  <option value="New York">New York</option>
                  <option value="Washintong">Washintong</option>
                  <option value="Los angels">Los angels</option>
                  <option value="other">Other</option>
                </MySelect>
              </div>
              <div className="flex justify-center items-center gap-6 w-full">
                <MySelect label="Participant" name="district">
                  <option value="">-None_</option>
                  <option value="New York">New York</option>
                  <option value="Washintong">Washintong</option>
                  <option value="Los angels">Los angels</option>
                  <option value="other">Other</option>
                </MySelect>

                <MySelect label="Year" name="district">
                  <option value="">2024</option>
                  <option value="New York">New York</option>
                  <option value="Washintong">Washintong</option>
                  <option value="Los angels">Los angels</option>
                  <option value="other">Other</option>
                </MySelect>
              </div>
              {/* <FileUpload label="Campaign Image" name="files" fileRef={fileRef} /> */}
              <ImageUpload />
            </div>
            <div className="flex justify-end w-full gap-3 mt-4 px-14">
              <Button
                onClick={handler}
                backgroundColor="#fff"
                textColor="#007EE1"
                className="border border-[#007EE1] !py-[10.5px] !px-4"
              >
                <span>Cancel</span>
              </Button>
              <Button className=" !py-[10.5px] !px-4" type="submit">
                <span>Save and continue</span>
              </Button>
            </div>
          </Form>
        </Formik>
      </>
    </div>
  );
};

const InputField = [
  [
    {
      label: "Name",
      name: "name",
      type: "string",
    },
    {
      label: "Number",
      name: "number",
      type: "string",
    },
  ],
  [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Occupation",
      name: "occupation",
      type: "string",
    },
  ],
  [
    {
      label: "Voter Id",
      name: "voterID",
      type: "string",
    },
    {
      label: "Address",
      name: "address",
      type: "string",
    },
  ],
];

const SubmitCampaign = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <>
        <Button
          className="rounded-md !px-4 !py-[10px] text-large"
          onClick={handleOpen}
        >
          Add Campaign +
        </Button>
        <Dialog
          size="sm"
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogBody>
            <div className="pt-10 px-8 pb-2">
              <h4 className="text-large text-[#202020] font-semibold mb-6 ">
                Do you accept financial Authority and Responsibility?
              </h4>
              <div className=" flex flex-col gap-4">
                <label className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="authority"
                    value="yes"
                    checked
                    className=" w-5 h-5 cursor-pointer"
                  />
                  <div>
                    <p className="text-[16px] font-semibold text-[#202020]">
                      Yes, I affirm that i am the account owner
                    </p>
                    <p className="text-small text-secondary">
                      I am legally and financially responsible for this
                      organization.
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="authority"
                    value="no"
                    className=" w-5 h-5 cursor-pointer"
                  />
                  <div>
                    <p className="text-[16px] font-semibold text-[#202020]">
                      No, I am not the account owner
                    </p>
                    <p className="text-small text-secondary">
                      I Will invite the appropriate person for authorization
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <div className="flex flex-col w-full gap-2 px-8">
              <Button className="w-full" onClick={handleOpen}>
                Submit campaign
              </Button>
              <Button
                className="w-full !bg-bgPrimary"
                textColor="#202020"
                onClick={handleOpen}
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </>
    </>
  );
};

export function ImageUpload() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className=" w-full">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <label
              htmlFor="image"
              className="text-standard text-secondary block mb-1"
            >
              Campaign Image
            </label>
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="w-full flex flex-col items-center gap-1 border p-6 border-dashed border-[#141B34] bg-[#FBFBFB]"
            >
              <img src={cloudImage} alt="" />
              <p className="text-large font-medium text-[#202020]">
                Drag & Drop your files here or
                <span className=" text-[#0444AD]"> browse</span>
              </p>
              <p className="text-standard text-secondary">Supports JPG,PNG</p>
            </button>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
