import { AiGenerative } from '../components/icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '../components/ui/alert-dialog'

type AiRunCancelDialogProps = {
  open: boolean
  projectName: string
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

/**
 * Asks before a project switch, creation, or duplication is allowed to end a
 * live AI generation. Dismissing keeps the run going; confirming cancels the
 * run and then performs the requested project action.
 */
export function AiRunCancelDialog({
  open,
  projectName,
  onOpenChange,
  onConfirm,
}: AiRunCancelDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="ai-run-cancel-dialog">
        <AlertDialogHeader>
          <AlertDialogMedia><AiGenerative size={17} /></AlertDialogMedia>
          <AlertDialogTitle>Stop the AI generation?</AlertDialogTitle>
          <AlertDialogDescription>
            An AI generation is still running in “{projectName}”. Leaving now cancels it —
            finished screens are kept, the screen being built is lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="ai-run-cancel-keep">
            Keep generating
          </AlertDialogCancel>
          <AlertDialogAction
            className="ai-run-cancel-confirm"
            variant="destructive"
            onClick={onConfirm}
          >
            Stop and continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
