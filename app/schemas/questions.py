from typing import List, Optional, Union
from app.schemas.base import BaseSchema
from pydantic import field_validator

class QuestionSchema(BaseSchema):
    ''' This is the base class for post-related schemas. '''
    id: Optional[int] = None
    question_text: str
    answers: Union[str, List[str]]
    correct_answers: Union[str, List[str]]
    
    @field_validator('answers', 'correct_answers', mode='before')
    def ensure_list(cls, v):
        if isinstance(v, str):
            return [v]
        return v
    
    class Config:
        from_attributes = True