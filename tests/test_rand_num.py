import requests
from helpers import get_ip, get_port

def test_request():
    try:
        url = 'http://' + get_ip() + ':' + get_port() + '/rand'
        response = requests.get(url)
        assert(response.status_code == 200)
        responseString = response.content.decode('utf-8').strip("\n")
        # This will throw if response is badly formatted to parse into an int.
        val = int(responseString)
        assert(val > 0)
        assert(val <= 100)
        return 0
    except:
        print("RandNum Test: request failed")
        return 1

def main():
    result = 0
    # Run tests multiple times due to the random nature
    # of the service.
    for _ in range(0,15):
        result += test_request()

    if result == 0:
        print("All tests passed.")
    else:
        print(f"{result} tests failed.")

if __name__ == "__main__":
    main()