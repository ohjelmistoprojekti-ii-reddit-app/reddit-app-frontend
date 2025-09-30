import { 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    DialogClose, 
    DialogDescription, 
    DialogHeader, 
    DialogFooter 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapDialogProps } from "@/types/map.types"


export default function MapDialog({ details, open, setOpen}: MapDialogProps) {
    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader className="mb-4">
                        <DialogTitle>{details?.name}</DialogTitle>
                        <DialogDescription>
                            Top posts for Reddit {details?.id}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}