from typing import Any, Sequence, List
from sqlalchemy.sql.expression import Executable
from sqlalchemy.ext.asyncio import AsyncSession


class SessionMixin:
    """Provides instance of database session."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

class BaseService(SessionMixin):
    """Base class for application services."""
    
class BaseDataManager(SessionMixin):
    
    def add_one(self, model: Any) -> None:
        self.session.add(model)
    
    def add_all(self, model: Sequence[Any]) -> None:
        self.session.add_all(model)
    
    async def get_one(self, select_statement: Executable) -> Any:
        return await self.session.scalar(select_statement)
    
    async def get_all(self, select_statement: Executable) -> List[Any]:
        result = self.session.execute(select_statement)
        return await result.all()
        # return list(self.session.scalars(select_statement).all())