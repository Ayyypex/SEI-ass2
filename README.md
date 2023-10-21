# SEI-ass2
## Steps
### 1. Clone repostiory
```shell
git clone https://github.com/Ayyypex/SEI-ass2.git
```

### 2. Install minikukbe (this should also install kubectl)
https://minikube.sigs.k8s.io/docs/start/

### 3. Start minikube
```shell
minikube start

# verify that it has started
minikube status
```

### 4. Build and load Docker images for each microservice
```shell
docker build -t <microservice>-img .
minikube image load <microservice>-img
```

### 5. Deploy the microservices
```shell
# from each directory
kubectl apply -f <microservice>-deployment.yaml
kubectl apply -f <microservice>-service.yaml
```

### 6. Access or call the microservices
From browser: http://<Minikube_IP>:<Node_Port>/add?num1=5&num2=3

From terminal: 
```shell
curl -X GET "http://<Minikube_IP>:<Node_Port>/add?num1=5&num2=3"
```
## Random
### Finding Minikube_IP and Node_Port
1. Get Minikube_IP
    ```shell
    minikube ip
    ```
2. Get Node_Port
    ```shell
    kubectl get services
    ```
    Should look something like:
    ```shell
    NAME                               TYPE      CLUSTER-IP     EXTERNAL-IP  PORT(S)       AGE
    service/addition-microsvc-service  NodePort  10.105.247.21  <none>       80:30484/TCP  39s
    ```
    In this case, Node_Port is 30484.


### Removing a docker image from minikube
1. SSH into minikube:
    ```shell
    # while minikube is running
    minikube ssh
    ```
2. View docker images:
    ```shell
    docker images
    ```
3. Remove docker image
    ```shell
    docker rmi <IMAGE ID>
    ```
