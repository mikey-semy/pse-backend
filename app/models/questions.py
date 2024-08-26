from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text
from sqlalchemy.types import ARRAY

from app.models.base import SQLModel

class QuestionModel(SQLModel):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column("id", primary_key=True, index=True)
    question_text: Mapped[str] = mapped_column("question_text", String(500))
    answers: Mapped[list[str]] = mapped_column("answers", ARRAY(Text()))
    correct_answers: Mapped[list[str]] = mapped_column("correct_answers", ARRAY(Text()))