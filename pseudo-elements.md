---
layout: default
title: Pseudo Elements
---

https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements

<style>
    .foo::first-line {
        font-variant: small-caps;
    }
</style>

<p class="foo">
    Pseudo class.

    A CSS pseudo-class is a keyword added to a selector that specifies a special state of the element(s) to be selected. For example, :hover will apply a style when the user hovers over the element(s) specified by the selector.

    Pseudo-classes, together with pseudo-elements, let you apply a style to an element not only in relation to the content of the document tree, but also in relation to external factors like the history of the navigator (:visited, for example), the status of its content (like :checked on some form elements), or the position of the mouse (like :hover, which lets you know if the mouse is over an element or not).

    Pseudo elements.

    Just like pseudo-classes, pseudo-elements are added to selectors but instead of describing a special state, they allow you to style certain parts of an element. For example, the ::first-line pseudo-element targets only  the first line of an element specified by the selector. Sometimes you will see double colons (::) instead of just one (:). This is part of CSS3 and an attempt to distinguish between pseudo-classes and pseudo-elements. Most browsers support both values.
</p>