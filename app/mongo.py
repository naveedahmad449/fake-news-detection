import pymongo
from bson import ObjectId
from datetime import datetime

CLIENT = pymongo.MongoClient("mongodb://localhost:27017")
DATABASE =  CLIENT['factshield']

def fetchReviews():
    COL = DATABASE['reviews']
    data = COL.aggregate([
        {'$limit': 10},
        {'$sort': {'_id': -1}},
        {
            '$lookup': {
                'from': 'users',
                'localField': 'user_id',
                'foreignField': '_id',
                'as': 'user'
            }
        },
        {
            '$project':{
                '_id': 0,
                'user_id': 0,
                'user.password': 0,
                'user._id': 0,
                'user.createdAt': 0
            }
        }
    ])
    return [d for d in data]


def postReview(text, user_id):
    COL = DATABASE['reviews']
    date = datetime.now().isoformat()
    COL.insert_one({'review': text, 'user_id': ObjectId(user_id), 'createdAt': date})
    return 1

def getNewsRes(limit=10, skip=0):
    COL = DATABASE['check_res']
    data = COL.aggregate([
        {'$limit': limit},
        {'$skip': skip},
        {'$sort': {'_id': -1}},
        {
            '$lookup': {
                'from': 'users',
                'localField': "user_id",
                'foreignField': '_id',
                'as': 'user'
            },
        },
        {
            '$project':{
                '_id': 0,
                'user_id': 0,
                'user._id': 0,
                'user.password': 0,
                'user.createdAt': 0,
            }
        }
        ])
    return [d for d in data]

def saveNewsRes(text, status, user_id):
    COL = DATABASE['check_res']
    date = datetime.now().isoformat()
    res = COL.insert_one({'text': text, 'status': status, 'user_id':ObjectId(user_id), 'createdAt': date})
    return res

def loginUser(user, password):
    COL = DATABASE['users']
    res = COL.find_one({'$or': [{'username': user}, {'email': user}]})
    if res:
        if res['password'] == password:
            _id = str(res['_id'])
            del res['_id']
            del res['password']
            return {'message': 'successfully logged!', 'success': 1, 'user': {**res, '_id':_id}}
        else:
            return {'message': "Password is not correct.", 'success': 0}
    return {'message': "User not found with this email/username.", 'success': 0}

def registerUser(user):
    COL = DATABASE['users']
    date = datetime.now().isoformat()
    return COL.insert_one({**user, 'createdAt': date})

def checkUserIsExist(user):
    COL = DATABASE['users']
    cU = COL.find_one({'email': user})
    if cU:
        return 'email'
    cU = COL.find_one({'username': user})
    if cU:
        return 'username' 
    return 'ok'