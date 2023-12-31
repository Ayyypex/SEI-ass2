import requests
from helpers import get_ip, get_port

def get_url(val1, val2):
    return 'http://' + get_ip() + ':' + get_port() + f'/multiply?num1={val1}&num2={val2}'

def test_values_1():
    try:
        url = get_url(3, 5)
        response = requests.get(url)
        assert(response.status_code == 200)
        assert(response.content == b'{"result":15}')
        return 0
    except:
        print("Multiplication Test: values_1 failed")
        return 1

def test_values_2():
    try:
        url = get_url(-1, -2)
        response = requests.get(url)
        assert(response.status_code == 200)
        assert(response.content == b'{"result":2}')
        return 0
    except:
        print("Multiplication Test: values_2 failed")
        return 1
    
def test_values_3():
    try:
        url = get_url(100, -3)
        response = requests.get(url)
        assert(response.status_code == 200)
        assert(response.content == b'{"result":-300}')
        return 0
    except:
        print("Multiplication Test: values_3 failed")
        return 1
    
def test_bad_type():
    try:
        url = get_url(True, "string")
        response = requests.get(url)
        assert(response.status_code == 400)
        return 0
    except:
        print("Multiplication Test: bad_type failed")
        return 1
    
def test_missing_params():
    try:
        url = 'http://' + get_ip() + ':' + get_port() + f'/add?num1=0&num2='
        response = requests.get(url)
        assert(response.status_code == 400)
        return 0
    except:
        print("Multiplication Test: missing_params failed")
        return 1
    
def main():
    result = 0
    result += test_values_1()
    result += test_values_2()
    result += test_values_3()
    result += test_bad_type()
    result += test_missing_params()

    if result == 0:
        print("All tests passed.")
    else:
        print(f"{result} tests failed.")

if __name__ == "__main__":
    main()