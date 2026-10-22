from sqlalchemy.orm import Session

from app.db.models import Employee
from app.repositories.employee_repository import search_employees


def find_employees(
    db: Session,
    search: str | None,
    limit: int,
    offset: int,
) -> list[Employee]:
    normalized_search = search.strip() if search else None

    if not normalized_search:
        normalized_search = None

    return search_employees(
        db=db,
        search=normalized_search,
        limit=limit,
        offset=offset,
    )
