"""Backend API tests: /api/visit, /api/contact, /api/ root."""
import os
import httpx
import pytest

BASE = os.environ.get("BACKEND_URL", "http://localhost:8001") + "/api"


def test_root():
    r = httpx.get(f"{BASE}/", timeout=15)
    assert r.status_code == 200
    assert "message" in r.json()


def test_visit_returns_shape_and_increments():
    r1 = httpx.post(f"{BASE}/visit", timeout=15)
    assert r1.status_code == 200
    d1 = r1.json()
    assert "total" in d1 and "online" in d1
    assert isinstance(d1["total"], int) and isinstance(d1["online"], int)
    r2 = httpx.post(f"{BASE}/visit", timeout=15)
    assert r2.status_code == 200
    d2 = r2.json()
    assert d2["total"] == d1["total"] + 1
    assert d2["online"] >= 1


def test_contact_persists():
    payload = {
        "name": "TEST_pytest_user",
        "email": "test_pytest@example.com",
        "message": "TEST_pytest_msg automated test - please ignore",
    }
    r = httpx.post(f"{BASE}/contact", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["name"] == payload["name"]
    assert d["email"] == payload["email"]
    assert d["message"] == payload["message"]
    assert "id" in d and "created_at" in d
    # verify persisted via GET
    lst = httpx.get(f"{BASE}/contact", timeout=15).json()
    assert any(m["id"] == d["id"] for m in lst)


def test_contact_validation():
    r = httpx.post(f"{BASE}/contact", json={"name": "", "email": "a@b", "message": ""}, timeout=15)
    assert r.status_code == 422
