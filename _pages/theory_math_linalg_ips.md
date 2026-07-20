---
layout: page
permalink: /theory/math/linear-algebra/inner-product-space/
title: Inner Product Space
description: Notes on inner product spaces.
nav: false
---

## 1. Gram-Schmidt Process

Convert a linearly independent set $\{v_1, v_2, \ldots, v_n\}$ into an orthonormal set $\{u_1, u_2, \ldots, u_n\}$ with the same span.

**Steps:**

1. Normalize $v_1$:

   $$u_1 = \frac{v_1}{\|v_1\|}$$

2. Subtract the projection of $v_2$ onto $u_1$, then normalize:

   $$v_2 \leftarrow v_2 - (v_2 \cdot u_1)\, u_1, \qquad u_2 = \frac{v_2}{\|v_2\|}$$

3. For each subsequent vector $v_k$, subtract its projections onto all previous $u_i$, then normalize:

   $$v_k \leftarrow v_k - \sum_{i=1}^{k-1}(v_k \cdot u_i)\, u_i, \qquad u_k = \frac{v_k}{\|v_k\|}$$