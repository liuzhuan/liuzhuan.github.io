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

TOREAD: https://docs.docker.com/engine/installation/

## REF

- [Docker Homepage][docker]
- [Docker Docs][docs]
- [Docker Cloud][cloud]
- [Install Docker][install]

[docker]: https://www.docker.com/
[docs]: https://docs.docker.com/
[cloud]: https://cloud.docker.com/
[install]: https://docs.docker.com/engine/installation/