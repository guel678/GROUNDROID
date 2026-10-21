# Groundroid demo API

This temporary FastAPI service persists demo experiments and soil measurements in SQLite. Sampling, reconstruction, and rover behavior remain simulated in the web app.

```powershell
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. Delete `groundroid-demo.db` to reset the demonstration database.
