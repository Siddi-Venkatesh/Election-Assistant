"""
Data API routes for the Election Assistant.

Provides static election data endpoints for the timeline and
polling booth search features. In production these would integrate
with the Election Commission of India's (ECI) databases.
"""
from flask import Blueprint, jsonify, request

data_bp = Blueprint('data', __name__)


@data_bp.route('/timeline', methods=['GET'])
def get_timeline():
    """
    Return the election process timeline steps.

    Returns:
        200: JSON array of timeline phase objects, each containing
             'id', 'phase', 'date', and 'status'.
    """
    timeline = [
        {'id': 1, 'phase': 'Registration', 'date': 'Jan 15 - Mar 30', 'status': 'active'},
        {'id': 2, 'phase': 'Candidate Nomination', 'date': 'Apr 1 - Apr 15', 'status': 'upcoming'},
        {'id': 3, 'phase': 'Voting Day (Phase 1)', 'date': 'May 10', 'status': 'upcoming'},
        {'id': 4, 'phase': 'Results Announcement', 'date': 'Jun 4', 'status': 'upcoming'},
    ]
    return jsonify(timeline), 200


@data_bp.route('/search-booth', methods=['GET'])
def search_booth():
    """
    Search for nearby polling booths by EPIC number.

    Query Parameters:
        epic (str, optional): The voter's EPIC number to look up.

    Returns:
        200: JSON array of booth objects, each containing
             'id', 'name', 'address', and 'distance'.
        400: JSON error if the EPIC parameter is provided but invalid.

    Note:
        In production this endpoint would query the ECI's electoral
        roll database. The current implementation returns deterministic
        mock data representative of what the official API would return.
    """
    epic = request.args.get('epic', '').strip().upper()

    # Basic EPIC validation if provided (3 letters + 7 digits)
    if epic and not (__import__('re').match(r'^[A-Z]{3}\d{7}$', epic)):
        return jsonify({'message': 'Invalid EPIC format. Expected 3 letters followed by 7 digits.'}), 400

    mock_booths = [
        {
            'id': 101,
            'name': 'Govt High School, Block A',
            'address': '123 Main St, New Delhi, 110001',
            'distance': '0.5 km',
        },
        {
            'id': 102,
            'name': 'Community Center, Sector 4',
            'address': '45 Park Ave, New Delhi, 110002',
            'distance': '1.2 km',
        },
        {
            'id': 103,
            'name': 'Municipal Primary School',
            'address': '78 Gandhi Nagar, New Delhi, 110003',
            'distance': '2.1 km',
        },
    ]
    return jsonify(mock_booths), 200

