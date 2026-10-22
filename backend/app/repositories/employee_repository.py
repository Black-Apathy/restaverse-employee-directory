from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.db.models import Employee


def search_employees(
    db: Session,
    search: str | None,
    limit: int,
    offset: int,
) -> list[Employee]:
    statement = select(Employee)

    if search:
        term = f"%{search.strip()}%"
        statement = statement.where(
            or_(
                Employee.name.ilike(term),
                Employee.department.ilike(term),
            )
        )

    statement = (
        statement
        .order_by(Employee.name, Employee.id)
        .limit(limit)
        .offset(offset)
    )

    return list(db.scalars(statement).all())
