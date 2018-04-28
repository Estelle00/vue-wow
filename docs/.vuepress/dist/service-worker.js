/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "cc3eb4ff5a2bbc0a3c2c98f9461d1fe3"
  },
  {
    "url": "assets/css/2.styles.697e238c.css",
    "revision": "bb1ce0309b14c4308e26c135fa79d62f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.bdc9ce0e.js",
    "revision": "9b08db80ad23d8843ebc0c046a35374a"
  },
  {
    "url": "assets/js/1.07afa77a.js",
    "revision": "ad22abdf7b2c5ecb6a2d7391e6eeddec"
  },
  {
    "url": "assets/js/app.03601bcd.js",
    "revision": "97d6fc967072f9aa0f95f3f72c59be2e"
  },
  {
    "url": "changelog.html",
    "revision": "fae538aad6fecd5165e30903b98f46f8"
  },
  {
    "url": "index.html",
    "revision": "7cd52d3ff4ba98cb20f57a0d4caa81ca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
