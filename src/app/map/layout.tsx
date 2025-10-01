

export default function MapLayout({
  children,
  dialog,
}: {
  children: React.ReactNode
  dialog: React.ReactNode
}) {
  return (
    <>
      {children}
      {dialog}
    </>
  )
}