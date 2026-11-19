import pytest
from httpx import ASGITransport, AsyncClient
from backend.app.main import app

@pytest.mark.anyio
async def test_root_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/")
        assert response.status_code == 200
        content_type = response.headers.get("content-type", "")
        if "text/html" in content_type:
            assert "<!doctype html>" in response.text.lower()
        else:
            data = response.json()
            assert data["status"] == "Operational"

@pytest.mark.anyio
async def test_health_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/health")
        assert response.status_code == 200
        json_data = response.json()
        assert json_data["success"] is True
        assert "operational" in json_data["message"]
        assert json_data["data"]["database"] == "SQLite (Active & Connected)"
