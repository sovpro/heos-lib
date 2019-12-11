# Heos Library

A Node.js library for HEOS device interaction

## Constructor

The constructor requires a socket as can be acquired with `net.createConnection (...)`

```js
const heos_lib = new HeosLib (socket)
```

## Methods

### registerForChangeEvents

```js
var result = await heos_lib
  .registerForChangeEvents ('on') // on, off
var { enable } = result
```

### getPlayers

```js
var [ player_info ] = await heos_lib.getPlayers ()
var { name, pid, model, version } = player_info
```

### getPlayerInfo

```js
var player_info = await heos_lib.getPlayerInfo (pid)
var { name, pid, model, version } = player_info
```

### getPlayState

```js
var play_state = await heos_lib.getPlayState (pid)
var { state } = play_state
```

### setPlayState

```js
var result = await heos_lib
  .setPlayState (pid, 'play') // play, pause, stop
var { pid, state } = result
```

### getNowPlayingMedia

```js
var now_playing = await heos_lib
  .getNowPlayingMedia (pid)
var { type, song, artist } = now_playing
```

### getVolume

```js
var { pid, level } = await heos_lib.getVolume (pid)
```

### setVolume

```js
var result = await heos_lib.setVolume (pid, level)
var { pid, level } = result
```

### volumeUp

```js
var result = await heos_lib.volumeUp (pid, step)
var { pid, step } = result
```

### volumeDown

```js
var result = await heos_lib.volumeDown (pid, step)
var { pid, step } = result
```

### getMute

```js
var { pid, state } = await heos_lib.getMute (pid)
```

### setMute

```js
var result = await heos_lib.setMute (pid, state)
var { pid, state } = result
```

### toggleMute

```js
var result = await heos_lib.toggleMute (pid)
var { pid } = result
```

### getPlayMode

```js
var play_mode = await heos_lib.getPlayMode (pid)
var { pid, repeat, shuffle } = play_mode
```

### setPlayMode

```js
var result = await heos_lib
  .setPlayMode (pid, repeat, shuffle)
var { pid, repeat, shuffle } = result
```

### getQueue

```js
var range = [0, 50].join (',')
var queue_data = await heos_lib.getQueue (pid, range) 
var { count, items } = queue_data
```

### playQueueItem

```js
var result = await heos_lib.playQueueItem (pid, qid) 
var { pid, qid } = result
```

### removeFromQueue

```js
var result = await heos_lib.removeFromQueue (pid, qid) 
var { pid, qid } = result
```

### saveQueue

```js
var result = await heos_lib.saveQueue (pid, name) 
var { pid, name } = result
```

### clearQueue

```js
var result = await heos_lib.clearQueue (pid)
var { pid } = result
```

### moveQueueItem

```js
var sqid = 2
var dqid = 8
var result = await heos_lib.moveQueueItem (pid, sqid, dqid)
var { pid, sqid, dqid } = result
```

### playNext

```js
var result = await heos_lib.playNext (pid)
var { pid } = result
```

### playPrevious

```js
var result = await heos_lib.playPrevious (pid)
var { pid } = result
```

### getMusicSources

```js
var [ source_info ] = await heos_lib.getMusicSources ()
var { name, type, sid } = source_info
```

### getSourceInfo

```js
var [ source_info ] = await heos_lib.getSourceInfo (sid)
var { name, type, sid } = source_info
```

### browseSource

```js
var sid   = 1024 // see getMusicSources
var range = [0, 5].join (',')
var { count, items } = await heos_lib
  .browseSource (sid, range)
var [{ name, type, cid }] = items
```

### browseSourceContainers

```js
var sid   = 1024 // see getMusicSources
var cid   = 1    // see browseSource
var range = [0, 50].join (',')
var { count, items } = await heos_lib
  .browseSourceContainers (sid, cid, range)
var [{ name, type, cid }] = items
```

### getSourceSearchCriteria

```js
var criterias_list = await heos_lib
  .getSourceSearchCriteria (sid)
var [{ name, scid, cid }] = criterias_list
```

### browseSearch

