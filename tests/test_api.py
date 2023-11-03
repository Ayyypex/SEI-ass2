import requests
from helpers import get_ip, get_port

def test_correct_use():
    try:
        url = 'http://' + get_ip() + ':' + get_port() + '/api?num1=5&num2=3'
        response = requests.get(url)
        assert(response.status_code == 200)
        assert(response.content != None)
        return 0
    except:
        print("API Test: correct_use failed")
        return 1

def test_missing_params():
    try:
        url = 'http://' + get_ip() + ':' + get_port() + '/api?num1=&num2=3'
        response = requests.get(url)
        assert(response.status_code == 400)
        assert(response.content == b'{"error":"Both num1 and num2 parameters are required."}')
        return 0
    except:
        print("API Test: missing_params failed")
        return 1

def test_bad_endpoint():
    try:
        url = url = 'http://' + get_ip() + ':' + get_port()
        response = requests.get(url)
        assert(response.status_code == 404)
        return 0
    except:
        print("API Test: bad_endpoint failed")
        return 1
    
def test_bad_type():
    try:
        url = 'http://' + get_ip() + ':' + get_port() + '/api?num1=True&num2=helloworld'
        response = requests.get(url)
        assert(response.status_code == 400)
        return 0
    except:
        print("API Test: bad_type failed")
        return 1
    
def main():
    result = 0
    result += test_correct_use()
    result += test_missing_params()
    result += test_bad_endpoint()
    result += test_bad_type()

    if result == 0:
        print("All tests passed.")
    else:
        print(f"{result} tests failed.")

if __name__ == "__main__":
    main()