import { useState, useMemo } from "react";
import ProjectCard from "../ProjectCard";
import MarketPlaceView from "../marketPlaceView";
import { projectDetails } from "../../../utils/projects";
import Pagination from "../pagination";

export default function SecondaryMarketplace() {
  let PageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const currentProjects = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return projectDetails.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  return (
    <>
      <MarketPlaceView>
        {currentProjects.map((projects, index) => (
          <ProjectCard details={projects} key={index} />
        ))}
      </MarketPlaceView>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={projectDetails.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
