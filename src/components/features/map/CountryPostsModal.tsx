"use client";
import { useMemo, useState } from "react";
import type { CountryTopPost } from "@/types/map.types";
import Modal from "./Modal";
import PostCard from "./PostCard";

interface Props {
  open: boolean;
  countryName: string;
  posts: CountryTopPost[];
  onClose: () => void;
}

export default function CountryPostsModal({ open, onClose, countryName, posts }: Props) {
  // Backend provides max 3 posts, Frontend shows only 3 as well 
  const items = useMemo(() => posts.slice(0, 3), [posts]);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(i => (i - 1 + items.length) % items.length);
  const next = () => setIndex(i => (i + 1) % items.length);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">{countryName}</h2>
        <div className="text-sm text-gray-500">
          {items.length ? `${index + 1} / ${items.length}` : "0 / 0"}
        </div>
      </div>

      {items.length > 0 ? (
        <>
          <PostCard post={items[index]} index={index} />
          {items.length > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <button
                className="rounded-lg bg-gray-100 hover:bg-gray-200 px-3 py-1"
                onClick={prev}
              >
                ← Previous
              </button>
              <button
                className="rounded-lg bg-gray-100 hover:bg-gray-200 px-3 py-1"
                onClick={next}
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-500">For this country posts are not available</div>
      )}
    </Modal>
  );
}
