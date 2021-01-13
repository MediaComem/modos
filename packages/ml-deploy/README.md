# MoDoS ML-Deploy
## Requirements
* Docker
* [Python 3.7.9](https://www.python.org/downloads/release/python-379/)

## Run project with docker-compose
You can simply run the project with the following command (need docker-compose)
```
docker-compose up
```
You can then access ``localhost:5000`` to see the project running

## Setting up the environment locally
Inside the folder ml-deploy
### Create the venv
```bash
python3 -m venv venv
```
If you are using a system where python 3.6+ is the only python environment, you can use python instead of python3

### Activate the venv
#### Windows
```bash
.\venv\Scripts\activate
```
#### macOS and Linux
```bash
source venv/bin/activate
```
### Upgrade pip
```bash
python3 -m pip install --upgrade pip
```
### Install requirements
```bash
pip install -r requirements.txt
```
## Docker
### Pull the container
```bash
docker pull tensorflow/serving
```
### Start the container
#### Windows
```bash
docker run -t --rm -p 8501:8501 \
    -v "%cd%/models/:/models/" tensorflow/serving \
    --model_config_file=/models/models.config \
    --model_config_file_poll_wait_seconds=60
```
#### Linux
```bash
docker run -t --rm -p 8501:8501 \
    -v "$(PWD)/models/:/models/" tensorflow/serving \
    --model_config_file=/models/models.config \
    --model_config_file_poll_wait_seconds=60
```
The model is being served on port 8501
## Flask
### Start the server
```bash
flask run
```
You can now access the adress [localhost:5000](http://localhost:5000) where you can upload an image and get the prediction
