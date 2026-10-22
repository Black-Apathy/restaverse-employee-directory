export default function EmployeeCard({ employee }) {
  const initials = employee.name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const joiningDate = new Date(
    `${employee.date_of_joining}T00:00:00`
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="employee-card">
      <div className="employee-avatar" aria-hidden="true">
        {initials}
      </div>

      <div className="employee-details">
        <h2>{employee.name}</h2>
        <p className="employee-designation">{employee.designation}</p>
        <p>{employee.email}</p>
        <div className="employee-meta">
          <span>{employee.department}</span>
          <span>Joined {joiningDate}</span>
        </div>
      </div>
    </article>
  );
}
