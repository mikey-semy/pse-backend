from typing import List
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import MetaData, String

from app.models.base import SQLModel, ArrayOfStrings

class QuestionModel(SQLModel):
    __tablename__ = "questions"
    
    metadata = MetaData()
    
    id: Mapped[int] = mapped_column("id", primary_key=True, index=True)
    question_text: Mapped[str] = mapped_column("question_text", String(1000))
    answers: Mapped[List[str]] = mapped_column("answers", ArrayOfStrings())
    correct_answers: Mapped[List[str]] = mapped_column("correct_answers", ArrayOfStrings())
