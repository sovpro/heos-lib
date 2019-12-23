# Heos Library

A Node.js library for HEOS device interaction

## Constructor

The constructor requires a socket as can be acquired with `net.createConnection (...)`

```js
const heos_lib = new HeosLib (socket)
```

A timeout for command results may be specified as a `timeout` property on an optional configuration parameter. The value should be set in milliseconds. By default the timeout is set to 5000 (5 seconds).

```js
const heos_lib = new HeosLib (socket, {timeout: 10000})
```

## Methods

There are a number of [Recurring Method Parameters](#recurring-method-parameters)

A list of methods:
- [Register for Change Events](#registerforchangeevents)
- [HEOS Account Check](#checkaccount)
- [HEOS Account Sign In](#signin)
- [HEOS Account Sign Out](#signout)
- [HEOS System Heart Beat](#heartbeat)
- [Get Players](#getplayers)
- [Get Player Info](#getplayerinfo)
- [Get Play State](#getplaystate)
- [Set Play State](#setplaystate)
- [Get Now Playing Media](#getnowplayingmedia)
- [Get Volume](#getvolume)
- [Set Volume](#setvolume)
- [Volume Up](#volumeup)
- [Volume Down](#volumedown)
- [Get Mute](#getmute)
- [Set Mute](#setmute)
- [Toggle Mute](#togglemute)
- [Get Play Mode](#getplaymode)
- [Set Play Mode](#setplaymode)
- [Get Queue](#getqueue)
- [Play Queue Item](#playqueueitem)
- [Remove Item(s) From Queue](#removefromqueue)
- [Save Queue as Playlist](#savequeue)
- [Clear Queue](#clearqueue)
- [Move Queue Item(s)](#movequeueitem)
- [Play Next](#playnext)
- [Play Previous](#playprevious)
- [Get Music Sources](#getmusicsources)
- [Get Source Info](#getsourceinfo)
- [Browse Source](#browsesource)
- [Browse Source Containers](#browsesourcecontainers)
- [Get Source Search Criteria](#getsourcesearchcriteria)
- [Search](#browsesearch)
- [Play Station](#playstation)
- [Play Preset Station](#playpresetstation)
- [Play Input Source](#playinputsource)
- [Play URL](#playurl)
- [Add Container to Queue](#addcontainertoqueue)
- [Add Track to Queue](#addtracktoqueue)
- [Get HEOS Playlists](#getheosplaylists)
- [Rename HEOS Playlist](#renameheosplaylist)
- [Delete HEOS Playlist](#deleteheosplaylist)
- [Get HEOS History](#getheoshistory)
- [Retrieve Album Metadata](#retrievealbummetadata)
- [Set Service Option](#setserviceoption)
- [Command](#command)

### Recurring method parameters

- *pid* - [Player Identifier](#player-identifier)
- *sid* - [Source Identifier](#source-identifier)
- *cid* - [Container Identifier](#container-identifier)
- *scid* - [Search Criteria Identifier](#search-criteria-identifier)
- *mid* - [Media Identifier](#media-identifier)
- *aid* - [Add Criteria Identifier](#add-criteria-identifier)
- *qid* - [Queue Item Identifier](#queue-item-identifier)
- *range* - [Range Specifier](#range-specifier)
- *onoff* - [On Off State](#on-off-state)
- *input_name* - [Input Name](#input-name)

#### Player Identifier

A **pid** property value of an item returned by [getPlayers](#getplayers)

#### Source Identifier

A **sid** property value of an item returned by [getMusicSources](#getmusicsources), [browseSource](#browsesource)

#### Container Identifier

A **cid** property value of an item returned by [browseSource](#browsesource), [browseSourceContainers](#browsesourcecontainers), [browseSearch](#browsesearch).

#### Search Criteria Identifier

A **scid** property value of an item returned by [getSourceSearchCriteria](#getsourcesearchcriteria).

Static constants are available for:

1. HeosLib.SEARCH_CRITERIA_ARTIST
2. HeosLib.SEARCH_CRITERIA_ALBUM
3. HeosLib.SEARCH_CRITERIA_TRACK
4. HeosLib.SEARCH_CRITERIA_STATION
5. HeosLib.SEARCH_CRITERIA_SHOWS
6. HeosLib.SEARCH_CRITERIA_PLAYLIST
7. HeosLib.SEARCH_CRITERIA_ACCOUNTS

Identifiers that can be used vary by source. Identifiers other than provided by the static contants may be available depending on the music source. See [HEOS CLI Protocol Specification](#links)

#### Media Identifier

A **mid** property value of an item returned by [browseSourceContainers](#browsesourcecontainers), [browseSearch](#browsesearch)

#### Add Criteria Identifier

A value available as static constants:

1. HeosLib.QUEUE_PLAY_NOW
2. HeosLib.QUEUE_PLAY_NEXT
3. HeosLib.QUEUE_PLAY_LAST
4. HeosLib.QUEUE_REPLACE_AND_PLAY

#### Queue Item Identifier

A **qid** property value on an item returned by [getQueue](#getqueue).

#### Range Specifier

A comma separated pair of start and end paging index values; inclusive (e.g. '0,9')

#### On Off State

A value of **on** or **off**

#### Input Name

An input name from 4.4.9 of the [HEOS CLI Protocol Specification](#links) v1.13

### registerForChangeEvents

```js
var result = await heos_lib
  .registerForChangeEvents (onoff)
var { enable } = result
```
_See 4.1.1 in [HEOS CLI Protocol Specification](#links) v1.13_

registerForChangeEvents parameters:
* [On Off State](#on-off-state)

### checkAccount

```js
var result = await heos_lib
  .checkAccount ()
var { un } = result
if (un) {
  // 'un' is defined if user is signed-in
  console.log ('Signed-in as ' + un)
}
```
_See 4.1.2 in [HEOS CLI Protocol Specification](#links) v1.13_

### signIn

```js
try {
  await heos_lib.signIn (username, password)
  console.log ('Sign-in success')
}
catch (error) {
  // error message might be 'Invalid credentials'
  console.log ('Sign-in error: ' + error.message)
}
```
_See 4.1.3 in [HEOS CLI Protocol Specification](#links) v1.13_

signIn parameters:
* *username*
* *password*

### signOut

```js
try {
  await heos_lib.signOut ()
}
catch (error) {
  console.log ('Sign-out error: ' + error.message)
}
```
_See 4.1.4 in [HEOS CLI Protocol Specification](#links) v1.13_

### heartBeat

```js
try {
  await heos_lib.heartBeat ()
}
catch (error) {
  console.log ('Heart beat error: ' + error.message)
}
```
_See 4.1.5 in [HEOS CLI Protocol Specification](#links) v1.13_

### getPlayers

```js
var [ player_info ] = await heos_lib.getPlayers ()
var { name, pid, model, version } = player_info
```
_See 4.2.1 in [HEOS CLI Protocol Specification](#links) v1.13_

### getPlayerInfo

```js
var player_info = await heos_lib.getPlayerInfo (pid)
var { name, pid, model, version } = player_info
```
_See 4.2.2 in [HEOS CLI Protocol Specification](#links) v1.13_

getPlayerInfo parameters:
* [Player Identifier](#player-identifier)

### getPlayState

```js
var play_state = await heos_lib.getPlayState (pid)
var { state } = play_state
```
_See 4.2.3 in [HEOS CLI Protocol Specification](#links) v1.13_

getPlayState parameters:
* [Player Identifier](#player-identifier)

### setPlayState

```js
var result = await heos_lib
  .setPlayState (pid, state)
var { pid, state } = result
```
_See 4.2.4 in [HEOS CLI Protocol Specification](#links) v1.13_

setPlayState parameters:
* [Player Identifier](#player-identifier)
* *state* must be *play*, *pause*, or *stop*.

### getNowPlayingMedia

```js
var now_playing = await heos_lib
  .getNowPlayingMedia (pid)
var { type, song, artist } = now_playing
```
_See 4.2.5 in [HEOS CLI Protocol Specification](#links) v1.13_

getNowPlayingMedia parameters:
* [Player Identifier](#player-identifier)

### getVolume

```js
var { pid, level } = await heos_lib.getVolume (pid)
```
_See 4.2.6 in [HEOS CLI Protocol Specification](#links) v1.13_

getVolume parameters:
* [Player Identifier](#player-identifier)

### setVolume

```js
var result = await heos_lib.setVolume (pid, level)
var { pid, level } = result
```
_See 4.2.7 in [HEOS CLI Protocol Specification](#links) v1.13_

setVolume parameters:
* [Player Identifier](#player-identifier)
* *level*

### volumeUp

```js
var result = await heos_lib.volumeUp (pid, step)
var { pid, step } = result
```
_See 4.2.8 in [HEOS CLI Protocol Specification](#links) v1.13_

volumeUp parameters:
* [Player Identifier](#player-identifier)
* *step* must be in range 1 to 10; inclusive

### volumeDown

```js
var result = await heos_lib.volumeDown (pid, step)
var { pid, step } = result
```
_See 4.2.9 in [HEOS CLI Protocol Specification](#links) v1.13_

volumeDown parameters:
* [Player Identifier](#player-identifier)
* *step* must be in range 1 to 10; inclusive

### getMute

```js
var { pid, state } = await heos_lib.getMute (pid)
```
_See 4.2.10 in [HEOS CLI Protocol Specification](#links) v1.13_

getMute parameters:
* [Player Identifier](#player-identifier)

### setMute

```js
var result = await heos_lib.setMute (pid, onoff)
var { pid, state } = result
```
_See 4.2.11 in [HEOS CLI Protocol Specification](#links) v1.13_

setMute parameters:
* [Player Identifier](#player-identifier)
* [On Off State](#on-off-state)

### toggleMute

```js
var result = await heos_lib.toggleMute (pid)
var { pid } = result
```
_See 4.2.12 in [HEOS CLI Protocol Specification](#links) v1.13_

toggleMute parameters:
* [Player Identifier](#player-identifier)

### getPlayMode

```js
var play_mode = await heos_lib.getPlayMode (pid)
var { pid, repeat, shuffle } = play_mode
```
_See 4.2.13 in [HEOS CLI Protocol Specification](#links) v1.13_

getPlayMode parameters:
* [Player Identifier](#player-identifier)

### setPlayMode

```js
var result = await heos_lib
  .setPlayMode (pid, repeat, shuffle)
var { pid, repeat, shuffle } = result
```
_See 4.2.14 in [HEOS CLI Protocol Specification](#links) v1.13_

setPlayMode parameters:
* [Player Identifier](#player-identifier)
* *repeat* must be *off*, *on_one*, or *on_all*
* *shuffle* must be *off* or *on*

### getQueue

```js
var queue_data = await heos_lib.getQueue (pid, range)
var { count, items } = queue_data
```
_See 4.2.15 in [HEOS CLI Protocol Specification](#links) v1.13_

getQueue parameters:
* [Player Identifier](#player-identifier)
* [Range Specifier](#range-specifier)

### playQueueItem

```js
var result = await heos_lib.playQueueItem (pid, qid)
var { pid, qid } = result
```
_See 4.2.16 in [HEOS CLI Protocol Specification](#links) v1.13_

playQueueItem parameters:
* [Player Identifier](#player-identifier)
* [Queue Item Identifier](#queue-item-identifier)

### removeFromQueue

```js
var result = await heos_lib.removeFromQueue (pid, qid)
var { pid, qid } = result
```
_See 4.2.17 in [HEOS CLI Protocol Specification](#links) v1.13_

remvoeFromQueue parameters:
* [Player Identifier](#player-identifier)
* [Queue Item Identifier](#queue-item-identifier)

### saveQueue

```js
var result = await heos_lib.saveQueue (pid, name)
var { pid, name } = result
```
_See 4.2.18 in [HEOS CLI Protocol Specification](#links) v1.13_

saveQueue parameters:
* [Player Identifier](#player-identifier)
* *name*

### clearQueue

```js
var result = await heos_lib.clearQueue (pid)
var { pid } = result
```
_See 4.2.19 in [HEOS CLI Protocol Specification](#links) v1.13_

clearQueue parameters:
* [Player Identifier](#player-identifier)

### moveQueueItem

```js
var result = await heos_lib.moveQueueItem (pid, sqid, dqid)
var { pid, sqid, dqid } = result
```
_See 4.2.20 in [HEOS CLI Protocol Specification](#links) v1.13_

moveQueueItem parameters:
* [Player Identifier](#player-identifier)
* *sqid* (source queue item ID) is the [Queue Item Identifier](#queue-item-identifier) of the item to be moved
* *dqid* (destination queue item ID) is the [Queue Item Identifier](#queue-item-identifier) at the location to move to.

Movement behavior

Moving to a greater qid shifts items between the source qid and destination qid forward (up). Moving to a lesser qid pushes items between the source qid and destination qid backward (down).

### playNext

```js
var result = await heos_lib.playNext (pid)
var { pid } = result
```
_See 4.2.21 in [HEOS CLI Protocol Specification](#links) v1.13_

playNext parameters:
* [Player Identifier](#player-identifier)

### playPrevious

```js
var result = await heos_lib.playPrevious (pid)
var { pid } = result
```
_See 4.2.22 in [HEOS CLI Protocol Specification](#links) v1.13_

playPrevious parameters:
* [Player Identifier](#player-identifier)

### getMusicSources

```js
var [ source_info ] = await heos_lib.getMusicSources ()
var { name, type, sid } = source_info
```
_See 4.4.1 in [HEOS CLI Protocol Specification](#links) v1.13_

### getSourceInfo

```js
var [ source_info ] = await heos_lib.getSourceInfo (sid)
var { name, type, sid } = source_info
```
_See 4.4.2 in [HEOS CLI Protocol Specification](#links) v1.13_

getSourceInfo parameters:
* [Source Identifier](#source-identifier)

### browseSource

```js
var { count, items } = await heos_lib
  .browseSource (sid, range)
var [{ name, type, cid }] = items
```
_See 4.4.3 in [HEOS CLI Protocol Specification](#links) v1.13_

browseSource parameters:
* [Source Identifier](#source-identifier)
* [Range Specifier](#range-specifier)

### browseSourceContainers

```js
var { count, items } = await heos_lib
  .browseSourceContainers (sid, cid, range)
var [{ name, type, cid }] = items
```
_See 4.4.4 in [HEOS CLI Protocol Specification](#links) v1.13_

browseSourceContainers parameters:
* [Source Identifier](#source-identifier)
* [Container Identifier](#container-identifier)
* [Range Specifier](#range-specifier)

### getSourceSearchCriteria

```js
var criterias_list = await heos_lib
  .getSourceSearchCriteria (sid)
var [{ name, scid, cid }] = criterias_list
```
_See 4.4.5 in [HEOS CLI Protocol Specification](#links) v1.13_

getSourceSearchCriteria parameters:
* [Source Identifier](#source-identifier)

### browseSearch

```js
var { count, items } = await heos_lib
  .browseSearch (sid, search, scid, range)
var [{ name, type, mid }] = items
```
_See 4.4.6 in [HEOS CLI Protocol Specification](#links) v1.13_

browseSearch parameters:
* [Source Identifier](#source-identifier)
* *search*
* [Search Criteria Identifier](#search-criteria-identifier)
* [Range Specifier](#range-specifier)

Properties of the returned items may vary depending on the source identifier and search criteria identifier parameters.

### playStation

```js
var result = await heosLib
  .playStation (sid, cid, mid, pid, name)
var { cid, cid, mid, pid, name } = result
```
_See 4.4.7 in [HEOS CLI Protocol Specification](#links) v1.13_

playStation parameters:
* [Source Identifier](#source-identifier)
* [Container Identifier](#container-identifier)
* [Media Identifier](#media-identifier)
* [Player Identifierr](#player-identifier)
* *name* a name from an item returned from [browseSource](#browsesource), [browseSourceContaienrs](#browsesourcecontainers), [browseSearch](#browsesearch), or [getHeosFavorites](#getheosfavorites)

### playPresetStation

```js
var preset = 1
var result = await heos_lib.playPresetStation (pid, preset)
var { pid, preset } = result
```
_See 4.4.8 in [HEOS CLI Protocol Specification](#links) v1.13_

playPresetStation parameters:
* [Player Identifier](#player-identifier)
* *preset* is the name of an item from [getHeosFavorites](#getheosfavorites)

### playInputSource

```js
var result = await heos_lib.playInputSource (pid, input_name)
var { pid, input } = result
```
_See 4.4.9 in [HEOS CLI Protocol Specification](#links) v1.13_

playInputSource parameters:
* [Player Identifier](#player-identifier)
* [Input Name](#input-name)

### playInputSourceFrom

```js
var result = await heos_lib
  .playInputSourceFrom (pid, spid, input_name)
var { pid, spid, input } = result
```
_See 4.4.9 in [HEOS CLI Protocol Specification](#links) v1.13_

playInputSourceFrom parameters:
* [Player Identifier](#player-identifier)
* *spid* a source [Player Identifier](#player-identifier) to play music from
* [Input Name](#input-name)

### playUrl

```js
var result = await heos_lib.playUrl (pid, url)
var { pid, url } = result
```
_See 4.4.10 in [HEOS CLI Protocol Specification](#links) v1.13_

playUrl parameters:
* [Player Identifier](#player-identifier)
* *url*

### addContainerToQueue

```js
var result = await heos_lib
  .addContainerToQueue (sid, cid, aid, pid)
var { sid, cid, aid, pid } = result
```
_See 4.4.11 in [HEOS CLI Protocol Specification](#links) v1.13_

addContainerToQueue parameters
* [Source Identifier](#source-identifier)
* [Container Identifier](#container-identifier)
* [Add Criteria Identifier](#add-criteria-identifier)
* [Player Identifier](#player-identifier)

### addTrackToQueue

```js
var result = await heos_lib
  .addTrackToQueue (sid, cid, mid, aid, pid)
var { sid, cid, mid, aid, pid } = result
```
_See 4.4.12 in [HEOS CLI Protocol Specification](#links) v1.13_

addTrackToQueue parameters
* [Source Identifier](#source-identifier)
* [Container Identifier](#container-identifier)
* [Media Identifier](#media-identifier)
* [Add Criteria Identifier](#add-criteria-identifier)
* [Player Identifier](#player-identifier)

### getHeosPlaylists

```js
var { count, items } = await heos_lib
  .getHeosPlaylists (range)
var [{ name, type, cid }] = items
```
_See 4.4.13 in [HEOS CLI Protocol Specification](#links) v1.13_

getHeosPlaylists parameter:
* [Range Specifier](#range-specifier)

### renameHeosPlaylist

```js
var result = await heos_lib
  .renameHeosPlaylist (sid, cid, name)
var { sid, cid, name } = result
```
_See 4.4.14 in [HEOS CLI Protocol Specification](#links) v1.13_

renameHeosPlaylist parameters:
* [Source Identifier](#source-identifier)
* [Container Identifier](#container-identifier)
* *name*

### deleteHeosPlaylist

```js
var result = await heos_lib
  .deleteHeosPlaylist (sid, cid)
var { sid, cid } = result
```
_See 4.4.15 in [HEOS CLI Protocol Specification](#links) v1.13_

deleteHeosPlaylist parameters:
* [Source Identifier](#source-identifier)
* [Container Identifier](#container-identifier)

### getHeosHistory

```js
var { count, items } = await heos_lib
  .getHeosHistory (type, range)
var [{ name, type, cid }] = items
```
_See 4.4.16 in [HEOS CLI Protocol Specification](#links) v1.13_

getHeosHistory parameters:
* *type* must be *tracks* or *stations*
* [Range Specifier](#range-specifier)

### retrieveAlbumMetadata

```js
const { count, items } = await heos_lib
  .retrieveAlbumMetadata (sid, cid)
```
_See 4.4.17 in [HEOS CLI Protocol Specification](#links) v1.13_

retrieveAlbumMetadata parameters:
* [Source Identifier](#source-identifier)
* [Container Identifier](#container-identifier)

*Napster and Rhapsody only*

### setServiceOption

```js
const option = 11 // See HEOS protocol spec
const { count, items } = await heos_lib
  .setServiceOption (sid, option, pid)
```
_See 4.4.18 in [HEOS CLI Protocol Specification](#links) v1.13_

setServiceOption parameters:
* [Source Identifier](#source-identifier)
* *option* is an option identifier in [section 4.4.19 of the specification](#links) (v1.13)
* [Player Identifier](#player-identifier)

Options that require 'cid', 'mid' or 'name' are currently not supported by the setServiceOption method. The `command` method can be used as a workaround.

### command

Send a direct command:

```js
heos_lib.command ({
  command: 'player/get_volume',
  params:  { pid: 1234567890 }
})
```
_See 3.1 in [HEOS CLI Protocol Specification](#links) v1.13_

Currently, the `command` method does not directly return a value. The result can be obtained with an event listener.

## Events

### data

Receives all events and results. Note that data that could not be determined to be a result or an event will be included here.

### event

Receives all events

#### event:[event name]

Receives results for a specified event. Note event names exclude the 'event/' prefix.

### result

Receives all results

#### result:[command name]

Receives results for a specified command

## Links

* [HEOS by Denon](https://usa.denon.com/us/heos)
* [HEOS CLI Protocol Specification](https://denon-uk.custhelp.com/app/answers/detail/a_id/5744/~/heos-control-protocol-\(cli\))

# Notice

This unsponsored software is provided, subject to a MIT license, unofficially and independently of Sound United, LLC, its affiliates, subsidiaries and brands (such as HEOS, Denon and any such not listed here).
