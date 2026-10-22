import { useEffect, useState } from "react";

import EmployeeList from "./components/EmployeeList";
import SearchBar from "./components/SearchBar";
import { fetchEmployees } from "./services/employeeApi";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);


  useEffect(() => {
    const controller = new AbortController();

    async function loadEmployees() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchEmployees({
          search: searchInput,
          limit: 10,
          offset: 0,
          signal: controller.signal,
        });

        setEmployees(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load employees.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadEmployees();

    return () => controller.abort();
  }, [searchInput, retryCount]);

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">PEOPLE DIRECTORY</p>
        <h1>Employee Directory</h1>
        <p className="page-description">
          Find employees by name or department.
        </p>
      </header>

      <SearchBar onSearch={setSearchInput} />

      <section className="results-section" aria-live="polite">
        <div className="results-heading">
          <h2>Employees</h2>
          {!loading && !error && (
            <span className="result-count">
              {employees.length} shown
            </span>
          )}
        </div>

        {loading && (
          <p className="status-message" role="status">
            Loading employees...
          </p>
        )}

        {!loading && error && (
          <div className="error-state" role="alert">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && <EmployeeList employees={employees} />}
      </section>
    </main>
  );
}
