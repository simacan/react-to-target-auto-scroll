function calculateSpeedLinearly(scrollProps) {
  return scrollProps.speed;
}

function calculateSpeedAccelerated(scrollProps) {
  var scrollSpeedByDistance = Math.abs(scrollProps.distance) * scrollProps.speed;
  return Math.max(scrollSpeedByDistance, 2); //it has to at least scroll by two
}

function hasReachedTargetPosition(scrollProps) {
  if (Math.abs(scrollProps.distance) <= (scrollProps.speed * 1.5)) { //use 1.5 as extra offset
    return true;
  }
  return false;
}

export function calculateScrollPosition(currentPosition, targetPosition, speed, easeTypeName) {

  var distance = targetPosition - currentPosition;
  var scrollProps = { speed, distance };

  if(hasReachedTargetPosition(scrollProps)) {
    return targetPosition;
  }

  var speedIncrement = 0;
  if (easeTypeName === 'linear') {
    speedIncrement = calculateSpeedLinearly(scrollProps);
  } else {
    speedIncrement = calculateSpeedAccelerated(scrollProps);
  }

  var directionToTarget = distance > 0 ? 1.0 : -1.0;
  return currentPosition + (speedIncrement * directionToTarget);
}
