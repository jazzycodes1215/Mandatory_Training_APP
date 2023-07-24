localhost:4000
GET

Input:
/users

Output:
[
    {
        "id": 1,
        "first_name": "user",
        "last_name": "greatest",
        "rank_id": 1,
        "email": "email",
        "password": "$2b$10$7rqr7/R8ItOmWDVQh97tMuKM9jOMTH3QRepdtDRYoEvsljLngEMle",
        "dodID": 1609444483,
        "role_id": 1,
        "supervisor_id": 1,
        "unit_id": 1
    }
]


Specific User

Input:
/users/:id

Output:

{
    "id": 1,
    "first_name": "user",
    "last_name": "greatest",
    "rank_id": 1,
    "email": "email",
    "password": "$2b$10$7rqr7/R8ItOmWDVQh97tMuKM9jOMTH3QRepdtDRYoEvsljLngEMle",
    "dodID": 1609444483,
    "role_id": 1,
    "supervisor_id": 1,
    "unit_id": 1
}

