from app.schemas.base import BaseSchema

class QuestionSchema(BaseSchema):
    ''' This is the base class for post-related schemas. '''
    id: int
    question_text: str
    answers: list[str]
    correct_answers: list[str]
    