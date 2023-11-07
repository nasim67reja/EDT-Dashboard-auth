import React, { useRef, useState } from "react";
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
import {
  affiliationOption,
  officeSoughtOption,
  participantOption,
  usaMajorDistricts,
  years,
} from "../../components/common/utils/Data";
import { baseURL } from "../../components/common/utils/URL";
import axios from "axios";

const Page = () => {
  const [formData, setFormData] = useState();
  const [open, setOpen] = useState(false);
  const [submitCampaignOpen, setSubmitCampaignOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpenSubmitCampaignOpen = () =>
    setSubmitCampaignOpen(!submitCampaignOpen);

  console.log(formData, "formdata");

  const createCampaignHandler = async () => {
    // handleOpenSubmitCampaignOpen();
    setFormData({
      ...formData,
      start_date: "2023-10-29",
      end_date: "2023-11-6",
      campaign_status: "upcoming",
      owner_id: "11cfffacfea43fbd9591c2af64cb8a00116133c9",
      is_owner: false,
    });

    const createCampaignURL = `${baseURL}/dev/campaign/create_campaign`;

    // Get the id_token from localStorage
    const idToken = localStorage.getItem("idToken");

    // Set up the headers with the id_token
    const headers = {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    };

    try {
      // Make the POST request
      const response = await axios.post(createCampaignURL, formData, {
        headers,
      });

      // Handle the response
      console.log("Campaign created successfully:", response.data);
    } catch (error) {
      // Handle errors
      console.log("Error creating campaign:", error);
    }
  };

  return (
    <div className="px-[4rem] py-10 flex-1 flex flex-col">
      <h3 className="heading-tertiary font-bold pb-10 border-b border-[#DDDDE0]">
        All Campaign
      </h3>
      <div className="flex-1 center">
        <div className="flex flex-col items-center gap-4">
          <img src={sad} className="border-b border-[#DDDDE0]" alt="" />
          <p className="text-large text-secondary">No campaign available</p>

          {/* submit form */}
          <Button
            className="rounded-md !px-4 !py-[10px] text-large"
            onClick={handleOpen}
          >
            Add Campaign +
          </Button>
        </div>
      </div>

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
          <CreateCampaing
            setFormData={setFormData}
            handler={handleOpen}
            handlerSubmit={handleOpenSubmitCampaignOpen}
          />
        </DialogBody>
      </Dialog>
      {/* Submit Campaign */}

      <>
        <Dialog
          size="sm"
          open={submitCampaignOpen}
          handler={handleOpenSubmitCampaignOpen}
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
              <Button className="w-full" onClick={createCampaignHandler}>
                Submit campaign
              </Button>
              <Button
                className="w-full !bg-bgPrimary"
                textColor="#202020"
                onClick={handleOpenSubmitCampaignOpen}
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </>
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
        className="border px-[10px] py-[8px]  text-[#000] text-small rounded-lg focus:outline-primary "
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

const CreateCampaing = ({ handler, handlerSubmit, setFormData }) => {
  // const fileRef = useRef(null);
  return (
    <div>
      <>
        <Formik
          initialValues={{
            candidate_name: "",
            phone: "",
            email: "",
            occupation: "",
            voter_id: "",
            address: "",
            office_sought: "",
            district: "",
            constituency: "",
            candidacy_year: "",
            campaign_name: "",
            affiliation: "",
            participant: "",
            // campaignDate: "",
            // files: "",
          }}
          validationSchema={Yup.object({
            candidate_name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            phone: Yup.string()
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
            voter_id: Yup.string()
              .max(16, "Must be 16 characters or less")
              .required("Required"),
            address: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            office_sought: Yup.string()
              .oneOf(
                officeSoughtOption.map((option) => option.value),
                "Invalid office sought"
              )
              .required("Required"),
            district: Yup.string()
              .oneOf(
                usaMajorDistricts.map((option) => option.value),
                "Invalid district"
              )
              .required("Required"),
            constituency: Yup.string()
              .oneOf(
                usaMajorDistricts.map((option) => option.value),
                "Invalid district"
              )
              .required("Required"),
            candidacy_year: Yup.string()
              .oneOf(
                years.map((option) => option.value),
                "Invalid Year"
              )
              .required("Required"),
            campaign_name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            affiliation: Yup.string()
              .oneOf(
                affiliationOption.map((option) => option.value),
                "Invalid Affiliation"
              )
              .required("Required"),
            participant: Yup.string()
              .oneOf(
                participantOption.map((option) => option.value),
                "Invalid Participant"
              )
              .required("Required"),
            // files: Yup.mixed()
            //   .test("is-file-too-big", "File exceeds 10MB", () => {
            //     let valid = true;
            //     const files = fileRef?.current?.files;
            //     if (files) {
            //       const fileArr = Array.from(files);
            //       fileArr.forEach((file) => {
            //         const size = file.size / 1024 / 1024;
            //         if (size > 10) {
            //           valid = false;
            //         }
            //       });
            //     }
            //     return valid;
            //   })
            //   .test(
            //     "is-file-of-correct-type",
            //     "File is not of supported type",
            //     () => {
            //       let valid = true;
            //       const files = fileRef?.current?.files;
            //       if (files) {
            //         const fileArr = Array.from(files);
            //         fileArr.forEach((file) => {
            //           const type = file.type.split("/")[1];
            //           const validTypes = ["png", "jpg"];
            //           if (!validTypes.includes(type)) {
            //             valid = false;
            //           }
            //         });
            //       }
            //       return valid;
            //     }
            //   )
            //   .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handlerSubmit();
            handler();
            setFormData({ ...values });
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
                      inputClass="!py-1 !mt-0 text-black"
                      labelClass="!text-[14px]"
                    />
                  ))}
                </div>
              ))}
              <div className="flex justify-center items-center gap-6 w-full">
                <MySelect label="Office sought" name="office_sought">
                  <option value="">Select an option</option>
                  {officeSoughtOption.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </MySelect>

                <MySelect label="District" name="district">
                  <option value="">-None_</option>
                  {usaMajorDistricts.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </MySelect>
              </div>
              <div className="flex justify-center items-center gap-6 w-full">
                <MySelect label="Constituency" name="constituency">
                  <option value="">Select an option</option>
                  {usaMajorDistricts.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </MySelect>

                <MySelect label="Year" name="candidacy_year">
                  <option value="">-None_</option>
                  {years.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </MySelect>
              </div>
              <div className="flex justify-center items-center gap-6 w-full">
                <MyTextInput
                  label="Campaign name"
                  name="campaign_name"
                  type="string"
                  placeholder="All Councill Districts"
                  inputClass="!py-1 !mt-0 text-black"
                  labelClass="!text-[14px]"
                />
                <MySelect label="Affiliation" name="affiliation">
                  <option value="">Select an option</option>
                  {affiliationOption.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </MySelect>
              </div>
              <div className="flex justify-center items-center gap-6 w-full">
                <MySelect label="Participant" name="participant">
                  <option value="">-None_</option>
                  {participantOption.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
              <Button
                // onClick={handlerSubmit}
                className=" !py-[10.5px] !px-4"
                type="submit"
              >
                Save and continue
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
      name: "candidate_name",
      type: "string",
    },
    {
      label: "Number",
      name: "phone",
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
      name: "voter_id",
      type: "string",
    },
    {
      label: "Address",
      name: "address",
      type: "string",
    },
  ],
];

export function ImageUpload() {
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  console.log(images, "images");
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
              type="button"
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
