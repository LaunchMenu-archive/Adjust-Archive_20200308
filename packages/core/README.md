# Adjust
## A Squishy Application Framework

Adjust is an application framework, primarily designed for usage in open source projects. It allows full customisation of the application through user manipulation and 3rd party plugins.

Applications built with Adjust are simply bundles of separate plugins which cooperate together. Any of these plugins can be overridden by other developers at a later date making Adjust applications infinitely extensible, easy to update and customise to user specification. 

Traditionally developers would import classes from specific javascript files. In Adjust developers "import" Modules (a.k.a. classes) via their interfaces. The module imported is decided at runtime, through user preferences. It is expected to have the same behavior as, is a [subtype](https://en.wikipedia.org/wiki/Subtyping) of, the original intended implementation.

All modules can have an associated GUI representation which will display their data. The GUI is written using a slightly modified version of [ReactJS](https://reactjs.org/) and is contained in an isolated container. This container can be either embedded within an existing container (its parent module), or created as its own container as shown below.

[![Video](https://img.youtube.com/vi/4Rlp3q9dqYM/0.jpg)](https://www.youtube.com/watch?v=4Rlp3q9dqYM)

## Developer info

Adjust is only in its early stages due to several redesigns. A more complete usage guide as well as details on Adjust's implementation will follow in the future.

Here is a rough class diagram overview of Adjust for now:
![cdgm](https://raw.githubusercontent.com/LaunchMenu/Adjust/master/docs/diagrams/overview.png)
