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
Alternatively, if you installed docker with apt-get and not snap, you can run the following
```shell
eval $(minikube docker-env)
```
This makes that instance of the terminal use the docker from within minikube and so when you build the image, it is built with the minikube docker and automatically usable by it.
There are also Makefiles to assist in building images in each folder

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

### Checking logs of pods
1. View all pods running
    ```shell
    kubectl get pods
    ```
    Should look something like:
    ```shell
    subtraction-microsvc-deployment-6b95c96cc7-dll9p      1/1     Running   0          5m31s
    ```

2. View logs
    ```shell
    kubectl logs -f <pod name>
    ```
    where pod name would be `subtraction-microsvc-deployment-6b95c96cc7-dll9p` in this instance

### Updating image
1. When an image is rebuilt in minikube, it will replace the existing one.
2. If there is already a deployment applied, the pod can simply be deleted and it will be rebuilt automatically with the new image.
    ```shell
    kubectl delete pod <pod name>
    # Alternatively you can delete all pods
    kubectl delete pod --all
    # You can also force them to exit
    kubectl delete pod --all --force        
    ``` 

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
