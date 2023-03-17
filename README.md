# confluence-map

Description

[![Version](https://img.shields.io/npm/v/@draganfilipovic/confluence-map.svg)](https://npmjs.org/package/@draganfilipovic/confluence-map)
[![Build Status](https://github.com/draganfilipovic/confluence-map/workflows/CI/badge.svg?branch=main)](https://github.com/draganfilipovic/confluence-map/actions)
[![CodeQL Analysis](https://github.com/draganfilipovic/confluence-map/workflows/CodeQL/badge.svg?branch=main)](https://github.com/draganfilipovic/confluence-map/actions)
[![semver: semantic-release](https://img.shields.io/badge/semver-semantic--release-blue.svg)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## TLDR;

# Add 2 tables on a page
- First has to be for location data
- Second has to be for config data

## Locations data:
Table needs to have at least 3 columns:
- first one with tasks checkbox
- second with Label
- third with `long,lat`


# Add HTML widget for a map with:
```
<nc-map>NC</nc-map>
<script type="module" src="index.js"></script>
```

# Add HTML widget for a route buttons with:
```
<nc-buttons></nc-buttons>
```