```js
var sid    = 1024 // see getMusicSources
var scid   =    3 // see getSourceSearchCriteria
var search = 'search query'
var range  = [0, 50].join (',')
var { count, items } = await heos_lib
  .browseSearch (sid, search, scid, range)
var [{ name, type, mid }] = items
```

Item properties present depends on the type. 

### playStation

```js
var sid     =  13 // see getMusicSources
var cid     =   1 // see browseSource, browseSourceContainers
var mid     =   1 // see browseSearch, browseSourceContainers
var pid     = 123 // see getPlayers
var name = 'name' // see browseSource, browseSourceContainers
var result = await heosLib
  .playStation (sid, cid, mid, pid, name)
var { cid, cid, mid, pid, name } = result
```

### playPresetStation

```js
var preset = 1 // see getHeosFavorites
var result = await heos_lib.playPresetStation (pid, preset)
var { pid, preset } = result
```

### playInputSource

```js
var input_name = 'inputs/hdradio' // see HEOS specification
var result = await heos_lib.playInputSource (pid, input_name)
var { pid, input } = result
```

### playInputSourceFrom

```js
var input_name = 'input/hdradio' // see HEOS specification
var result = await heos_lib
  .playInputSourceFrom (pid, spid, input_name)
var { pid, spid, input } = result
```

### playUrl

```js
var result = await heos_lib.playUrl (pid, url)
var { pid, url } = result
```

### addContainerToQueue

```js
var sid     =  13 // see getMusicSources
var cid     =   1 // see browseSource, browseSourceContainers
var aid     =   1
var pid     = 123 // see getPlayers
var name = 'name' // see browseSource, browseSourceContainers
var result = await heos_lib
  .addContainerTOQueue (sid, cid, aid, pid)
var { sid, cid, aid, pid } = result
```

aid (add criteria) is one of:

1. HeosLib.QUEUE_PLAY_NOW
2. HeosLib.QUEUE_PLAY_NEXT
3. HeosLib.QUEUE_PLAY_LAST
4. HeosLib.QUEUE_REPLACE_AND_PLAY

### addTrackToQueue

```js
var sid     =  13 // see getMusicSources
var cid     =   1 // see browseSource, browseSourceContainers
var mid     = 100 // see browseSource, browseSourceContainers
var aid     =   1 // see addContainerToQueue
var pid     = 123 // see getPlayers
var name = 'name' // see browseSource, browseSourceContainers
var result = await heos_lib
  .addContainerTOQueue (sid, cid, mid, aid, pid)
var { sid, cid, mid, aid, pid } = result
```

### getHeosPlaylists

```js
var range = [0, 50].join (',')
var { count, items } = await heos_lib
  .getHeosPlaylists (range)
var [{ name, type, cid }] = items
```

### renameHeosPlaylist

```js
var result = await heos_lib
  .renameHeosPlaylist (sid, cid, name)
var { sid, cid, name } = result
```

### deleteHeosPlaylist

```js
var result = await heos_lib
  .deleteHeosPlaylist (sid, cid)
var { sid, cid } = result
```

### getHeosHistory

```js
var type = 'tracks' // tracks, stations
var range = [0, 50].join (',')
var { count, items } = await heos_lib
  .getHeosHistory (type, range)
var [{ name, type, cid }] = items
```

### retrieveAlbumMetadata

```js
const { count, items } = await heos_lib
  .retrieveAlbumMetadata (sid, cid)
```

Napster and Rhapsody only.

### setServiceOption

```js
const option = 11 // See HEOS protocol spec
const { count, items } = await heos_lib
  .setServiceOption (sid, option, pid)
```

Options that require 'cid', 'mid' or 'name' are currently not supported by the setServiceOption method. The `command` method can be used as a workaround.

### command

Send a direct command

```js
heos_lib.command ({
  command: 'player/get_volume',
  param:   { pid: 1234567890 }
})
```

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

This unsponsored software is provided, subject to a MIT license, unoffocially and independently of Sound United, LLC, its affiliates, subsidiaries and brands (such as HEOS, Denon and any such not listed here).
