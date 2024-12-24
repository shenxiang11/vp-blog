---
title: 在 Rust 中使用 Argon2 进行密码哈希处理
date: 2024-12-24 21:00:52+8
tags: [Rust]
layout: post
---

在当今的软件开发中，安全地存储用户密码是至关重要的一环。Argon2 作为一种先进且安全的密码哈希函数，在 Rust 语言中也有着方便的实现，能够帮助我们有效地保护用户的密码信息。本文将详细介绍如何在 Rust 环境下使用 Argon2 来进行密码哈希及验证操作。


## Argon2 简介

Argon2 是密码学领域中备受认可的密钥派生函数，在 2015 年赢得了密码学竞赛。它通过结合内存难的计算特性、使用随机盐值以及对并行计算的抗性等特点，为密码存储提供了高强度的安全保障，能有效抵御常见的密码攻击手段，如彩虹表攻击、暴力破解攻击以及利用 GPU 加速的破解攻击等。


## 基本使用

### 准备工作

首先需要在项目的 Cargo.toml 文件中添加相应的依赖。

```toml
[dependencies]
argon2 = { version = "0.5.3", features = ["std"] }
```

### 密码哈希

```rust
fn hash_password(password: &str) -> Result<String, AppError> {
    let salt = SaltString::generate(&mut OsRng);

    let argon2 = Argon2::default();

    let password_hash = argon2
        .hash_password(password.as_bytes(), &salt)?
        .to_string();

    Ok(password_hash)
}
```

`hash_password` 是一个简单的函数，有令一个更复杂的 `hash_password_customized` 函数，它支持更多参数的自定义配置，它们分别影响着哈希计算的耗时、内存使用量以及多核并行计算的程度，如果你的程序有特别的需要，可以根据实际情况进行调整。


### 密码验证

当用户后续登录尝试输入密码时，需要验证输入的密码与之前存储的哈希值是否匹配。

哈希值还原密码的过程是不可逆的，因此我们无法直接比较两者是否相等，而是需要使用 Argon2 提供的 `verify_password` 方法来进行验证。

```rust
fn verify_password(password: &str, password_hash: &str) -> Result<bool, AppError> {
    let argon2 = Argon2::default();
    let password_hash = PasswordHash::new(password_hash)?;

    let is_valid = argon2
        .verify_password(password.as_bytes(), &password_hash)
        .is_ok();

    Ok(is_valid)
}
```

如果 `is_valid` 的值为 `true`，则表示输入的密码与存储的哈希值匹配，验证通过；否则，验证失败，说明用户输入的密码不正确。
