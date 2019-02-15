---
title: Workshop
layout: archieve
permalink: /categories/workshop/
taxonomy: workshop
author_profile: true
---

{{ content }}

<div class="entries-{{ page.entries_layout | default: 'list' }}">
  {% include posts-category.html taxonomy=page.taxonomy type=page.entries_layout %}
</div>