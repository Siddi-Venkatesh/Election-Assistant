from flask import Blueprint, jsonify

data_bp = Blueprint('data', __name__)

@data_bp.route('/timeline', methods=['GET'])
def get_timeline():
    # Mock data for election timeline steps
    timeline = [
        {"id": 1, "phase": "Registration", "date": "Jan 15 - Mar 30", "status": "active"},
        {"id": 2, "phase": "Candidate Nomination", "date": "Apr 1 - Apr 15", "status": "upcoming"},
        {"id": 3, "phase": "Voting Day (Phase 1)", "date": "May 10", "status": "upcoming"},
        {"id": 4, "phase": "Results Announcement", "date": "Jun 4", "status": "upcoming"}
    ]
    return jsonify(timeline), 200

@data_bp.route('/search-booth', methods=['GET'])
def search_booth():
    # In a real app, this would query a real ECI API or geographic database.
    # We return mock search results for demonstration purposes.
    mock_booths = [
        {
            "id": 101,
            "name": "Govt High School, Block A",
            "address": "123 Main St, New Delhi, 110001",
            "distance": "0.5 km"
        },
        {
            "id": 102,
            "name": "Community Center, Sector 4",
            "address": "45 Park Ave, New Delhi, 110002",
            "distance": "1.2 km"
        }
    ]
    return jsonify(mock_booths), 200
