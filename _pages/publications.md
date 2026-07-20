---
layout: page
permalink: /works/
title: works
description: papers, posters, and ongoing research.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography --query @*[abbr] %}

</div>
