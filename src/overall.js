var _ = require('lodash');

function overall(activities) {
  var stats = {
    distance: 0,
    movingTime: 0,
    elapsedTime: 0,
    totalElevationGain: 0,
    totalActivities: 0
  }
  return _.reduce(activities, updateStats, stats);
}

function updateStats(stats, activity) {
  stats.distance += activity.distance;
  stats.movingTime += activity.moving_time;
  stats.elapsedTime += activity.elapsed_time;
  stats.totalElevationGain += activity.total_elevation_gain;
  stats.totalActivities += 1;
  return stats;
}

module.exports = overall;
