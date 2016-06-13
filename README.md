[![Stories in Ready](https://badge.waffle.io/holandes22/exercism-gui.png?label=ready&title=Ready)](https://waffle.io/holandes22/exercism-gui)

# Overview

Excercism GUI purpose is to complement the command line interface (CLI) for [exercism.io](http://exercism.io/)

It aims to be a cross-platform desktop app that lowers the barrier of entry for people that feel
more comfortable with a graphical interface than the command line.

# Contributing guide

Contributions are more than welcome!

## Project overview

This is an application written with the help of the following technologies:

- [ember.js](http://emberjs.com/) An awesome javascript web framework
- [electron](http://electron.atom.io/) To build the cross-platform desktop app
- [ember-electron](https://github.com/felixrieseberg/ember-electron) and ember.js addon that facilitates
  ember and electron integration (dev, packaging, running tests, etc.)
- node.js and node packages to communicate with the desktop (notifications, file system, etc.)

## Project structure

This is a standard ember.js app, so if you are familiar with ember and ember-cli you can jump right into.

If you are not familiar with the framework, getting to know ember is needed, but it is very easy to get started with.
Some resources:

- [The ember.js guides]( https://guides.emberjs.com/v2.6.0/)
- Great free ebook (but you can pay for it if you find it useful): https://leanpub.com/ember-cli-101

The project uses the "pod" folder structure (you don't need to worry about this if using ember-cli generators
as this is handled automatically, just be aware if creating files manually)

## Coding conventions

At build time, files are inspected with jshint so make sure there are not warnings.

## Setting up the dev env

### Prerequisites:

    - Latest version of node (check install instructions at https://nodejs.org/en/)
    - Bower: `npm install -g bower`
    - Watchman: optional but highly recommended (to listen on file changes for automatic rebuilds during dev: https://facebook.github.io/watchman/)


### Clone and get started

Clone and install the dependencies:

    git clone git@github.com:holandes22/exercism-gui.git
    cd exercism-gui
    npm install
    bower install

Start the dev app

    ember electron

### Running tests
TODO

### Debugging
TODO

## Packaging

In order to package the app, run the following

    ember electron:package --platform <your_platform> --arch <architecture>

This will output a package under the `./electron-builds` folder

