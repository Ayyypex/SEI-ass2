import subprocess

def get_port():
    cmd = ["kubectl", "get", "service", "gateway-service", '--output=jsonpath="{.spec.ports[0].nodePort}"']
    return subprocess.check_output(cmd).decode('utf-8').strip('"')

def get_url(val1, val2):
    return 'http://' + get_ip() + ':' + get_port() + f'/add?num1={val1}&num2={val2}'

def get_ip():
    cmd = ["minikube", "ip"]
    return subprocess.check_output(cmd).decode('utf-8').strip('\n')