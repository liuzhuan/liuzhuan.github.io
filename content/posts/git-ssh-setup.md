+++
date = '2025-03-30T10:17:28+08:00'
draft = true
title = 'Git Ssh Setup'
summary = '如何设置 Git 仓库的 SSH 连接？'
tags = ['git', 'ssh']
+++

克隆远程 Git 仓库时，HTTPS 和 SSH 是两个常用的传输协议。HTTPS 设置更简单，通常只需用户名和[个人访问令牌][personal-access-token]即可认证。而 SSH 使用非对称加密算法（如 RSA/Ed25519 等），提供端到端加密和主机验证，安全性更强，但设置稍微繁琐。

## 设置单个 SSH {#single-ssh}

如果你只需要连接一台 Git 服务器，典型的 SSH 设置流程如下：

```sh
# 生成密钥对
ssh-keygen -t ed25519 -C "SSH Key Comments"

# 显示公钥信息
cat ~/.ssh/id_ed25519.pub

# 将公钥信息复制到 Git 仓库的设置页面

# 启动代理
eval "$(ssh-agent -s)"

# 向代理中添加私钥
ssh-add ~/.ssh/id_ed25519

# 测试 SSH 连接是否成功
ssh -T git@example.com
```

命令 `ssh-keygen` 用于生成密钥，它的 `-t` 选项用于指定加密算法类型。目前的默认类型是 ed25519，它的安全性和加解密性能都要高于以前的 rsa 加密算法。

如果想查看已经加载的密钥，可以执行：

```sh
ssh-add -l
```

注意，复制 Fedora Linux 终端文字的快捷键是 `Ctrl+Shift+C`，而不是 `Ctrl+C`。因为 `Ctrl+C` 快捷键的作用是中断命令的执行。

## 设置多个 SSH {#multi-ssh}

你可能使用多个 Git 服务器，比如一个是 GitHub，另一个是 Gitee，可以为每个服务器设置独立的 SSH 密钥。

```sh
# 生成 GitHub 专用密钥
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_github -C "GitHub SSH Key"

# 生成 Gitee 专用密钥
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_gitee -C "Gitee SSH Key"
```

上面命令会生成两套密钥，共四个密钥文件。

复制生成的公钥信息至各自设置面板：

```sh
# 复制到 GitHub 的 Settings > SSH and GPG Keys 页面
cat ~/.ssh/id_ed25519_github.pub

# 复制到 Gitee 的【设置】>【SSH 公钥】页面
cat ~/.ssh/id_ed25519_gitee.pub
```

接下来，需要编辑或创建 `~/.ssh/config` 配置文件，为不同域名指定密钥：

```sh
vim ~/.ssh/config
```

文件内容如下所示（具体参数需要根据你的实际情况做相应调整）：

```ini
# GitHub 配置
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes

# Gitee 配置
Host gitee.com
  HostName gitee.com
  User git
  IdentityFile ~/.ssh/id_ed25519_gitee
  IdentitiesOnly yes
```

然后，测试每个服务器的 SSH 连接：

```sh
ssh -T git@github.com

ssh -T git@gitee.com
```

如果认证成功，将出现字样：`Hi username! You've successfully authenticated...`。

## 修改仓库地址 {#set-url}

通过 HTTPS 连接的仓库地址模式是 `https://github.com/username/repo.git`，而通过 SSH 连接的仓库地质模式为 `git@github.com:username/repo.git`。

如果你原来使用 HTTPS 的方式克隆的 Git 仓库，可以通过以下命令改为 SSH 连接方式：

```sh
git remote set-url origin git@github.com:username/repo.git
```

[personal-access-token]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#about-personal-access-tokens
