---
layout: page
permalink: /theory/deep-learning/probabilistic-deep-learning/bayesian-deep-neural-network/
title: Bayesian Deep Neural Network
description: Notes on Bayesian deep neural networks.
nav: false
---

I. Goal

We want to construct the posterior distribution p(W | D, alpha) and use it to perform prediction.

And we would want to do this using Bayesian rule

So posterior will be approximated by the product of prior p(W | alpha) and likelihood P(D | W)

II. Likelihood

The likelihood is quite easy to get, usually by probabilistic DNN

For example, for regression problem, we can get this by assuming p(Y | X, W) follows a Gaussian distribution N(Y; mean(X,W), variance(X,W))

For classification, we can assume a Categorical distribution


