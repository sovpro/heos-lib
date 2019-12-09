const {
  matchingProps
, getPayload
, getMessage
, getItems
} = require ('./util')

const declrations = [

  { name: 'registerForChangeEvents'
  , command: 'system/register_for_change_events'
  , args: ['enable']
  , success: getMessage
  }

, { name: 'getPlayers'
  , command: 'player/get_players'
  , success: getPayload
  }

, { name: 'getPlayerInfo'
  , command: 'player/get_player_info'
  , args: ['pid']
  , success: getPayload
  }

, { name: 'getPlayState'
  , command: 'player/get_play_state'
  , args: ['pid']
  , success: getMessage
  }

, { name: 'setPlayState'
  , command: 'player/set_play_state'
  , args: ['pid', 'state']
  , success: getMessage
  }

, { name: 'getNowPlayingMedia'
  , command: 'player/get_now_playing_media'
  , args: ['pid']
  , success: getPayload
  }

, { name: 'getVolume'
  , command: 'player/get_volume'
  , args: ['pid']
  , success: getMessage
  }

, { name: 'setVolume'
  , command: 'player/set_volume'
  , args: ['pid', 'level']
  , success: getMessage
  }

, { name: 'volumeUp'
  , command: 'player/volume_up'
  , args: ['pid', 'step']
  , success: getMessage
  }

, { name: 'volumeDown'
  , command: 'player/volume_down'
  , args: ['pid', 'step']
  , success: getMessage
  }

, { name: 'getMute'
  , command: 'player/get_mute'
  , args: ['pid']
  , success: getMessage
  }

, { name: 'setMute'
  , command: 'player/set_mute'
  , args: ['pid', 'state']
  , success: getMessage
  }

, { name: 'toggleMute'
  , command: 'player/toggle_mute'
  , args: ['pid']
  , success: getMessage
  }

, { name: 'getPlayMode'
  , command: 'player/get_play_mode'
  , args: ['pid']
  , success: getMessage
  }

, { name: 'setPlayMode'
  , command: 'player/set_play_mode'
  , args: ['pid', 'repeat', 'shuffle']
  , success: getMessage
  }

, { name: 'getQueue'
  , command: 'player/get_queue'
  , args: ['pid', 'range']
  , success: getItems
  }

, { name: 'playQueueItem'
  , command: 'player/play_queue'
  , args: ['pid', 'qid']
  , success: getMessage
  }

, { name: 'removeFromQueue'
  , command: 'player/remove_from_queue'
  , args: ['pid', 'qid']
  , success: getMessage
  }

, { name: 'saveQueue'
  , command: 'player/save_queue'
  , args: ['pid', 'name']
  , success: getMessage
  }

, { name: 'clearQueue'
  , command: 'player/clear_queue'
  , args: ['pid']
  , success: getMessage
  }

, { name: 'moveQueueItem'
  , command: 'player/move_queue_item'
  , args: ['pid', 'sqid', 'dqid']
  , success: getMessage
  }

, { name: 'playNext'
  , command: 'player/play_next'
  , args: ['pid']
  , success: getMessage
  }

, { name: 'playPrevious'
  , command: 'player/play_previous'
  , args: ['pid']
  , success: getMessage
  }

, { name: 'getMusicSources'
  , command: 'player/get_music_sources'
  , success: getPayload
  }

, { name: 'getSourceInfo'
  , command: 'player/get_source_info'
  , args: ['sid']
  , success: getPayload
  }

, { name: 'browseSource'
  , command: 'browse/browse'
  , args: ['sid', 'range']
  , success: getItems
  }

, { name: 'browseSourceContainers'
  , command: 'browse/browse'
  , args: ['sid', 'cid', 'range']
  , success: getItems
  }

, { name: 'getSourceSearchCriteria'
  , command: 'player/get_search_criteria'
  , args: ['sid']
  , success: getPayload
  }

, { name: 'browseSearch'
  , command: 'browse/search'
  , args: ['sid', 'search', 'scid', 'range']
  , success: getItems
  }

, { name: 'playStation'
  , command: 'browse/play_stream'
  , args: ['sid', 'cid', 'mid', 'pid', 'name']
  , success: getMessage
  }

, { name: 'playPresetStation'
  , command: 'browse/play_preset'
  , args: ['pid', 'preset']
  , success: getMessage
  }

, { name: 'playInputSource'
  , command: 'browse/play_input'
  , args: ['pid', 'input']
  , success: getMessage
  }

, { name: 'playInputSourceFrom'
  , command: 'browse/play_input'
  , args: ['pid', 'spid', 'input']
  , success: getMessage
  }

, { name: 'playUrl'
  , command: 'browse/play_stream'
  , args: ['pid', 'url']
  , success: getMessage
  }

, { name: 'addContainerToQueue'
  , command: 'browse/add_to_queue'
  , args: ['sid', 'cid', 'aid', 'pid']
  , success: getMessage
  }

, { name: 'addTrackToQueue'
  , command: 'browse/add_to_queue'
  , args: ['sid', 'cid', 'mid', 'aid', 'pid']
  , success: getMessage
  }

, { name: 'getHeosPlaylists'
  , func:  async function (range) {
      const music_sources = await this.getMusicSources ()
      const playlists_source = music_sources.find (matchingProps ({name: 'Playlists'}, false))
      return this.browseSource (playlists_source.sid, range)
    }
  }

, { name: 'renameHeosPlaylist'
  , command: 'browse/rename_playlist'
  , args: ['sid', 'cid', 'name']
  , success: getMessage
  }

, { name: 'deleteHeosPlaylist'
  , command: 'browse/delete_playlist'
  , args: ['sid', 'cid']
  , success: getMessage
  }

, { name: 'getHeosHistory'
  , func: async function (type, range) {
      const music_sources = await this.getMusicSources ()
      const history_source = music_sources.find (matchingProps ({name: 'History'}, false))
      const response = await this.browseSource (history_source.sid)
      const typed = response.items.find (matchingProps ({name: type}, false))
      return this.browseSourceContainers (history_source.sid, typed.cid, range)
    }
  }

, { name: 'retrieveMetadata'
  , command: 'browse/retrieve_metadata'
  , args: ['sid', 'cid']
  , success: getPayload
  }

, { name: 'setServiceOption'
  , command: 'browse/set_service_option'
  , args: ['sid', 'option', 'pid']
  , success: getPayload
  }

]

module.exports = {
  get declarations () {
    return declrations.slice ()
  }
}

