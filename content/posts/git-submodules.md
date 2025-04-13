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

此时，需要执行 `git submodule init` 初始化子模块，并执行 `git submodule update` 拉取子模块代码。

```sh
$ git submodule init
Submodule 'modules/foo' (git@gitee.com:liuz2/foo-module.git) registered for path 'modules/foo'

$ git submodule update
Cloning into '/Users/codeman/gitee/liuz2/main-app/modules/foo'...
Submodule path 'modules/foo': checked out '6b93dd2deb54c096e73358123669a51e9442a2f5'
```

此时的 `modules/foo` 目录下会出现子模块的文件，和你推送时的一样。

当你提前知道一个仓库包含子模块时，在 `git clone` 命令中使用 `--recurse-submodules` 选项，可以简化上述流程，可以在克隆后自动初始化并拉取子模块代码，一步到位。

```sh
git clone --recurse-submodules git@gitee.com:liuz2/main-app.git
```

如果子模块中嵌套其他子模块，上述命令也能搞定。

如果克隆时忘记 `--recurse-submodules` 选项，你还可以把 `git submodule init` 和 `git submodule update` 两条命令合二为一，替换为 `git submodule update --init` 一条命令。为了处理嵌套子模块，可以增加 `--recursive` 选项，即 `git submodule update --init --recursive`。

## 拉取子模块的上游更新 {#update-submodule}

当子模块的上游更新后，我们可以进入子模块所在目录，使用 `git fetch` 和 `git merge` 拉取最新代码，并合并到本地：

```sh
$ git fetch
$ git merge origin/master
```

此时，回到主仓库的根目录，执行 `git diff --submodule` 命令，可以看到子模块的更新内容和对应的提交日志。

```sh
$ git diff --submodule
Submodule modules/foo 6b93dd2..1d0f686:
  > feat: add app.js
```

如果你想在执行 `git diff` 时，默认添加 `--submodule` 选项，可以将 `diff.submodule` 选项设为 `"log"`。

```sh
git config --global diff.submodule log
```

这个时候提交变更，便会把子模块内容锁定到新版本。

拉取子模块更新还有一个更简单的命令，你无需进入每个子模块目录手动拉取代码，只需在主仓库根目录执行 `git submodule update --remote` 即可。

```sh
$ git submodule update --remote
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (3/3), 285 bytes | 95.00 KiB/s, done.
From gitee.com:liuz2/foo-module
   1d0f686..bfc6d37  master     -> origin/master
Submodule path 'modules/foo': checked out 'bfc6d37974e1f9fb772638eb26efb6c050ef00da'
```

这个命令默认拉取子模块远程仓库的默认分支，你可以指定其他分支名。比如，把 `modules/foo` 子模块的分支从默认的 `master` 改为 `production`，并把这个配置储存到 `.gitmodules` 文件。

```sh
git config -f .gitmodules submodule.modules/foo.branch production
```

如果没有 `-f .gitmodules` 选项，只有你能看到这个修改，其他人看不到。

如果你想在 `git status` 时，能够看到子模块的具体更新内容，可以设置 `status.submodulesummary` 选项：

```sh
git config --global status.submodulesummary 1
```

[submodules]: https://git-scm.com/book/en/v2/Git-Tools-Submodules
