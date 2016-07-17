[![Stories in Ready](https://badge.waffle.io/exercism/gui.png?label=ready&title=Ready)](https://waffle.io/exercism/gui)
[![Windows Build status](https://ci.appveyor.com/api/projects/status/m7djinnk5hcyivab?svg=true)](https://ci.appveyor.com/project/holandes22/exercism-gui)
[![Linux/Mac Build Status](https://travis-ci.org/exercism/gui.svg?branch=master)](https://travis-ci.org/exercism/gui)
[![Dependency Status](https://david-dm.org/exercism/gui.svg)](https://david-dm.org/exercism/gui)
[![devDependency Status](https://david-dm.org/exercism/gui/dev-status.svg)](https://david-dm.org/exercism/gui#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/exercism/gui/badges/gpa.svg)](https://codeclimate.com/github/exercism/gui)


# Overview

The purpose of excercism GUI is to provide an alternative to the command line interface (CLI) for [exercism.io](http://exercism.io/)
Is a cross-platform desktop app that aims to lower the barrier of entry for people which feel
more comfortable with a graphical interface than the command line.

![screnshot](https://github.com/exercism/gui/blob/master/resources/screenshot.png)

# Contributing guide

Contributions are more than welcome!

## Project overview

This is an application written with the help of the following technologies:

- [ember.js](http://emberjs.com/) An awesome javascript web framework
- [electron](http://electron.atom.io/) To build the cross-platform desktop app
- [ember-electron](https://github.com/felixrieseberg/ember-electron) an ember.js addon that facilitates
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

After forking and cloning the exercism/gui repo, install the dependencies:

    $ cd /path/to/repo
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

#### Dev
You have the regular debugging tools at your disposal: chromium dev tools, devtron and ember inspector.

You can access the chromium dev tools via the menu in the dev server window (View -> Toggle Developer Tools) or by shortcut (Ctrl+Shift+I on Linux)

TODO: specify dev tools shortcuts for Mac/Windows

You can access the ember inspector and devtron from their respective tabs within the dev tools.

#### Production

In production, chrome dev tools can be accessed by right clicking on at app and selecting `View -> Toggle Developer Tools`

## Packaging

In order to package the app, run the following

    ember electron:package --platform <your_platform> --arch <your_architecture>

This will output a package under the `./electron-builds` folder

_Note_: If you are on OSX or Linux and Have [Wine](https://www.winehq.org/) configured, you can also cross-compile for
Windows

## Submitting a PR

- If there is a ticket connected to the PR, add it as prefix in the subject. e.g. `gh-3 some comment closes #3`
- If the commit closes one or several tickets, add comment like so `closes #<ticket_number>`
