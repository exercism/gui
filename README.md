[![Stories in Ready](https://badge.waffle.io/holandes23/exercism-gui.png?label=ready&title=Ready)](https://waffle.io/holandes22/exercism-gui)

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

## Writing tests

- Follow ember conventions as close as possible https://guides.emberjs.com/v2.6.0/testing/
- Use data-test-XYZ selectors to  find HTML components during tests, which helps decoupling
  the HTML layout from finding stuff (thus we avoid breaking tests if we decide to do some
  re-designing). We use `ember-test-selectors` addon to help manage this.

## Setting up the dev env

### Prerequisites:

- Latest version of node (check install instructions at https://nodejs.org/en/)
- Bower: `npm install -g bower`
- Watchman: optional but highly recommended (to listen on file changes for automatic rebuilds during dev: https://facebook.github.io/watchman/)


### Clone and get started

Clone and install the dependencies:

    $ git clone git@github.com:holandes22/exercism-gui.git
    $ cd exercism-gui
    $ npm install
    $ bower install

Start the dev app

    $ ember electron

_Note:_ The dev server by default uses [ember-cli-mirage](http://www.ember-cli-mirage.com/) to
intercept outgoing  requests and mock API responses. This has the purpose of avoiding
extra load on the API and be able to develop even if the API servers are down.
If you want to disable this, set an envar DISABLE_EMBER_CLI_MIRAGE with a value of true:

    $ DISABLE_EMBER_CLI_MIRAGE=true ember electron

### Running tests

To run the tests, do

    $ ember electron:test

If you want to leave the test running on each file save, TDD style:

    $ ember electron:test --server

### Debugging

You have two debugging tools at your disposal: regular chromium dev tools and ember inspector.

You can access the chromium dev tools via the menu in the dev server window (View -> Toggle Developer Tools)

You can access the ember inspector via the link printed out to console when running `ember electron`:

```
$ ember electron
Build successful - 2952ms.
...
...
...
--------------------------------------------------------------------
Ember Inspector running on http://localhost:30820
Open the inspector URL in a browser to debug the app!
--------------------------------------------------------------------
Starting Electron...
--------------------------------------------------------------------
devtron

```

## Packaging

In order to package the app, run the following

    ember electron:package --platform <your_platform> --arch <your_architecture>

This will output a package under the `./electron-builds` folder

_Note_: If you are on OSX or Linux and Have Wine configured, you can also cross-compile for
Windows

## Submitting a PR

- If there is a ticket connected to the PR, add it as prefix in the subject. e.g. `gh-3 some comment closes #3`
- If the commit closes one or several tickets, add comment like so `closes #<ticket_number>`
