# Experiments in Node

Node Playground is just that, it is a collection of node applications lumped into one place which allows me to experiment with different modules and techniques in a fairly consistent and convenient way. You could call it a sandbox as well I guess, but really, the sandbox is only part of the playground. ;) I'm leaving it open to everyone so that others may benefit. Whether or not anyone does, that remains to be seen.

Essentially this will be the source to the live [Node Playground][npg], but might lag behind slightly if I get lazy about deploying. I'm also not guaranteeing any service level with this site, it might be horribly broken from time to time. However the index page is static HTML, so in general that should be fine.

[npg]: http://nodeplayground.com

## Main Site

The site is divided up into a collection of different applications, each of which can do whatever they need to do. I'm using Apache's [ProxyPass] to keep everything tidy under one roof. The following is the vhost setup on my local machine.

	<VirtualHost *:80>
	  ServerAdmin <your@email.com>
	  ServerName nodeplayground.local
	
	  ProxyPass /chat/ http://localhost:2428/
	  # More applications would go here if necessary.
	  DocumentRoot /path/to/nodeplayground.com/site
	  ErrorLog /path/to/nodeplayground.com/logs/error_log
	  TransferLog /path/to/nodeplayground.com/logs/access_log
	</VirtualHost> 

I'll try to keep this example in sync with reality so that you don't need to figure out which application runs on which port. Of course, you can muck with the ports if you need to. At the moment each app needs to be run separately and manually.

If you want to change the `README.md` file, you can run the `build` script in the root of the project to regenerate the `site/index.html` from it.

[ProxyPass]: http://httpd.apache.org/docs/2.2/mod/mod_proxy.html

### Dependencies

The main site itself has no dependencies unless you want to regenerate the index page from the `README.md` file. The build script has no node based dependencies other than the `fs` and `child_process` modules which come with it. It does currently leverage [MultiMarkdown][mmd] which is use to parse the markdown. I haven't had the best luck with some of the node-based markdown parsers, so I went with what I had that worked. You could do something different.

[mmd]: http://fletcherpenney.net/multimarkdown/

### To Do

 * Use `nodemon` or something similar to watch all the applications and restart them when changed.
 * Create README content for individual applications and have those be linked into the main site documentation.
 * Use a package.json to list dependencies for the sub-apps for easier installation.

# See Also

* [Colin.is] --- a personal biography site written in node with content in CouchDB and inline editing.

[Colin.is]: http://colin.is