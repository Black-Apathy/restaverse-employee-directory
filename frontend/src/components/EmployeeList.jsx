import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({ employees }) {
  if (employees.length === 0) {
    return (
      <div className="empty-state" role="status">
        <h2>No employees found</h2>
        <p>Try a different name or department.</p>
      </div>
    );
  }

  return (
    <div className="employee-list">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
