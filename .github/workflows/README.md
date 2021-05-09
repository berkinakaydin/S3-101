# Github Actions Notes

This folder contains related CI/CD processes. You have to do a few things before test GitHub Actions in your local.

## Step 1 - Install ```act``` to your local

You can find installation guide of [act](https://github.com/nektos/act)

## Step 2 - Generate ```GITHUB_TOKEN``` 

You need to have ```GITHUB_TOKEN``` to use ```actions/checkout@v2```. You can create it from with this steps

```GitHub Account -> Settings -> Developer Settings -> Personal access tokens -> Generate New Token```

[Shortcut](https://github.com/settings/tokens)


## Step 3 - Generate ```DOCKER_HUB_TOKEN``` 

You are going to need have a docker hub account to push your image to docker hub repository. You can generate ```DOCKER_HUB_TOKEN``` with this steps

```Docker Hub Account -> Account Settings -> Security -> New Access Token```

## Step 4 - A Machine In Remote (Digitalocean or similar)

You have to have a remote machine to run docker on it. Make sure docker is installed and docker daemon running. ```appleboy/ssh-action@master``` opens a connection to our remote machine to pull docker image (we created image in step 3) and run it.


## Step 5 - Create an ```env``` file to run ```act```

We did all necessities to run act. We have to create a env file to run act. You can name it whatever you want.

```
GITHUB_TOKEN= <STEP 2, GITHUB TOKEN>
GITHUB_USERNAME= <GITHUB USERNAME>

DOCKER_HUB_USERNAME= <DOCKER HUB USERNAME>
DOCKER_HUB_TOKEN= <STEP 3, DOCKER HUB TOKEN>

HOST= <STEP 4, IP ADDR>
USERNAME= <STEP 4, SSH USER>
PASSWORD= <STEP 4, SSH PASSWORD>
PORT=22 (default ssh port)

AWS_ACCESS_KEY_ID= <USE SAME CREDENTIALS TO RUN PROJECT>
AWS_SECRET_ACCESS_KEY= <USE SAME CREDENTIALS TO RUN PROJECT>
BUCKET_NAME= <USE SAME BUCKET NAME TO RUN PROJECT>
```


## Usage

Congrats you did everything to run ```act```. We are ready to test GitHub Actions in our local. 

 ```act --secret-file act-secrets.env```

**P.S. : You need to have docker** 


<p align="center">
  :heart: NodeJS :heart:
</p>
