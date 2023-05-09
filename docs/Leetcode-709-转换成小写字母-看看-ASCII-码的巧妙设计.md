---
title: '力扣 709: 转换成小写字母, 看看 ASCII 码的巧妙设计'
date: 2023-04-17 09:31:31
tags: [算法, 位运算]
layout: post
---

[力扣 709: 转换成小写字母](https://leetcode.cn/problems/to-lower-case/)

## 最直接的解法

本题需要将字符串中的大写字母转换为小写字母，不难想出直接利用 API 的方法：

```typescript
function toLowerCase(s: string): string {
    return s.toLowerCase()
};
```


## 字母在 ASCII 码的分布

![01.png](/resources/2023-04/01.png)

![02.png](/resources/2023-04/02.png)

可以观察到： 大写字母的范围是：60～90，而小写字母则是 97～122，这也是以前学习的时候困惑的一点，同样都是字母，为什么不放到一起呢？

但是，不论连不连续，我们都可以的到一个新的解法：遇到大写字母，得到他的 ASCII 码，加上 32，再转回字符即可。

如果是放到一起的连续的设计，我们同样只要加 26 就行了。

我们可以从图中观察到，如今的这个设计方式，在二进制表示时，大小写字母只相差了一位，所以这种解法才可以进一步优化为位运算。

```typescript
function toLowerCase(s: string): string {
    let ans = ""

    for (let ch of s) {
        if (ch >= 'A' && ch <= 'Z') {
            ans += String.fromCharCode(ch.charCodeAt(0) | 32)
        } else {
            ans += ch
        }
    }

    return ans
};
```

这样需要操作一位就可以了，达到了最高效的解法。


## 总结

可以想像，在以前英语为母语的国家，这种转换是比较高频的操作，而计算资源是比较宝贵的， 如此设计可以将性能优化到最高，不得不感叹，从前计算机科学家的精妙设计。


