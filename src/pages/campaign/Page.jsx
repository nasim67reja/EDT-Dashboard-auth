import React from "react";
import Button from "../../components/common/inputs/Button";
import sad from "../../assets/campaign/sad.svg";
import { DialogC } from "../../components/common/feedback/Dialog";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../components/common/inputs/Input";

const Page = () => {
  return (
    <div className="px-[4rem] py-10 flex-1 flex flex-col">
      <h3 className="heading-tertiary font-bold pb-10 border-b border-[#DDDDE0]">
        All Campaign
      </h3>
      <div className="flex-1 center">
        <div className="flex flex-col items-center gap-4">
          <img src={sad} className="border-b border-[#DDDDE0]" alt="" />
          <p className="text-large text-secondary">No campaign available</p>
          {/* <Button className="rounded-md !px-4 !py-[10px] text-large">
            Add Campaign +
          </Button> */}
          <DialogC body={<CreateCampaing />} />
        </div>
      </div>
    </div>
  );
};

export default Page;

const CreateCampaing = () => {
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
          })}
          onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
            console.log("values", values);
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center gap-6">
              <MyTextInput
                label="Name"
                name="name"
                type="string"
                placeholder="..."
              />
              <MyTextInput
                label="Number"
                name="number"
                type="string"
                placeholder="..."
              />
            </div>

            <div className="flex justify-center items-center gap-6">
              <MyTextInput
                label="Email "
                name="email"
                type="email"
                placeholder="..."
              />
              <MyTextInput
                label="Occupation"
                name="occupation"
                type="string"
                placeholder="..."
              />
            </div>

            <div className="flex justify-center items-center gap-6">
              <MyTextInput
                label="Voter Id"
                name="voterID"
                type="string"
                placeholder="..."
              />
              <MyTextInput
                label="Address"
                name="address"
                type="string"
                placeholder="..."
              />
            </div>
          </Form>
        </Formik>
      </>
    </div>
  );
};
