import { closeDialog } from "@/redux/slices/dialogSlice";
import { RootState } from "@/redux/store";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MUIDialog,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import NewPostDialog from "./configs/NewPostDialog";

interface DynamicContentProps {
  contentType: string | null;
  additionalData: any;
}

const DynamicContent: React.FC<DynamicContentProps> = ({
  contentType,
  additionalData,
}) => {
  if (!contentType) {
    return <p></p>;
  }

  switch (contentType) {
    case "NEW_POST_DIALOG":
      return <NewPostDialog userInfo={additionalData} />;

    default:
      return <p></p>;
  }
};

const Dialog: React.FC = () => {
  const dialog = useSelector((state: RootState) => state?.dialog);
  const dispatch = useDispatch();

  console.log(dialog)
  return (
    <MUIDialog
      open={dialog.open}
      maxWidth={dialog.maxWidth}
      fullWidth={dialog.fullWidth}
      onClose={() => dispatch(closeDialog())}
    >
      <DialogTitle className="flex items-center justify-between border-b">
        {dialog.title}
        <IconButton onClick={() => dispatch(closeDialog())}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className="!px-0 !pt-1">
        <DynamicContent
          contentType={dialog.contentType}
          additionalData={dialog.additionalData}
        ></DynamicContent>
      </DialogContent>
    </MUIDialog>
  );
};

export default Dialog;
