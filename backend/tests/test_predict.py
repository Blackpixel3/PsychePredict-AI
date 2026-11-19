import pytest
from httpx import ASGITransport, AsyncClient
from backend.app.main import app

@pytest.mark.anyio
async def test_predict_contract_placeholder():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        payload = {
            "assessment_id": "ASM-TEST-123",
            "phq9": {"1": 2, "2": 1},
            "gad7": {"1": 1},
        }
        response = await client.post("/api/predict", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        predict_data = data["data"]
        assert predict_data["model_status"] == "not_available_in_module_2"
        assert predict_data["contract_ready"] is True
        assert "Module 3" in predict_data["message"]
        # Ensure no fake probabilities are hallucinated
        assert "probabilities" not in predict_data
        assert predict_data["model_specification"]["input_dimensions"] == 44
