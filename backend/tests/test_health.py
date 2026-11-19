import pytest
from httpx import ASGITransport, AsyncClient
from backend.app.main import app

@pytest.mark.anyio
async def test_root_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["module"] == "Module 2: Python Backend & API Integration"
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
