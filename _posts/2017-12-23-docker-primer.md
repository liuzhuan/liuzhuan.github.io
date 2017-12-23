---
layout: post
title: Docker Primer
date: 2017-12-23
---

First, [sign up][cloud] for a Docker ID.

## Concepts

An **image** is a lightweight, stand-alone, executable package that includes everything needed to run a piece of software, including the code, a runtime, libraries, environment variables, and config files.

A **container** is a runtime instance of an image — what the image becomes in memory when actually executed. It runs completely isolated from the host environment by default, only accessing host files and ports if configured to do so.

Containers run apps natively on the host machine’s kernel. They have better performance characteristics than virtual machines.

## Container vs. virtual machines

Virtual Machine diagrams

```
+-----------+-----------+-----------+
|   App A   |   App B   |   App C   |
+-----------+-----------+-----------+
| Bins/Libs | Bins/Libs | Bins/Libs |
+-----------+-----------+-----------+
| Guest OS  | Guest OS  | Guest OS  |
+-----------+-----------+-----------+
|            Hypervisor             |
+-----------------------------------+
|             Host OS               |
+-----------------------------------+
|           Infrastructure          |
+-----------------------------------+
```

Container diagram

```
+-----------+-----------+-----------+
|   App A   |   App B   |   App C   |
+-----------+-----------+-----------+
| Bins/Libs | Bins/Libs | Bins/Libs |
+-----------+-----------+-----------+
|              Docker               |
+-----------------------------------+
|             Host OS               |
+-----------------------------------+
|           Infrastructure          |
+-----------------------------------+
```

## Install

Docker is available in two editions: **Community Edition (CE)** and **Enterprise Edition (EE)**.

Docker CE has two update channels, **stable** and **edge**. **Stable** gives you reliable updates every quarter, and **edge** gives you new features every month.

### Uninstall old versions

```
sudo apt-get remove docker docker-engine docker.io
```

### Install using the repository

```sh
# update the apt package index
sudo apt-get update

# install packages to allow apt to use a repository over HTTPS
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# verify key with the fingerprint `9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88`
sudo apt-key fingerprint 0EBFCD88

# setup stable repository
sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"

# update the apt package index IMPORTANT!
sudo apt-get update

# install the latest version of Docker CE
sudo apt-get install docker-ce

# List the available Docker version
apt-cache madison docker-ce

# install the specific version
sudo apt-get install docker-ce=<VERSION>

# verify docker CE is installed correctly
sudo docker run hello-world
```

> For Ubuntu 17.10 user, if you install as the above commands, you may get the error: "E: Package 'docker-ce' has no installation candidate", you could do this: `sudo vim /etc/apt/sources.list`, changing `stable` into `ege`, and try to install again.

The `docker` group is created but no users are added to it. You need to use `sudo` to run Docker commands.

## Post-installation steps for Linux

### Manage Docker as a non-root user

```sh
# create the docker group
sudo groupadd docker

# add user to the docker group
sudo usermod -aG docker $USER

# log out and log back in to re-evaluate your group membership

# verify without sudo
docker run hello-world
```

## Uninstall Docker CE

```sh
# uninstall the docker ce package
sudo apt-get purge docker-ce

# delete all images, containers, and volumes
sudo rm -rf /var/lib/docker
```

## Read Stack

- [install docker ce on ubuntu](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#upgrade-docker-ce)
- [get started](https://docs.docker.com/get-started/#conclusion)

## REF

- [Docker Homepage][docker]
- [Docker Docs][docs]
- [Docker Cloud][cloud]
- [Install Docker][install]
    - [Get Docker CE for Ubuntu][ubuntu-ce]
    - [Post-installation steps for Linux][postinstall]

[docker]: https://www.docker.com/
[docs]: https://docs.docker.com/
[cloud]: https://cloud.docker.com/
[install]: https://docs.docker.com/engine/installation/
[ubuntu-ce]: https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#os-requirements
[postinstall]: https://docs.docker.com/engine/installation/linux/linux-postinstall/