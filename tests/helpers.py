import subprocess

def get_port():
    cmd = ["kubectl", "get", "service", "gateway-service", '--output=jsonpath="{.spec.ports[0].nodePort}"']
    return subprocess.check_output(cmd).decode('utf-8').strip('"')

def get_ip():
    cmd = ["minikube", "ip"]
    return subprocess.check_output(cmd).decode('utf-8').strip('\n')