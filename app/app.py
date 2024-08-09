from flask import Flask, render_template, request, send_from_directory
from flask_cors import  CORS
import pandas as pd
import re
import os
import string
import pickle
from utils import randomString
from mongo import registerUser, checkUserIsExist, loginUser, saveNewsRes, getNewsRes, postReview, fetchReviews
import hashlib

model_path = './model/fake_news_det.pkl'
vectorizor_path = './model/vectorizer.pkl'


GB = None
vectorizor = None
try:
    with open(model_path, 'rb') as m:
        GB = pickle.load(m)

    with open(vectorizor_path, 'rb') as m:
        vectorizor= pickle.load(m)
except Exception as e:
    print(e)

def wordopt(text):
    text = text.lower()
    text = re.sub('\\[.*?\\]', '', text)
    text = re.sub("\\W", " ", text)
    text = re.sub('https?://\\S+|www\\.\\S+', '', text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub('\n', '', text)
    text = re.sub('\\w*\\d\\w*', '', text)
    return text

def out_lable(n):
    if n == 0:
        return "fake"
    elif n == 1:
        return "real"

def manual_testing(news):
    testing_news = {"text": [news]}
    new_def_test = pd.DataFrame(testing_news)
    new_def_test['text'] = new_def_test['text'].apply(wordopt)
    new_x_test = new_def_test['text']
    new_xv_test = vectorizor.transform(new_x_test)
    pred_GB = GB.predict(new_xv_test)
    return pred_GB[0]

app = Flask(__name__)
CORS(app)
ROOT = os.getcwd()
SEP = os.sep

@app.route('/images/<path:filename>')
def filesReq(filename):
    return send_from_directory('images', filename) 

@app.route('/login', methods=['POST'])
def Login():
    form = request.form
    user = form.get('user')
    password = form.get('password')
    password = hashlib.md5(password.encode('utf-8')).hexdigest()
    log = loginUser(user, password)
    if log:
        return log
    else:
        return {'message': 'email/username or password is incorrect! try again.', 'success': 0}


@app.route('/get-news-res/<int:limit>/<int:skip>', methods=['GET'])
def newsRes(limit=10, skip=0):
    return getNewsRes(limit, skip)


@app.route('/sign-up', methods=['POST'])
def SignUp():
    form = request.form
    username = form.get('username').lower()
    email = form.get('email')
    password = form.get('password')
    password = hashlib.md5(password.encode('utf-8')).hexdigest()
    file = request.files.get('avatar')
    checkExistency = checkUserIsExist(email)

    if checkExistency == 'email':
        return {'message': 'Email exist login with this email or add new.', 'success': 0}

    if checkExistency == 'username':
        return {'message': 'Username already exist choose another one.', 'success': 0}

    path = ''
    if file:
        file_name = randomString(14)
        ext = file.filename.split('.')[-1]
        path =  f"{SEP}images{SEP}{file_name}.{ext}"
        file.save(ROOT+path)
    user = registerUser({'username': username, 'email': email, 'password': password, 'avatar': path})
    return {'message': 'successfully registered!', 'success': 1, '_id': str(user.inserted_id), 'avatar': path}


@app.route('/get-reviews', methods=['GET'])
def getReviews():
    return fetchReviews()

@app.route('/post-review', methods=['POST'])
def addReview():
    form = request.form
    text = form.get('review')
    user_id = form.get('user_id')
    postReview(text, user_id)
    return {'message': 'successfully post.', 'success': 1} 

@app.route('/check', methods=['POST'])
def Check():
    form = request.form
    news = form.get('text')
    user_id = form.get('user_id')
    if news == '':
        return "EmptyRequest"
    p = manual_testing(news) 
    saveNewsRes(news, True if p else False, user_id)
    return out_lable(p) 

@app.route('/')
def Home():
    return render_template('index.html')

@app.route('/predict/<string:news>', methods=['GET'])
def Predict(news):
    print('=> ', news)
    if news == '':
        return "EmptyRequest"
    p = manual_testing(news) 
    return out_lable(p) 

if __name__ == '__main__':
    app.run(debug=True)