from typing import List

from sqlalchemy import select

from app.models.questions import QuestionModel
from app.schemas.questions import QuestionSchema
from app.services.base import BaseService, BaseDataManager

class QuestionService(BaseService):
    def get_question(self, question_id: int) -> QuestionSchema:
        return QuestionDataManager(self.session).get_question(question_id)

    def get_questions(self) -> List[QuestionSchema]:
        return QuestionDataManager(self.session).get_questions()

class QuestionDataManager(BaseDataManager):
    def get_question(self, question_id: int) -> QuestionSchema:
        statement = select(QuestionModel).where(QuestionModel.id == question_id)
        return self.get_one(statement)

    def get_questions(self) -> List[QuestionSchema]:
        schemas: List[QuestionSchema] = list()
        statement = select(QuestionModel)
        for model in self.get_all(statement):
            schemas.append(QuestionSchema(**model.to_dict()))
        return schemas
