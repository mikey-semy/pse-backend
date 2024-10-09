from typing import List
import json
from sqlalchemy import select

from app.models.questions import QuestionModel
from app.schemas.questions import QuestionSchema
from app.services.base import BaseService, BaseDataManager

class QuestionService(BaseService):
    async def add_question(self, question: QuestionSchema) -> QuestionSchema:
        new_question = QuestionModel(
            question_type=question.question_type,
            question_text=question.question_text,
            answers=question.answers,
            correct_answers=question.correct_answers
        )
        return await QuestionDataManager(self.session).add_question(new_question)
    
    async def add_all_questions(self) -> None:
        with open('app/data/questions.json', 'r', encoding='utf-8') as file:
            questions = json.load(file)

        for question in questions:
            question_data = json.loads(list(question.values())[0])
            new_question = QuestionModel(
                    question_text=question_data.get('questionText', ''),
                    answers=question_data.get('answerText', []),
                    correct_answers=question_data.get('correctAnswerText', [])
                )
            await QuestionDataManager(self.session).add_question(new_question)
            
    async def update_question(self, question_id: int, updated_question: QuestionSchema
                              ) -> QuestionSchema:
        updated_question = QuestionModel(
            question_type=updated_question.question_type,
            question_text=updated_question.question_text,
            answers=updated_question.answers,
            correct_answers=updated_question.correct_answers
        )
        return await QuestionDataManager(self.session).update_question(question_id, updated_question)

    async def update_question_by_text(self, q: str, updated_question: QuestionSchema
                              ) -> QuestionSchema:
        updated_question = QuestionModel(
            question_type=updated_question.question_type,
            question_text=updated_question.question_text,
            answers=updated_question.answers,
            correct_answers=updated_question.correct_answers
        )
        return await QuestionDataManager(self.session).update_question_by_text(q, updated_question)
    
    async def get_question(self, question_id: int) -> QuestionSchema:
        return await QuestionDataManager(self.session).get_question(question_id)

    async def get_questions(self) -> List[QuestionSchema]:
        return await QuestionDataManager(self.session).get_questions()

    async def search_questions(self, q: str) -> List[QuestionSchema]:
        return await QuestionDataManager(self.session).search_questions(q)

class QuestionDataManager(BaseDataManager):
    async def add_question(self, new_question) -> QuestionSchema:
        return await self.add_one(new_question)

    async def update_question(self,
                              question_id: int,
                              updated_question: QuestionSchema) -> QuestionSchema | None:
        old_question = await self.get_question(question_id)
        schema: QuestionSchema = await self.update_one(old_question, updated_question)
        return schema

    async def update_question_by_text(self,
                              q: str,
                              updated_question: QuestionSchema) -> QuestionSchema | None:
        old_question = await self.search_questions(q)
        print(f"old_question: {old_question}")
        if old_question == []:
            return None
        if len(old_question) > 1:
            schema: QuestionSchema = await self.update_one(old_question[0], updated_question)
        else:
            schema: QuestionSchema = await self.update_one(old_question, updated_question)
        return schema
    
    async def get_question(self, question_id: int) -> QuestionSchema | None:
        statement = select(QuestionModel).where(QuestionModel.id == question_id)
        schema: QuestionSchema = await self.get_one(statement)
        return schema

    async def get_questions(self, statement = select(QuestionModel)) -> List[QuestionSchema]:
        schemas: List[QuestionSchema] = []
        models = await self.get_all(statement)
        for model in models:
            schemas.append(QuestionSchema(**model.to_dict))
        return schemas

    async def search_questions(self, q: str) -> List[QuestionSchema]:
        statement = select(QuestionModel).where(QuestionModel.question_text.ilike(f"%{q}%"))
        return await self.get_questions(statement)
