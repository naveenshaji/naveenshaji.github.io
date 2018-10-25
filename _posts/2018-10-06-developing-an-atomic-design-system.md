---
layout: post
cover:  assets/developing-an-atomic-design-system/cover.jpg
title: Developing an Atomic Design System
date: 2018-10-06 10:00:44
type: Interaction Design
---

It was getting exponentially harder to maintain consistency across the multiple digital product design projects that had landed on my desk. As the product design lead at the firm, I had to take a step towards the right direction - building an atomic design system that makes it infinitely easier for the other designers and developers to keep things consistent throughout the product development cycle. 

We had already completed one development cycle for most of our products, and this was the phase where we were factoring in human-centric design focused on usability. Having an updated design system in place would allow us to focus on usability analysis and improving the user experience. 

We were using React in our development stack, so it seemed natural to go with an atomic design based system as we'd then share common ideologies in the design and development spheres.

> I've always believed in calculated and highly consistent design patterns, and a design system made it easier for everyone to maintain that level of consistency.

The system would include an atom level breakdown into React components as well. These would again be nested into molecule and organism level components which would be used across pages.

### The Atoms

In order to keep things consistent, it was agreed that the lowest possible functional component which could not be broken down further while keeping function, would be termed a _atom_.

However, I wanted to separate out typography and color schemes, as they did not directly have a function, and would therefore not warrant having to React components for them.

> The type was set in Open Sans with a Fibonacci-series deciding various levels of font sizes.

Styling was done in SCSS, so it was simple enough to define and stick to a few critical and highly engaging colors. This was defined as SCSS variables and was available for use throughout. (Although the next step would be to move to use Styled Components for React).

{% highlight scss %}
$white: #ffffff;
$black: #1e2124;
$halfgray: #3f464d;
$gray: #808891;
$primary: #10cfbd;
$pink: #fc4799;
{% endhighlight %}

With this solid framework in place, it was time to define the atom level components. We were using most of these as symbols in Sketch Files, however, we standardized the spacing to another Fibonacci series, and made sure it was kept consistent throughout. 

![photo]({{ site.baseurl }}assets/developing-an-atomic-design-system/Atoms.jpg){:.wide}

Most of these components would ideally end up being stateless components in React for performance. 

> The idea was to manage state at the topmost level and avoid having stateful components wherever possible.

This separation of entities also helped segregate our messy SCSS codebase. Only sub-atomic DIVs would allow nesting. This enabled seamless reusability for our SCSS and reduced the file size to three-fourths of what it used to be.

### The Molecules

Molecules gave more shape and structure to what we were trying to achieve. Usability plays a bigger role here. Every combination of atoms was discussed and analyzed before putting them together as molecules that help users achieve a coherent understanding of the function they perform.

![photo]({{ site.baseurl }}assets/developing-an-atomic-design-system/Molecules.jpg){:.wide}

### The Organisms

These are higher level components that may manage state in the development cycle. These usually come with their own set of interactions, functions, and micro-interactions that serve a purpose. 

![photo]({{ site.baseurl }}assets/developing-an-atomic-design-system/Organisms.jpg){:.wide}

Obviously, this is not the exhaustive list of molecules or organisms that we are using. However, this should give you an insight into our workflow.

### Templates and Pages

Multiple organisms work together in a Template, which is, in fact, a class of pages. Multiple static or dynamic pages can come from a single template - essentially a Model-View-Controller Architecture. 

These pages collectively accomplish user needs and goals and make the application serve its purpose.

## Takeaways

Developing this design system took time and effort - a lot of it. However, the improvement in efficiency in our workflow showed us that it was worth the time and effort. There was a significant improvement in the time taken to prototype and test or even push a complete development cycle.

---

### My Role

I worked as the Product Design Lead, and my responsibilities included overseeing and shaping the firm's digital product ecosystem, as well as to act as a bridge between the design and development teams. I worked on areas from the Overall Design Strategy and User Experience Design to the writing production-ready BEM compliant CSS and React Components.