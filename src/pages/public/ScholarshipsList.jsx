import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import ScholarshipCard from "../../components/domain/ScholarshipCard";
import Input from "../../components/ui/Input";
import Pagination from "../../components/ui/Pagination";
import EmptyState from "../../components/ui/EmptyState";
import {
  LuSearch,
  LuSlidersHorizontal,
  LuRotateCcw,
  LuLayoutGrid,
  LuList,
  LuScale,
  LuX,
  LuSparkles,
} from "react-icons/lu";

export const ScholarshipsList = () => {
  const { scholarships, loading } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [level, setLevel] = useState(searchParams.get("level") || "All");
  const [district, setDistrict] = useState(searchParams.get("district") || "All");
  const [feeFilter, setFeeFilter] = useState(searchParams.get("fee") || "All");
  const [status, setStatus] = useState(searchParams.get("status") || "All");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "deadline");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // React to URL search params changes (e.g. from Mega Navbar)
  useEffect(() => {
    const s = searchParams.get("search");
    const c = searchParams.get("category");
    const l = searchParams.get("level");
    const d = searchParams.get("district");
    const f = searchParams.get("fee");
    const st = searchParams.get("status");
    const so = searchParams.get("sort");

    if (s !== null) setSearch(s);
    if (c !== null) setCategory(c);
    if (l !== null) setLevel(l);
    if (d !== null) setDistrict(d);
    if (f !== null) setFeeFilter(f);
    if (st !== null) setStatus(st);
    if (so !== null) setSortBy(so);

    setCurrentPage(1);
  }, [searchParams]);

  // Filter & sort logic
  const filteredScholarships = useMemo(() => {
    let list = [...scholarships];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.sponsor.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== "All") {
      list = list.filter((s) => s.category?.toLowerCase() === category.toLowerCase());
    }

    // Level
    if (level !== "All") {
      list = list.filter(
        (s) =>
          s.educationLevel &&
          s.educationLevel.some((l) => l.toLowerCase().includes(level.toLowerCase()))
      );
    }

    // District
    if (district !== "All") {
      list = list.filter((s) => {
        const districts = s.eligibility?.eligibleDistricts || [];
        return districts.some(
          (d) =>
            d.toLowerCase().includes("all") ||
            d.toLowerCase().includes(district.toLowerCase())
        );
      });
    }

    // Fee
    if (feeFilter === "Free") {
      list = list.filter((s) => Number(s.applicationFee) === 0);
    } else if (feeFilter === "With Fee") {
      list = list.filter((s) => Number(s.applicationFee) > 0);
    }

    // Status
    if (status !== "All") {
      list = list.filter((s) => s.status === status);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "deadline" || sortBy === "deadline_asc") {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (sortBy === "newest") {
        return new Date(b.openingDate) - new Date(a.openingDate);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return list;
  }, [scholarships, search, category, level, district, feeFilter, status, sortBy]);

  const totalItems = filteredScholarships.length;
  const paginatedItems = filteredScholarships.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleResetFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All");
    setDistrict("All");
    setFeeFilter("All");
    setStatus("All");
    setSortBy("deadline");
    setCurrentPage(1);
    setSearchParams({});
  };

  const hasActiveFilters =
    search ||
    category !== "All" ||
    level !== "All" ||
    district !== "All" ||
    feeFilter !== "All" ||
    status !== "All";

  return (
    <div className="container" style={{ padding: "48px 16px" }}>
      {/* Header Banner */}
      <div
        style={{
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <div style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "8px" }}>
            <Link to="/" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Home</Link> / <span>Directory</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)", fontWeight: 800, color: "var(--color-primary-dark)", margin: "0 0 8px" }}>
            Explore Verified Scholarships
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "15px", margin: 0, maxWidth: "680px" }}>
            Browse government, institutional, and private scholarship programs for students in Dera Ismail Khan and Pakistan.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link
            to="/compare"
            className="btn btn-outline btn-sm"
            style={{ borderRadius: "var(--radius-full)" }}
          >
            <LuScale /> Compare Schemes
          </Link>

          {/* View mode toggle */}
          <div
            style={{
              display: "flex",
              backgroundColor: "var(--color-bg-subtle)",
              borderRadius: "var(--radius-full)",
              padding: "3px",
              border: "1px solid var(--color-border)",
            }}
          >
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              style={{
                background: viewMode === "grid" ? "#FFFFFF" : "none",
                border: "none",
                borderRadius: "var(--radius-full)",
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: viewMode === "grid" ? "var(--color-primary)" : "var(--color-text-subtle)",
                boxShadow: viewMode === "grid" ? "var(--shadow-sm)" : "none",
              }}
            >
              <LuLayoutGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              style={{
                background: viewMode === "list" ? "#FFFFFF" : "none",
                border: "none",
                borderRadius: "var(--radius-full)",
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: viewMode === "list" ? "var(--color-primary)" : "var(--color-text-subtle)",
                boxShadow: viewMode === "list" ? "var(--shadow-sm)" : "none",
              }}
            >
              <LuList />
            </button>
          </div>
        </div>
      </div>

      {/* Modern Filter Card */}
      <div
        className="filter-card-box"
        style={{
          padding: "24px",
          marginBottom: "36px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Search & Sort row */}
        <div className="filter-search-row" style={{ display: "flex", gap: "14px", marginBottom: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 280px", position: "relative" }}>
            <LuSearch
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-text-subtle)",
                fontSize: "18px",
              }}
            />
            <input
              type="text"
              placeholder="Search by title, university, sponsor or keywords..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: "100%",
                padding: "13px 14px 13px 42px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                fontSize: "14px",
                outline: "none",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--color-text-subtle)",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                <LuX />
              </button>
            )}
          </div>

          <div className="sort-dropdown-wrap" style={{ width: "210px" }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                fontSize: "13.5px",
                fontWeight: 600,
              }}
            >
              <option value="deadline">Sort: Deadline (Closing Soonest)</option>
              <option value="newest">Sort: Newly Announced</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter dropdowns row */}
        <div
          className="filter-dropdowns-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "12px",
          }}
        >
          <div>
            <label style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--color-text-subtle)", marginBottom: "6px", display: "block" }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "13px" }}
            >
              <option value="All">All Categories</option>
              <option value="Merit-based">Merit-based</option>
              <option value="Need-based">Need-based</option>
              <option value="Government">Government (Sample)</option>
              <option value="Private/Institutional">Private / Institutional</option>
              <option value="Special Assistance">Special Assistance</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--color-text-subtle)", marginBottom: "6px", display: "block" }}>
              Education Level
            </label>
            <select
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "13px" }}
            >
              <option value="All">All Levels</option>
              <option value="Undergraduate">Undergraduate / BS</option>
              <option value="Intermediate">Intermediate / HSSC</option>
              <option value="Matric">Matric / SSC</option>
              <option value="Master">Master's / MS / MPhil</option>
              <option value="PhD">PhD / Doctoral</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--color-text-subtle)", marginBottom: "6px", display: "block" }}>
              District Domicile
            </label>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "13px" }}
            >
              <option value="All">All Districts</option>
              <option value="Dera Ismail Khan">Dera Ismail Khan (Pilot)</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Tank">Tank</option>
              <option value="Bannu">Bannu</option>
              <option value="Lakki Marwat">Lakki Marwat</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--color-text-subtle)", marginBottom: "6px", display: "block" }}>
              Application Fee
            </label>
            <select
              value={feeFilter}
              onChange={(e) => {
                setFeeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "13px" }}
            >
              <option value="All">All Schemes</option>
              <option value="Free">100% Free (PKR 0)</option>
              <option value="With Fee">With Processing Fee</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--color-text-subtle)", marginBottom: "6px", display: "block" }}>
              Cycle Status
            </label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "13px" }}
            >
              <option value="All">All Cycles</option>
              <option value="Published">Currently Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Active filters pill bar */}
        {hasActiveFilters && (
          <div
            style={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid var(--color-border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12.5px", color: "var(--color-text-subtle)", fontWeight: 600 }}>
                Active Filters:
              </span>
              {category !== "All" && (
                <span className="filter-pill" onClick={() => setCategory("All")}>
                  Category: {category} <LuX />
                </span>
              )}
              {level !== "All" && (
                <span className="filter-pill" onClick={() => setLevel("All")}>
                  Level: {level} <LuX />
                </span>
              )}
              {district !== "All" && (
                <span className="filter-pill" onClick={() => setDistrict("All")}>
                  District: {district} <LuX />
                </span>
              )}
              {feeFilter !== "All" && (
                <span className="filter-pill" onClick={() => setFeeFilter("All")}>
                  Fee: {feeFilter} <LuX />
                </span>
              )}
              {search && (
                <span className="filter-pill" onClick={() => setSearch("")}>
                  Search: "{search}" <LuX />
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-primary)",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <LuRotateCcw /> Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Result Count Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", fontSize: "14px", color: "var(--color-text-muted)" }}>
        <div>
          Showing <strong>{paginatedItems.length}</strong> of <strong>{totalItems}</strong> scholarships
        </div>
      </div>

      {/* Scholarship Cards Grid / List */}
      {paginatedItems.length === 0 ? (
        <EmptyState
          title="No Matching Scholarships Found"
          description="We couldn't find any scholarship matching your selected filters. Try broadening your parameters or reset filters to see all available schemes."
          actionLabel="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                viewMode === "list" ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
              marginBottom: "36px",
            }}
          >
            {paginatedItems.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                viewMode={viewMode}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <style>{`
        .filter-pill {
          background-color: var(--color-bg-subtle);
          border: 1px solid var(--color-border);
          color: var(--color-text-main);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .filter-pill:hover {
          background-color: #FEE2E2;
          color: #DC2626;
          border-color: #FCA5A5;
        }
        @media (max-width: 640px) {
          .filter-card-box {
            padding: 16px 14px !important;
          }
          .filter-search-row {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .sort-dropdown-wrap {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ScholarshipsList;
