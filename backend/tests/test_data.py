"""
Tests for the data API routes.
Validates timeline and booth search endpoints return correct structures.
"""
import json


class TestTimelineRoute:
    """Test suite for GET /api/data/timeline endpoint."""

    def test_timeline_returns_200(self, client):
        """Should return 200 OK status."""
        response = client.get('/api/data/timeline')
        assert response.status_code == 200

    def test_timeline_returns_list(self, client):
        """Should return a JSON array."""
        response = client.get('/api/data/timeline')
        data = json.loads(response.data)
        assert isinstance(data, list)

    def test_timeline_items_have_required_fields(self, client):
        """Each timeline item should have id, phase, date, and status."""
        response = client.get('/api/data/timeline')
        data = json.loads(response.data)
        for item in data:
            assert 'id' in item
            assert 'phase' in item
            assert 'date' in item
            assert 'status' in item

    def test_timeline_has_registration_phase(self, client):
        """Should include a Registration phase."""
        response = client.get('/api/data/timeline')
        data = json.loads(response.data)
        phases = [item['phase'] for item in data]
        assert 'Registration' in phases

    def test_timeline_returns_json_content_type(self, client):
        """Should return application/json content type."""
        response = client.get('/api/data/timeline')
        assert response.content_type.startswith('application/json')


class TestSearchBoothRoute:
    """Test suite for GET /api/data/search-booth endpoint."""

    def test_search_booth_returns_200(self, client):
        """Should return 200 OK status."""
        response = client.get('/api/data/search-booth')
        assert response.status_code == 200

    def test_search_booth_returns_list(self, client):
        """Should return a JSON array."""
        response = client.get('/api/data/search-booth')
        data = json.loads(response.data)
        assert isinstance(data, list)

    def test_search_booth_items_have_required_fields(self, client):
        """Each booth item should have id, name, address, and distance."""
        response = client.get('/api/data/search-booth')
        data = json.loads(response.data)
        for item in data:
            assert 'id' in item
            assert 'name' in item
            assert 'address' in item
            assert 'distance' in item

    def test_search_booth_returns_multiple_results(self, client):
        """Should return at least one booth result."""
        response = client.get('/api/data/search-booth')
        data = json.loads(response.data)
        assert len(data) >= 1
