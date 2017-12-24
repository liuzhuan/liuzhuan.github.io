---
layout: post
title: Shell 入门
date: 2017-12-19
---

Shell 无处不在，异常强大，是每个开发人员必备技能。

写脚本很简单，但是写一个运行正常、稳定可靠的脚本并非易事，需要扎实的基础知识。

This document only covers the **Bourne shell** syntax.

## 内建命令

```sh
# 别名，用短名表示复杂命令
alias listsource="ls *.c *.h"
# 别名只在当前 shell 会话期间有效，
# 若要使其永久生效，可将其保存至登录脚本。
```

## 登录脚本

对于 `bash`, `zsh` 等 `Bourne shell` 家族，以下文件可以保存设置：

- `~/.profile` 所有登录脚本自动执行
- `~/.bash_profile` 与 `.profile` 类似，但仅在 bash 中执行
- `~/.bashrc` 和 `~/.zshrc` 对非登陆 `bash` 或 `zsh` shell 脚本自动运行。

可在 `.bashrc` 中读取 `.profile` 内容：

```sh
. $HOME/.profile
```

## 输入特殊字符

输入特殊字符时，可以在其之前输入 `Ctrl-v`，这会禁止之后特殊字符的功能：

```
echo "control-V control-G"
```

将在屏幕输出：

```
echo "^G"
```

## Shell Script Basics

It is often easy to write a script, but it can be more challenging to write a script that consistently works well.

There are two different set of shell script syntax: the **Bourne shell** syntax and the **C shell** syntax. The Bourne shell syntax is more flexible and thus more widely used.

Bourne-compatible shells includes: `sh`, `bash`, `zsh`, `ksh`.

### Shell Variables and Printing

```sh
#!/bin/sh

echo "Hello, world!"
```

`#!/bin/sh` is known as an **interpreter line**.

Let's use a few variables:

```sh
#!/bin/sh

FIRST_ARGUMENT="$1"
echo "Hello, world $FIRST_ARGUMENT!"
```

The variable `$1` contains the first argument passed to the shell script.

If you dereference a variable, you precede it with a dollor sign `$`.

### Using arguments And Variables That Contain Spaces

Using quotation marks is particularly important when working with variables that contain filenames or paths. For example, type the following commands:

```sh
mkdir "/tmp/My Folder"
FILENAME="/tmp/My Folder"
ls "$FILENAME"
ls $FILENAME
```

Notice that the shell misinterprets the second `ls` command as being an attempt to list the files in `/tmp/My` and the files in `Folder` 

### Handling Quotation Marks in Strings

```sh
MYSTRING="The word of the day is \"sedentary\"."
```

Shell scripts also allow the use of single quote marks. **Variables between single quotes are not replaced by their contents**.

```sh
name='monica'
echo "$name" # monica
echo '$name' # $name
```

### Exporting Shell Variables

The exported variables are commonly known as `environment variables`. The most famous environment variable is `PATH` variable.

### Using the `export` Buitlin

Generally speaking, the first time you assign a value to an environment variable, the Bourne shell creates a new, *local* copy of this shell variable that is specific to your script. Any tool executed from your script is passed the original value inherited from whatever script, tool, or shell that launched it.

To guarantee that your modifications to a shell variable are passed to any script or tool that your shell script calls, you *must* use the `export` builtin.

```sh
export PATH="/usr/local/bin:$PATH"

# or
PATH="/usr/local/bin:$PATH"
export PATH
```

You can use `printenv` command to obtain a complete list of defined variables and the `grep` to see if it is in the list. For example:

```sh
printenv | grep -c '^USER'
```

### Overriding Environment Variables for Child Processes

```sh
#!/bin/sh

# printmyvar.sh
echo $MYVAR
```

```sh
MYVAR=7 ./printmyvar.sh
```

### Deleting Shell Variables

To delete the variable entirely, use the `unset` builtin. For example:

```sh
MYVAR="this is a test"
unset MYVAR
echo "MYVAR is \"$MYVAR\""
```

## Shell Input and Output

The Bourne shell provides a number of ways to read and write files, display text, and get information from the user, including `echo`, `printf`, `read`, `cat`, pipes, and redirection.

### Shell Script Input and Output Using printf and read

```sh
#!/bin/sh

printf "What is your name? -> "
read NAME
echo "Hello, $NAME. Nice to meet you."
```

The `printf` command does not automatically add a newline to the end of the line, handy for prompts.

The `read` command takes a line of input and separates it into a series of arguments.

You can modify the behavior of the `read` command by modifying the shell variable `IFS` (short for internal field separators). For example:

```sh
#!/bin/sh

printf "Type three numbers separated by 'q'. -> "
IFS="q"
read NUMBER1 NUMBER2 NUMBER3
echo "You said: $NUMBER1, $NUMBER2, $NUMBER3"
```

You run this script and enter `1q3q57q65`, the script replies with `You said: 1, 3, 57q65`.

### Bulk I/O Using the `cat` Command

By combining `cat` with `<<`, you can send a large quantity of text to a file. For example:

```sh
cat > myprogram.c << EOF
#include <stdio.h>
int main(int argc, char * argv[]) {
    // ...
}
EOF
```

### Pipes and Redirection

The true power of shell scripting lies in the ability to read and write files and chain multiple program together in interesting ways.

Each program in a UNIX-based or UNIX-like system has three basic file descriptors: standard input (`stdin`), standard output (`stdout`), and standard error (`stderr`).

Basic File Redirection

```sh
# create a new file
echo "a single line of text" > MyFile

# append another line of text
echo "another line of text" >> MyFile
```

## Read Stack

- [Shell Input and Output][io]

## REF

- [Shell Scripting Primer - apple.com][apple-shell-primer]

[apple-shell-primer]: https://developer.apple.com/library/content/documentation/OpenSource/Conceptual/ShellScripting/Introduction/Introduction.html
[basics]: https://developer.apple.com/library/content/documentation/OpenSource/Conceptual/ShellScripting/shell_scripts/shell_scripts.html
[io]: https://developer.apple.com/library/content/documentation/OpenSource/Conceptual/ShellScripting/ShellInputandOutput/ShellInputandOutput.html