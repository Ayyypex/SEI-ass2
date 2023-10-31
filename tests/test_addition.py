import subprocess
import requests

def get_ip():
    cmd = ["minikube", "ip"]
    return subprocess.check_output(cmd).decode('utf-8').strip('\n')

def get_port():
    cmd = ["kubectl", "get", "service", "gateway-service", '--output=jsonpath="{.spec.ports[0].nodePort}"']
    return subprocess.check_output(cmd).decode('utf-8').strip('"')

def get_url(val1, val2):
    return 'http://' + get_ip() + ':' + get_port() + f'/add?num1={val1}&num2={val2}'

def test_values_1():
    try:
        url = get_url(3, 5)
        response = requests.get(url)
        assert(response.status_code == 200)
        assert(response.content == b'{"result":8}')
        return 0
    except:
        print("Addition Test: values_1 failed")
        return 1

def test_values_2():
    try:
        url = get_url(-1, -2)
        response = requests.get(url)
        assert(response.status_code == 200)
        assert(response.content == b'{"result":-3}')
        return 0
    except:
        print("Addition Test: values_2 failed")
        return 1
    
def test_bad_type():
    try:
        url = get_url(True, "string")
        response = requests.get(url)
        assert(response.status_code == 400)
        return 0
    except:
        print("Addition Test: bad_type failed")
        return 1
    
def test_missing_params():
    try:
        url = 'http://' + get_ip() + ':' + get_port() + f'/add?num1=0&num2='
        response = requests.get(url)
        assert(response.status_code == 400)
        return 0
    except:
        print("Addition Test: missing_params failed")
        return 1
    
def main():
    result = 0
    result += test_values_1()
    result += test_values_2()
    result += test_bad_type()
    result += test_missing_params()

    if result == 0:
        print("All tests passed.")
    else:
        print(f"{result} tests failed.")

if __name__ == "__main__":
    main()