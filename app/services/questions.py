from typing import List

from sqlalchemy import select

from app.models.questions import QuestionModel
from app.schemas.questions import QuestionSchema
from app.services.base import BaseService, BaseDataManager

class QuestionService(BaseService):
    def add_question(self, question: QuestionSchema) -> QuestionSchema:
        new_question = QuestionModel(
            question_text=question.question_text,
            answers=question.answers,
            correct_answers=question.correct_answers
        )
        return QuestionDataManager(self.session).add_question(new_question)

    async def get_question(self, question_id: int) -> QuestionSchema:
        return await QuestionDataManager(self.session).get_question(question_id)

    async def get_questions(self) -> List[QuestionSchema]:
        return await QuestionDataManager(self.session).get_questions()

    async def search_questions(self, q: str) -> List[QuestionSchema]:
        return await QuestionDataManager(self.session).search_questions(q)

class QuestionDataManager(BaseDataManager):
    def add_question(self, new_question) -> QuestionSchema:
        return self.add_one(new_question)
    
    async def get_question(self, question_id: int) -> QuestionSchema:
        statement = select(QuestionModel).where(QuestionModel.id == question_id)
        return await self.get_one(statement)

    async def get_questions(self) -> QuestionSchema:
        schemas: List[QuestionSchema] = []
        statement = select(QuestionModel)
        models = await self.get_all(statement)
        for model in models:
            schemas.append(QuestionSchema(**model.to_dict()))
        return schemas
    
    async def search_questions(self, q: str) -> List[QuestionSchema]:
        schemas: List[QuestionSchema] = []
        statement = statement = select(QuestionModel).where(QuestionModel.question_text.ilike(f"%{q}%"))
        models = await self.get_all(statement)
        for model in models:
            schemas.append(QuestionSchema(**model.to_dict()))
        return schemas
