import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Button from "../inputs/Button";
import { Formik } from "formik";

export function DialogC({ header, body }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
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
      >
        {header && <DialogHeader>{header}</DialogHeader>}
        <DialogBody>{body}</DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Save and continue</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
}
