from typing import List
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import MetaData, String, DateTime
from datetime import datetime

from app.models.base import SQLModel, ArrayOfStrings

class QuestionModel(SQLModel):
    __tablename__ = "questions"
    
    metadata = MetaData()
    
    id: Mapped[int] = mapped_column("id", primary_key=True, index=True)
    question_type: Mapped[str] = mapped_column("question_type", String(100), nullable=True)
    question_text: Mapped[str] = mapped_column("question_text", String(1000))
    answers: Mapped[List[str]] = mapped_column("answers", ArrayOfStrings())
    correct_answers: Mapped[List[str]] = mapped_column("correct_answers", ArrayOfStrings())
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=True)