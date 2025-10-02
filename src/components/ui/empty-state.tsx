export default function EmptyState({ message }: { message: string }) {
    return (
        <div className="border rounded-2xl p-6 text-center text-sm text-muted-foreground bg-muted/30">
            {message}
        </div>
    );
}