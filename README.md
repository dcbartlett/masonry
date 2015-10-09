<!--![Alt text](images/logo.jpg)-->

# Masonry

## What it is.
Masonry is a Web Framework that allows you to create an application with the smallest footprint available at build time.  To accomplish this, Masonry uses a component system that allows you to selectively download components on an as needed basis from the server and cache them in the client.  This is expecially useful for mobile applications.

### In the Web.
Because Masonry was built with modularity in mind, Websites can greatly benefit from the framework.  Website built with Masonry will load faster, be easier to update, have less downtime for changes, and allow for easier User A/B testing.

### On a Phone.
Ever wanted to push an application to an app store that weighs less than 500kb? With Masonry you can do just that.  Because of the way that the framework is written, the _*client*_ of the system is less than 250kb.  The remaining space can then be used for essiential components that need to load immediately for a great user experience.  Whats better than a fast app that installs extremely fast, even on slow networks.

### In the Rear.
Masonry isn't just a front-end framework, but can be used on the server side with Node.JS.  We have created Masonry in a manner that allows you to load components dynamically with a server config as well.  This is especially helpful when building a Server system that does _*clustering*_.  You can create components that will be dynamically pulled in and run as needed based on the jobs the cluster node needs to do.
