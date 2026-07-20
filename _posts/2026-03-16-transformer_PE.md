---
layout: post
title: Transformer - Positional Encoding
date: 2026-03-16 11:12:00-0400
description: a blog about Positional Encoding in Transformer architecture
tags: transformer-pe
categories: sample-posts
related_posts: false
cover: assets/img/7.jpg
---

## I. Why we need Positional Encoding?

Unlike RNN/LSTM or CNN, which has natural "sense of ordering" because whether they process tokens one by one or each convolution sees **local neighbors**, attention does not contain these things. Therefore, authors of paper {% cite AttentionAllYouNeed %} have decided to add positional embeddings to input embedding, right before feeding to Attention stack (both in Encoder and Decoder).

According to several sources, for example {% cite DetailedPositionEncoding %}, there are a few requirements of positional encoding function

1. It should be bounded and unique.
2. <span id="req-relative-position"></span>It should represent a relative position, meaning the dot product (attention score) between the embeddings of tokens $$i$$ and $$j$$ should depend only on $$i - j$$.
## II. Detail

Let say we have $$N$$ token embeddings, each of them has dimension $$d$$, $$d$$ is even.

Positional encoding is defined as matrix $$P \in \mathbb{R}^{N \times d}$$, in which:

$$
\begin{equation}
\label{eq:pe-formula}
P_{ij} = \begin{cases}
\sin\!\left(\dfrac{i}{10000^{j/d}}\right) & \text{if } j \text{ is even} \\[8pt]
\cos\!\left(\dfrac{i}{10000^{(j-1)/d}}\right) & \text{if } j \text{ is odd}
\end{cases}
\end{equation}
$$
## III. Intuition on why this works

The following argument is inspired by {% cite DetailedPositionEncoding %}.

So for each token embedding, we want our position encoding to have same dimension as the embedding ($$d$$). So we should find a way to convert position index (1, 2, ...) to a high dimensional vector. Binary base seems to be a good choice

<div style="text-align: center; font-family: monospace; line-height: 2.2;">
  <span style="display: inline-block; width: 140px;">0 :&nbsp; <span style="color:#e67e22">0</span> <span style="color:#27ae60">0</span> <span style="color:#2980b9">0</span> <span style="color:#8e44ad">0</span></span>
  <span style="display: inline-block; width: 140px;">8 :&nbsp; <span style="color:#e67e22">1</span> <span style="color:#27ae60">0</span> <span style="color:#2980b9">0</span> <span style="color:#8e44ad">0</span></span><br>
  <span style="display: inline-block; width: 140px;">1 :&nbsp; <span style="color:#e67e22">0</span> <span style="color:#27ae60">0</span> <span style="color:#2980b9">0</span> <span style="color:#8e44ad">1</span></span>
  <span style="display: inline-block; width: 140px;">9 :&nbsp; <span style="color:#e67e22">1</span> <span style="color:#27ae60">0</span> <span style="color:#2980b9">0</span> <span style="color:#8e44ad">1</span></span><br>
  <span style="display: inline-block; width: 140px;">2 :&nbsp; <span style="color:#e67e22">0</span> <span style="color:#27ae60">0</span> <span style="color:#2980b9">1</span> <span style="color:#8e44ad">0</span></span>
  <span style="display: inline-block; width: 140px;">10 : <span style="color:#e67e22">1</span> <span style="color:#27ae60">0</span> <span style="color:#2980b9">1</span> <span style="color:#8e44ad">0</span></span><br>
  <span style="display: inline-block; width: 140px;">3 :&nbsp; <span style="color:#e67e22">0</span> <span style="color:#27ae60">0</span> <span style="color:#2980b9">1</span> <span style="color:#8e44ad">1</span></span>
  <span style="display: inline-block; width: 140px;">11 : <span style="color:#e67e22">1</span> <span style="color:#27ae60">0</span> <span style="color:#2980b9">1</span> <span style="color:#8e44ad">1</span></span><br>
  <span style="display: inline-block; width: 140px;">4 :&nbsp; <span style="color:#e67e22">0</span> <span style="color:#27ae60">1</span> <span style="color:#2980b9">0</span> <span style="color:#8e44ad">0</span></span>
  <span style="display: inline-block; width: 140px;">12 : <span style="color:#e67e22">1</span> <span style="color:#27ae60">1</span> <span style="color:#2980b9">0</span> <span style="color:#8e44ad">0</span></span><br>
  <span style="display: inline-block; width: 140px;">5 :&nbsp; <span style="color:#e67e22">0</span> <span style="color:#27ae60">1</span> <span style="color:#2980b9">0</span> <span style="color:#8e44ad">1</span></span>
  <span style="display: inline-block; width: 140px;">13 : <span style="color:#e67e22">1</span> <span style="color:#27ae60">1</span> <span style="color:#2980b9">0</span> <span style="color:#8e44ad">1</span></span><br>
  <span style="display: inline-block; width: 140px;">6 :&nbsp; <span style="color:#e67e22">0</span> <span style="color:#27ae60">1</span> <span style="color:#2980b9">1</span> <span style="color:#8e44ad">0</span></span>
  <span style="display: inline-block; width: 140px;">14 : <span style="color:#e67e22">1</span> <span style="color:#27ae60">1</span> <span style="color:#2980b9">1</span> <span style="color:#8e44ad">0</span></span><br>
  <span style="display: inline-block; width: 140px;">7 :&nbsp; <span style="color:#e67e22">0</span> <span style="color:#27ae60">1</span> <span style="color:#2980b9">1</span> <span style="color:#8e44ad">1</span></span>
  <span style="display: inline-block; width: 140px;">15 : <span style="color:#e67e22">1</span> <span style="color:#27ae60">1</span> <span style="color:#2980b9">1</span> <span style="color:#8e44ad">1</span></span>
