import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type Props = {
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
};

const Pagination = ({ page, pageCount, setPage }: Props) => {
  return (
    <div className="w-full flex items-center justify-center h-24 gap-5">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setPage(1)}
          className="w-10 h-10 rounded-lg bg-background-accent border flex items-center justify-center"
        >
          <ChevronsLeft size={24} strokeWidth={1.5} />
        </button>
        <button
          onClick={() =>
            setPage((prev: number) => {
              if (prev - 1 < 1) {
                return 1;
              }
              return prev - 1;
            })
          }
          className="w-10 h-10 rounded-lg bg-background-accent border flex items-center justify-center"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
      </div>
      <span>
        Page {page} of {pageCount}
      </span>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() =>
            setPage((prev: number) => {
              if (prev + 1 > pageCount) {
                return pageCount;
              }
              return prev + 1;
            })
          }
          className="w-10 h-10 rounded-lg bg-background-accent border flex items-center justify-center"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => setPage(pageCount)}
          className="w-10 h-10 rounded-lg bg-background-accent border flex items-center justify-center"
        >
          <ChevronsRight size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
