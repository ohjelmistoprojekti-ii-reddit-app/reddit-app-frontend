import { isImageUrl } from "@/lib/utils"


export default function PostMediaPreview({ contentLink, title }: {
    contentLink: string, title: string
}) {
    return(
            <div>
                {isImageUrl(contentLink!) ? (
                <img
                    src={contentLink!}
                    alt={title || "media"}
                    className="w-full rounded-lg max-h-[360px] object-contain"
                    loading="lazy"
                />
                ) : (
                <a
                    href={contentLink!}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 underline text-sm"
                >
                    Open media link
                </a>
                )}
            </div>
        )
}