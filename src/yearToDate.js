var _ = require('lodash');

function yearToDate(activities) {
  var statsObject = processActivities({}, activities);

  var statsArray = [];
  for (var property in statsObject) {
    if (statsObject.hasOwnProperty(property)) {
      statsArray.push(statsObject[property]);
    }
  }
  return statsArray;
}

function processActivities(state, activities) {

  var activity = _.head(activities);
  if (!activity) {
    return state;
  }
  var athleteId = "a" + activity.athlete.id;
  addAthleteIfNotExists(athleteId, state, activity.athlete);
  addActivity(athleteId, state, activity);
  return processActivities(state, _.tail(activities));
}

function addAthleteIfNotExists(athleteId, state, athlete) {
  if (!_.has(state, athleteId )){
    state[athleteId] = {
      firstname : athlete.firstname,
      lastname : athlete.lastname,
      profile_medium : athlete.profile_medium,
      distance_ytd: 0,
      moving_time_ytd: 0,
      elapsed_time_ytd: 0,
      total_elevation_gain_ytd: 0,
      total_activities: 0,
    }
  }
}

function addActivity(athleteId, state, activity) {
  var athlete = state[athleteId]
  if (activity.type = 'Ride') {
    athlete.distance_ytd += activity.distance;
    athlete.moving_time_ytd += activity.moving_time;
    athlete.elapsed_time_ytd += activity.elapsed_time;
    athlete.total_elevation_gain_ytd += activity.total_elevation_gain;
    athlete.total_activities += 1;
  }
}

module.exports = yearToDate;
