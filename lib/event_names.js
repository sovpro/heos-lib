const event_names = [
    'sources_changed'
  , 'players_changed'
  , 'player_state_changed'
  , 'player_now_playing_changed'
  , 'player_now_playing_progress'
  , 'player_playback_error'
  , 'player_queue_changed'
  , 'player_volume_changed'
  , 'repeat_mode_changed'
  , 'shuffle_mode_changed'
]

module.exports = {
  get event_names () {
    return event_names.slice ()
  }
}
