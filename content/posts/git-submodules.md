+++
date = '2025-04-12T22:20:50+08:00'
title = 'Git Submodules'
summary = '如何使用 Git Submodules 管理代码子模块'
tags = ['git']
+++

我们在开发项目时，可能会使用别人开发的代码，比如第三方库或者公共子模块。你可以手动把这些代码复制到当前项目，以便添加定制化功能。但是，当上游代码变化时，如何合并这些变化和定制化代码，会变得十分麻烦。此时，你可以尝试 Git Submodules 子模块。

[Git Submodules][submodules] 是 Git 提供的功能，可以让某个 Git 仓库引用其它 Git 仓库。子仓库可以独立开发，父仓库通过分支名、标签或提交哈希值明确引用子仓库的代码版本。 

为了演示 Git Submodules 的用法，我创建了两个 Git 空仓库：

1. `git@gitee.com:liuz2/main-app.git` 主仓库，将通过 Git Submodule 使用子模块
2. `git@gitee.com:liuz2/foo-module.git` 子仓库，它会作为子模块被 main-app 引用

## 添加子模块 {#add-submodule}

在主仓库中执行 `git submodule add <子仓库地址> <目录>` 命令，可以把子仓库克隆到指定目录下。

```sh
git submodule add git@gitee.com:liuz2/foo-module.git modules/foo
```

以上命令把 foo-module 仓库克隆到本地，并放在 `modules/foo` 目录之下。

此时，如果在主仓库查看状态，会发现生成了 `modules/foo` 目录和 `.gitmodules` 配置文件。 

```sh
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .gitmodules
        new file:   modules/foo
```

配置文件 `.gitmodules` 用于记录子模块远程仓库地址和本地目录的绑定关系。

```sh
$ cat .gitmodules
[submodule "modules/foo"]
        path = modules/foo
        url = git@gitee.com:liuz2/foo-module.git
```

此时，若查看主仓库的配置文件，发现也已同步 `.gitmodules` 的内容。

```sh
$ cat .git/config
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
[remote "origin"]
        url = git@gitee.com:liuz2/main-app.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
[submodule "modules/foo"]
        url = git@gitee.com:liuz2/foo-module.git
        active = true
```

`.gitmodules` 配置文件非常重要，它需要提交到仓库。只有这样，才能保证其他人和你本地的子模块保持一致。

这里只有一个子模块条目，因为我只用了一个 submodule。如果你添加了多个 submodule，配置文件中会出现相应的多个条目。

如果使用 `git diff` 查看变更的具体内容，会发现 `modules/foo` 的变更内容有些特殊，它是 commit hash（提交哈希值），而不是普通的文本行：

```sh
$ git diff --cached
diff --git a/.gitmodules b/.gitmodules
new file mode 100644
index 0000000..6ced3d4
--- /dev/null
+++ b/.gitmodules
@@ -0,0 +1,3 @@
+[submodule "modules/foo"]
+       path = modules/foo
+       url = git@gitee.com:liuz2/foo-module.git
diff --git a/modules/foo b/modules/foo
new file mode 160000
index 0000000..6b93dd2
--- /dev/null
+++ b/modules/foo
@@ -0,0 +1 @@
+Subproject commit 6b93dd2deb54c096e73358123669a51e9442a2f5
```

可以把子模块的 commit hash 想象成 C 语言的指针，它的值是一个地址，它指向的才是具体的实际代码。

使用 `--submodule` 选项，可以让变更内容稍微简洁一些：

```sh
git diff --cached --submodule
```

将变更提交至仓库后，你会看到子模块专属的 `160000` 模式，注意它和普通目录（040000）或文件（100644）的模式不同。

```sh
$ git commit -v
[master 5727329] add foo-module
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 modules/foo
```

然后，将本地代码推送到远程：

```sh
git push origin master
```

## 克隆带有子模块的 Git 仓库 {#clone-repo-with-submodules}

如果一个仓库包含子模块，当你使用普通的 `git clone` 命令克隆到本地，会发现子模块所在目录（modules/foo）为空。

```sh
$ git clone git@gitee.com:liuz2/main-app.git
$ cd main-app
$ ls modules/foo
<空空如也>
```


[submodules]: https://git-scm.com/book/en/v2/Git-Tools-Submodules
