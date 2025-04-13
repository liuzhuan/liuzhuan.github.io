+++
date = '2025-04-12T22:20:50+08:00'
title = 'Git Submodules'
summary = '如何使用 Git Submodules 管理代码子模块'
tags = ['git']
+++

开发项目时，我们会使用别人的代码，比如第三方库或者公共子模块。如果你只是单纯使用，有很多成熟的包管理工具，比如 npm, cargo 等。

如果你需要修改源码，可以手动把这些代码复制到当前项目，然后添加定制化功能。但是，当上游代码变化时，如何处理上游变化和定制化代码，会变得十分麻烦。此时，你可以尝试 Git Submodules 子模块。

[Git Submodules][submodules] 是 Git 提供的功能，可以让某个 Git 仓库引用其它 Git 仓库。被引用的子仓库可以独立开发，父仓库通过分支名、标签或提交哈希值明确引用子仓库的代码版本。 

为了方便描述 Git Submodules 用法，我在 Gitee 创建两个演示用 Git 仓库：

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

配置文件 `.gitmodules` 记录子模块远程仓库地址和本地目录的绑定关系。

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

`.gitmodules` 配置文件非常重要，它需要提交到仓库。只有这样，才能保证他人和你本地子模块保持一致。

这里只有一个子模块条目，如果添加多个 submodule，配置文件中会出现相应的多个条目。

使用 `git diff` 查看变更内容，会发现 `modules/foo` 的变更内容有些特殊，它是 commit hash（提交哈希值），而不是普通的文本行：

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

可以把子模块的 commit hash 想象成 C 语言的指针，它的值是一个地址，它指向的才是具体的实际内容。

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

使用普通 `git clone` 命令克隆带子模块的 Git 仓库到本地，会发现子模块所在目录（modules/foo）为空。

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

若你提前已知某个仓库包含子模块，在 `git clone` 命令使用 `--recurse-submodules` 选项，可以简化上述流程，它会在克隆后自动初始化并拉取子模块代码，一步到位。

```sh
git clone --recurse-submodules git@gitee.com:liuz2/main-app.git
```

如果子模块中嵌套其他子模块，上述命令也能搞定。

如果克隆时忘记 `--recurse-submodules` 选项，你还可以把 `git submodule init` 和 `git submodule update` 两条命令合二为一，替换为 `git submodule update --init` 一条命令。为了处理嵌套子模块，可以增加 `--recursive` 选项，即 `git submodule update --init --recursive`。

## 拉取子模块的上游更新 {#update-submodule}

当子模块的上游更新后，我们可以进入子模块所在目录，使用 `git fetch` 和 `git merge` 拉取最新代码，合并到本地：

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

## 拉取主仓库的更新 {#pull-superproject}

如果你更新了本地的子模块，并推送到远程。你的同事如果在主仓库通过 `git pull` 拉取更新，会发现代码有变更：

```sh
$ git pull
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   foo (new commits)

Submodules changed but not updated:

* modules/foo 2120145...bfc6d37 (1):
  < feat: print current date

no changes added to commit (use "git add" and/or "git commit -a")
```

之所以会这样，因为 `git pull` 默认只拉取子模块对应的提交哈希，但不会自动拉取哈希对应的代码。你的同事需要执行 `git submodule update` 命令拉取最新代码。

```sh
$ git submodule update --init --recursive
Submodule path 'modules/foo': checked out '2120145c7f5d3b5f031c9199fea8f044d4a02fb4'
```

为了安全起见，执行以上代码可以保证子模块代码始终最新。

在 `git pull` 中使用 `--recurse-submodules` 选项，可以自动执行 `git submodule update` 命令。

要注意一种特殊情况：当远程主仓库修改了子模块的仓库 URL，无论执行 `git pull --recurse-submodules` 还是 `git submodule update` 执行都会失效。执行 `git submodule sync` 指令可以修复这个问题：

```sh
$ git submodule sync --recursive
$ git submodule update --init --recursive
```

## 处理子模块 {#working-on-submodules}

使用 `git submodule foreach` 命令，可以在每个子模块下执行任意命令：

```sh
# 暂存每个子模块的变动，以便开启新项目
git submodule foreach 'git stash'

# 查看主项目和所有子模块的变更
git diff; git submodule foreach 'git diff'
```

如果你在某个分支新增了子模块，当切换到其他分支时，建议为 `git checkout` 命令加上 `--recurse-submodules` 选项，它会自动处理不同分支下的子模块代码。

```sh
$ git checkout -b feature-a
$ git submodule add git@gitee.com:xxx/xxx.git
$ git commit -am "Add xxx submodule"
$ git checkout --recurse-submodules master
```

注意，以上 `--recurse-submodules` 选项是 Git 2.13+ 引入的特性。在更早的版本中，切换分支需有手动处理子模块的添加和删除。

对于包含子模块的仓库，建议把上述选项设为默认值，只需执行 `git config submodule.recurse true` 即可。

[submodules]: https://git-scm.com/book/en/v2/Git-Tools-Submodules
