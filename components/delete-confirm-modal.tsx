"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, referralName }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-blue-950/90 backdrop-blur-md border-blue-800/50 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">Delete Referral</AlertDialogTitle>
          <AlertDialogDescription className="text-blue-200">
            Are you sure you want to delete the referral for{" "}
            <span className="font-medium text-white">{referralName}</span>? This action cannot be undone and all
            associated analytics data will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-blue-800/50 text-white hover:bg-blue-900/30">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white border border-red-500/50"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
