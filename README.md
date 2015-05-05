# Station Spotter

This was a project by @richardcahill and I for the International Space Apps Challenge in 2013. It visualises the location of the International Space Station on a three-dimensional globe in the web-browser. I've since started doing some upgrades.

## Contributing

I've added Bower for dependency management, frontend web dev has moved on in 2 years. I use vagrant to host it locally, rather than file:// or have an http server installed on my machine, I find that it's quicker than solving all of the cross-origin problems that come with the APIs I'm using. You can locate this in a local webserver documentroot if that's what you're into, but I've provided a vagrantfile that will set this up rather nicely. 

To get set up, [Install Vagrant](http://vagrantup.com), [Node and npm](https://github.com/creationix/nvm). Those links explain it easily enough. You'll then want bower (`npm install -g bower`).

Now you should clone the master branch of this repository. To install the dependencies for stationspotter.com (they're not hosted in this git repository themselves), run `bower install`.

When you run `vagrant up`, it will provision a local vm and forward the port, once it's set up you can go to [`127.0.0.1:4567`](127.0.0.1:4567) in your web browser to see the site. You can make changes to the files and they'll be updated straight away, you just need to refresh. You can of course run `vagrant destroy` to delete the VM once you're done.
