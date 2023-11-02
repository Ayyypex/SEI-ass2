import requests
import time
from datetime import datetime
from helpers import get_ip, get_port

def test_request():
    try:
        url = 'http://' + get_ip() + ':' + get_port() + '/timestamp'
        response = requests.get(url)
        assert(response.status_code == 200)
        responseString = response.content.decode('utf-8').strip("\n")
        time = responseString.split(',')[2].split(' ')[1].lstrip('0')
        now = str(datetime.now().strftime("%I:%M:%S")).lstrip('0')
        assert(time == now)
        return 0
    except:
        print("Timestamp Test: request failed")
        return 1

def main():
    result = 0
    # Run tests multiple times due to the naturally changing
    # result of the service.
    for _ in range(0,5):
        result += test_request()
        time.sleep(3)

    if result == 0:
        print("All tests passed.")
    else:
        print(f"{result} tests failed.")

if __name__ == "__main__":
    main()