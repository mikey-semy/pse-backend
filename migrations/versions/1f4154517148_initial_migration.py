"""Initial migration

Revision ID: 1f4154517148
Revises: 
Create Date: 2024-09-09 07:08:57.569745

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '1f4154517148'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    is_sqlite = conn.engine.name == 'sqlite'

    if is_sqlite:
        answers_column = sa.Column('answers', sa.Text(), nullable=False)
        correct_answers_column = sa.Column('correct_answers', sa.Text(), nullable=False)
    else:
        answers_column = sa.Column('answers', postgresql.ARRAY(sa.Text()), nullable=False)
        correct_answers_column = sa.Column('correct_answers', postgresql.ARRAY(sa.Text()), nullable=False)

    op.create_table('questions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('question_text', sa.String(length=1000), nullable=False),
        answers_column,
        correct_answers_column,
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_questions_id'), 'questions', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_questions_id'), table_name='questions')
    op.drop_table('questions')

