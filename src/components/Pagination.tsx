'use client';
import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const totalPages = Math.ceil(count / ITEM_PER_PAGE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  // Generate pagination numbers dynamically
  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 4) {
      pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
    } else {
      // Always show the first page
      pages.push(1);

      if (page > 3) pages.push("...");

      // Show the range around the current page
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

      // Always show the last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="p-4 flex items-center gap-2 justify-evenly text-gray-500">
      <button
        disabled={!hasPrev}
        className={`py-1 px-2 md:py-2 md:px-4 rounded-full md:rounded-md ${
          hasPrev ? "bg-sky" : "bg-slate-200"
        } text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>

      <div className="flex items-center gap-2 text-base">
        {generatePages().map((pageNum, index) =>
          pageNum === "..." ? (
            <span key={index} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              className={`px-2 md:px-3 rounded-full md:rounded-sm ${
                page === pageNum ? "bg-sky text-white" : "bg-gray-100"
              }`}
              onClick={() => changePage(Number(pageNum))}
            >
              {pageNum}
            </button>
          )
        )}
      </div>

      <button
        disabled={!hasNext}
        className={`py-1 px-2 md:py-2 md:px-4 rounded-full md:rounded-md ${
          hasNext ? "bg-sky" : "bg-slate-200"
        } text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