</div>

Here we are assuming $$d=4$$ but we can generalize to higher $$d$$ by simply padding 0 on the left of the binary representation. There are 2 interesting observations here. Firstly, if we fix the binary position, then across different number 1,2, ..., the digit **oscillate**, and the **frequency decreases** as binary position increases.

However, the change in binary representation is too abrupt and neural networks prefer continuous changes because gradients behave better. So we have to come up with a continuous function that rotates when $$i$$ (number/position) increases. We naturally think of the $$\sin$$ function, for example, something like $$\sin(i)$$. Moreover, the frequency should depend on $$j$$, so I guess that is how the authors of {% cite AttentionAllYouNeed %} add the $$\frac{i}{10000^{j/d}}$$ part.

Here is an image of the $$\sin$$ curves when $$j$$ varies.

{% include figure.liquid path="assets/img/pos_encoding_toy.png" class="img-fluid rounded" width="75%" %}

> **Remark.** You may wonder why $\eqref{eq:pe-formula}$ alternates between $\sin$ and $\cos$ rather than using $\sin$ for all dimensions. A key reason is that pairing $\sin$ and $\cos$ allows the dot product between two positional encodings to depend only on the relative distance $i - j$, directly satisfying [Condition 2](#req-relative-position). The proof is as follows.
>
> $$
> \mathrm{PE}(p)
> =
> \Bigl(
> \sin\!\bigl(p/\omega_1\bigr),\,
> \cos\!\bigl(p/\omega_1\bigr),\,
> \sin\!\bigl(p/\omega_2\bigr),\,
> \cos\!\bigl(p/\omega_2\bigr),\,
> \dots,\,
> \sin\!\bigl(p/\omega_m\bigr),\,
> \cos\!\bigl(p/\omega_m\bigr)
> \Bigr),
> $$
>
> where each $\omega_k$ is a frequency scale. Then for two positions $i$ and $j$, their dot product is
>
> $$
> \mathrm{PE}(i)\cdot \mathrm{PE}(j)
> =
> \sum_{k=1}^m
> \left[
> \sin\!\bigl(i/\omega_k\bigr)\sin\!\bigl(j/\omega_k\bigr)
> +
> \cos\!\bigl(i/\omega_k\bigr)\cos\!\bigl(j/\omega_k\bigr)
> \right].
> $$
>
> Applying the identity $\cos(a-b)=\cos a \cos b + \sin a \sin b$ with $a = i/\omega_k$, $b = j/\omega_k$, each bracket collapses to
>
> $$
> \sin\!\bigl(i/\omega_k\bigr)\sin\!\bigl(j/\omega_k\bigr)
> +
> \cos\!\bigl(i/\omega_k\bigr)\cos\!\bigl(j/\omega_k\bigr)
> =
> \cos\!\left(\frac{i-j}{\omega_k}\right).
> $$
>
> Therefore,
>
> $$
> \mathrm{PE}(i)\cdot \mathrm{PE}(j)
> =
> \sum_{k=1}^m
> \cos\!\left(\frac{i-j}{\omega_k}\right).
> $$
>
> Hence, the dot product depends only on the relative distance $i-j$, not on the absolute positions themselves.
{: .block-tip }

## References

{% bibliography --cited %}
