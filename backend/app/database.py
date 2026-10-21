from collections.abc import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker


class Base(DeclarativeBase):
    pass


def create_database(database_url: str):
    connect_args = {"check_same_thread": False} if database_url.startswith("sqlite") else {}
    engine = create_engine(database_url, connect_args=connect_args)
    session_factory = sessionmaker(bind=engine, expire_on_commit=False)
    return engine, session_factory


def session_dependency(session_factory: sessionmaker[Session]):
    def get_session() -> Iterator[Session]:
        with session_factory() as session:
            yield session

    return get_session
