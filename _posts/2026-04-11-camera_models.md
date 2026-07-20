---
layout: post
title: Camera Intrinsic Models
date: 2026-04-11 10:00:00-0400
description: a blog about camera models in computer vision, from pinhole projection to lens distortion
tags: computer-vision camera
categories: sample-posts
related_posts: false
cover: assets/img/camera_models/camera_lens.jpg
---

## I. Introduction

A camera intrinsic model maps a 3D point $$(x, y, z)$$ to a 2D pixel $$(u, v)$$ on the image plane.

Our camera convention is $$x$$-axis points to the right, $$y$$-axis points down, and $$z$$-axis points toward the screen.

For the sake of illustration, lets say we have a grid of 10x10 3D points of same depth, in this case it is 5. So we have 100 points.

{% include figure.liquid path="assets/img/camera_models/3d_points.png" class="img-fluid rounded" width="75%" %}

## II. The linear camera model

This is also called pinhole camera model, it is parameterized by 4 parameters $$f_x, f_y, c_x, c_y$$, in which $$f_x = f / s_x$$, $$f_y = f / s_y$$ ($$f$$ is focal length, which is the distance from camera to the sensor, in mm; $$s_x$$ and $$s_y$$ are pixel size — how many mm correspond to a pixel). So $$f_x$$ and $$f_y$$ unit is pixel. $$c_x, c_y$$ is the position of the optical center in pixel. Optical center is the intersection of camera $$z$$-axis and sensor (image plane).

Projection formula:

$$
u = f_x \frac{x}{z} + c_x, \qquad v = f_y \frac{y}{z} + c_y.
$$

This is the projection of the above 3D points to 2D pixel under linear camera model.

{% include figure.liquid path="assets/img/camera_models/linear_models.png" class="img-fluid rounded" width="75%" %}

## III. The spherical camera model

However, when we want to capture a wide range, the pinhole model shows some shortcomings.

**Limitation of the Pinhole Model.**
In the pinhole camera model, a 3D point $$(x, y, z)$$ is projected onto the image plane as

$$
u = f_x \frac{x}{z}, \quad v = f_y \frac{y}{z}.
$$

Let $$\theta = \arctan\left(\frac{x}{z}\right)$$ denote the horizontal ray angle. Then

$$
u = f_x \tan(\theta).
$$

As the field of view increases, $$\theta \to \pm \frac{\pi}{2}$$, and $$\tan(\theta) \to \infty$$.
Thus, image coordinates become unbounded, and rays near $$90^\circ$$ cannot be represented.
This makes the pinhole model unsuitable for wide field-of-view cameras.

**Spherical Camera Model.**
Instead of mapping via $$\tan(\theta)$$, the spherical model maps angles directly:

$$
u = f_x \, \theta, \quad v = f_y \, \phi,
$$

where $$(\theta, \phi)$$ are the azimuth and elevation angles of the ray. Since angles are bounded,
this formulation remains well-defined for all viewing directions, enabling modeling of wide
field-of-view (e.g., fisheye) cameras.

The angles are defined as:

- $$\theta$$: azimuth around the $$y$$-axis (rotation in the $$xz$$-plane)
- $$\phi$$: elevation (up/down from the $$xz$$-plane)

$$
\theta = \arctan\!\left(\frac{x}{z}\right), \quad \phi = \arctan\!\left(\frac{y}{\sqrt{x^2 + z^2}}\right)
$$

This is the projection of 3D grid to 2D plan under spherical camera model
{% include figure.liquid path="assets/img/camera_models/spherical_models.png" class="img-fluid rounded" width="75%" %}

> **Remark.** We can intuitively imagine the spherical projection as follows. Consider a sphere of radius $$z$$ (the depth of the 3D grid) centered at the camera. We find the intersections of the rays from the camera through each 3D point with this sphere. We then "cut" and "unwrap" the sphere onto a flat plane (parallel to the camera sensor). This gives a new grid of 3D points, which we then project onto the sensor using the linear camera model.
>
> Note that the original 3D grid must be symmetrically located around the optical axis for this to work.
{: .block-tip }

## References

{% bibliography --cited %}
