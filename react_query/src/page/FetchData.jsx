import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./FetchData.css";
import { useState } from "react";

export const FetchData = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const limit = 3;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: async () => {
      return await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          pageNumber * limit
        }&_limit=${limit}`
      );
    },
    keepPreviousData: true, // Keeps old data while loading new one
    staleTime: 5000,
  });

  const handleNext = () => {
    if (data?.data.length === limit) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (pageNumber > 0) {
      setPageNumber((prev) => prev - 1);
    }
  };

  if (isPending) {
    return <div className="center-text loading">Loading posts...</div>;
  }

  if (isError) {
    return <div className="center-text error">Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1 className="header">Blog Posts</h1>
      <div className="grid">
        {data?.data.map((item) => (
          <div key={item.id} className="card">
            <h2 className="title">{item.title}</h2>
            <p className="meta">Post ID: {item.id}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="btn"
          onClick={handlePrev}
          disabled={pageNumber === 0}
        >
          Previous
        </button>
        <span className="page-number">Page {pageNumber + 1}</span>
        <button
          className="btn"
          onClick={handleNext}
          disabled={data?.data.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
};
