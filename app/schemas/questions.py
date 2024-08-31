from typing import List, Optional
from app.schemas.base import BaseSchema

class QuestionSchema(BaseSchema):
    ''' This is the base class for post-related schemas. '''
    id: Optional[int] = None
    question_text: str
    answers: List[str]
    correct_answers: List[str]
    
    class Config:
        from_attributes = True