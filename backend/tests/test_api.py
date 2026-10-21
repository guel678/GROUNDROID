from fastapi.testclient import TestClient

from app.main import create_app


def make_client(tmp_path):
    database_url = f"sqlite:///{tmp_path / 'groundroid-test.db'}"
    return TestClient(create_app(database_url))


def test_health_reports_connected_sqlite(tmp_path):
    with make_client(tmp_path) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "database": "sqlite"}


def test_startup_seeds_one_experiment_without_duplicates(tmp_path):
    with make_client(tmp_path) as client:
        first = client.get("/experiments").json()

    with make_client(tmp_path) as client:
        second = client.get("/experiments").json()

    assert len(first) == 1
    assert first[0]["name"] == "Test Field - April 2025"
    assert first[0]["width"] == 15
    assert first[0]["length"] == 10
    assert second == first


def test_creates_an_experiment(tmp_path):
    with make_client(tmp_path) as client:
        response = client.post(
            "/experiments",
            json={
                "name": "Demo Plot",
                "description": "Temporary demonstration field",
                "width": 20,
                "length": 15,
                "coordinateReference": "Local grid (m)",
            },
        )

    assert response.status_code == 201
    assert response.json()["name"] == "Demo Plot"
    assert response.json()["provenance"] == "demo"


def test_persists_measurements_for_an_experiment(tmp_path):
    with make_client(tmp_path) as client:
        experiment_id = client.get("/experiments").json()[0]["id"]
        response = client.post(
            f"/experiments/{experiment_id}/measurements",
            json={"rows": [{
                "id": "measurement-1",
                "x": 2.5,
                "y": 4.0,
                "moisture": 23.4,
                "compaction": 1.2,
                "nitrogen": 52,
                "phosphorus": 18,
                "potassium": 25,
                "recordedAt": "2026-10-21T00:00:00Z",
                "provenance": "demo",
            }]},
        )
        stored = client.get(f"/experiments/{experiment_id}/measurements")

    assert response.status_code == 201
    assert response.json()["data"] == {"imported": 1}
    assert stored.status_code == 200
    assert stored.json()[0]["id"] == "measurement-1"


def test_rejects_an_invalid_measurement_batch_without_partial_writes(tmp_path):
    with make_client(tmp_path) as client:
        experiment_id = client.get("/experiments").json()[0]["id"]
        response = client.post(
            f"/experiments/{experiment_id}/measurements",
            json={"rows": [
                {
                    "id": "valid-row",
                    "x": 1,
                    "y": 1,
                    "moisture": 20,
                    "compaction": 1,
                    "nitrogen": 40,
                    "phosphorus": 15,
                    "potassium": 20,
                    "recordedAt": "2026-10-21T00:00:00Z",
                    "provenance": "demo",
                },
                {"id": "invalid-row", "x": "not-a-number"},
            ]},
        )
        stored = client.get(f"/experiments/{experiment_id}/measurements")

    assert response.status_code == 422
    assert stored.json() == []
