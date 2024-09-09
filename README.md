# work-pse

To resolve the UnsupportedCompilationError for the ARRAY type in SQLite, you'll need to use a different data type that SQLite supports. SQLite doesn't have a native ARRAY type, but you can use TEXT to store serialized data instead. Here's how you can modify the QuestionModel in app/models/questions.py:

Import json for serialization:
import json
from sqlalchemy import Text
from sqlalchemy.types import TypeDecorator


Create a custom type for serializing lists:
class ArrayOfStrings(TypeDecorator):
    impl = Text

    def process_bind_param(self, value, dialect):
        if value is not None:
            return json.dumps(value)

    def process_result_value(self, value, dialect):
        if value is not None:
            return json.loads(value)


Update the QuestionModel to use the new type:
class QuestionModel(SQLModel):
    __tablename__ = "questions"
    
    metadata = MetaData()
    
    id: Mapped[int] = mapped_column("id", primary_key=True, index=True)
    question_text: Mapped[str] = mapped_column("question_text", String(1000))
    answers: Mapped[List[str]] = mapped_column("answers", ArrayOfStrings())
    correct_answers: Mapped[List[str]] = mapped_column("correct_answers", ArrayOfStrings())


This change will store the lists as JSON strings in the SQLite database, which is compatible with SQLite's capabilities. Make sure to update your migrations after making these changes.