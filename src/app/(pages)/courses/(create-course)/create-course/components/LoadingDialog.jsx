import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const LoadingDialog = ({ loading }) => {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              <div className="flex flex-col py-10 items-center">
                <Image
                  src={"/loader.gif"}
                  alt="loader gif"
                  width={100}
                  height={100}
                />

                <h2 className="prata-regular my-10 text-xl sm:text-3xl">Please wait.... AI working on it</h2>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LoadingDialog;
