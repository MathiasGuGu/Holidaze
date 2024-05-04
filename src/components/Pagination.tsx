type Props = {
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
};

const Pagination = ({ page, pageCount, setPage }: Props) => {
  return (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
        Previous
      </button>
      <span>
        Page {page} of {pageCount}
      </span>
      <button onClick={() => setPage(page + 1)} disabled={page >= pageCount}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
