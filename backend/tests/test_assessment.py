import pytest
from httpx import ASGITransport, AsyncClient
from backend.app.main import app

VALID_PAYLOAD = {
    "demographics": {
        "age": 25,
        "gender": "female",
        "occupation": "Data Analyst",
        "sleepHours": 7.0,
        "physicalActivityDays": 3,
        "caffeineIntake": "moderate",
        "workStressLevel": 3,
    },
    "phq9": {
        "1": 1, "2": 2, "3": 1, "4": 2, "5": 0, "6": 1, "7": 1, "8": 0, "9": 0
    },
    "gad7": {
        "1": 2, "2": 1, "3": 2, "4": 1, "5": 1, "6": 0, "7": 0
    },
    "dass21": {
        "1": 1, "2": 0, "3": 2, "4": 0, "5": 1, "6": 1, "7": 0,
        "8": 2, "9": 1, "10": 1, "11": 1, "12": 2, "13": 2, "14": 1,
        "15": 1, "16": 1, "17": 0, "18": 1, "19": 0, "20": 0, "21": 1
    }
}

@pytest.mark.anyio
async def test_submit_valid_assessment():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/api/assessment/submit", json=VALID_PAYLOAD)
        assert response.status_code == 201
        data = response.json()
        assert data["success"] is True
        assessment_id = data["data"]["assessment_id"]
        assert assessment_id.startswith("ASM-")
        # PHQ-9 sum: 1+2+1+2+0+1+1+0+0 = 8
        assert data["data"]["scores"]["phq9_total"] == 8
        # GAD-7 sum: 2+1+2+1+1+0+0 = 7
        assert data["data"]["scores"]["gad7_total"] == 7

@pytest.mark.anyio
async def test_get_assessment_by_id():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Submit first
        submit_res = await client.post("/api/assessment/submit", json=VALID_PAYLOAD)
        assert submit_res.status_code == 201
        assessment_id = submit_res.json()["data"]["assessment_id"]

        # Retrieve by id
        get_res = await client.get(f"/api/assessment/{assessment_id}")
        assert get_res.status_code == 200
        get_data = get_res.json()
        assert get_data["success"] is True
        assert get_data["data"]["assessment_id"] == assessment_id
        assert get_data["data"]["demographics"]["age"] == 25

@pytest.mark.anyio
async def test_get_nonexistent_assessment():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/assessment/ASM-NON-EXISTENT-ID")
        assert response.status_code == 404

@pytest.mark.anyio
async def test_invalid_payload_validation():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        invalid_payload = {
            "demographics": {
                "age": 10,  # Below min 15
                "gender": "unknown_gender",  # Invalid enum
                "occupation": "",
                "sleepHours": 25,  # Exceeds 24
                "physicalActivityDays": 8,  # Exceeds 7
                "caffeineIntake": "extreme",
                "workStressLevel": 10,  # Exceeds 5
            },
            "phq9": {"1": 5},  # Incomplete and value > 3
            "gad7": {},
            "dass21": {},
        }
        response = await client.post("/api/assessment/submit", json=invalid_payload)
        assert response.status_code == 422
        data = response.json()
        assert data["success"] is False
        assert "Validation Error" in data["error"]
