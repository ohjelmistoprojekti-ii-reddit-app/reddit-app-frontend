export type CountryDetails = {
    id: string
    name: string | null
}

export type MapDialogProps = {
    details?: CountryDetails
    open: boolean
    setOpen: (open: boolean) => void
}