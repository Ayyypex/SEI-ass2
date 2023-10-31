import subprocess
import requests

responses = ["Thankyou for using our Microservice/Gateway system!", "This string was chosen randomly", 
    "I love software engineering!", "Here is your final result", 
    "This system contains a gateway and 6 other microservices"]

def get_ip():
    cmd = ["minikube", "ip"]
    return subprocess.check_output(cmd).decode('utf-8').strip('\n')

def get_port():
    cmd = ["kubectl", "get", "service", "gateway-service", '--output=jsonpath="{.spec.ports[0].nodePort}"']
    return subprocess.check_output(cmd).decode('utf-8').strip('"')

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