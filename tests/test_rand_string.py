import requests
from helpers import get_ip, get_port

responses = ["Thankyou for using our Microservice/Gateway system!", "This string was chosen randomly", 
    "I love software engineering!", "Here is your final result", 
    "This system contains a gateway and 6 other microservices"]

def test_request():
    try:
        url = 'http://' + get_ip() + ':' + get_port() + '/randString'
        response = requests.get(url)
        assert(response.status_code == 200)
        responseString = response.content.decode('utf-8').strip("\n")
        assert(responseString in responses)
        return 0
    except:
        print("RandString Test: request failed")
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