import React, { Component } from 'react';
import { calculateScrollPosition } from './util/calculationUtils';

export default class ReactAutoScroll extends Component {
  componentDidMount() {
    var willbeabletoScroll = this.canScroll(this.props);
    if (this.props.scrollTargetRef && !willbeabletoScroll) {
      console.log(`please check your scrollTargetRef (${this.props.scrollTargetRef}), a scrollTop can not be found!`);
    } else {
      if (this.props.isEnabled) {
        this.doScrollAction();
      } else {
        this.resetAndStopScrolling();
      }
    }
  }

  componentDidUpdate() {
    if (this.props.isEnabled) {
      this.doScrollAction();
    } else {
      this.resetAndStopScrolling();
    }
  }

  canScroll (props) {
    if (!props.scrollTargetRef) {
      return false;
    }

    var scrollTarget = this.getScrollTargetRef(props);
    if(!scrollTarget || scrollTarget.scrollTop === null || scrollTarget.scrollTop === undefined) {
      return false;
    }

    return true;
  }

  doScrollAction() {
    if (this.props.targetPosition >= 0 && !this.isAtScrollTarget(this.getScrollTargetRef(this.props), this.props.targetPosition)) {
      this.isScrolling = true;

      if (this.scrollIntervalId) {
        clearInterval(this.scrollIntervalId);
      }
      this.scrollIntervalId = setInterval(() => this.scrollToTarget(this.props), this.props.updateInterval);
    }
  }

  resetAndStopScrolling() {
    this.stopScrolling();
    this.currentIndexToScrollTo = null;
  }

  getScrollTargetRef(props) {
    if(!props.scrollTargetRef) {
      return null;
    }

    return props.scrollTargetRef.refs ? props.scrollTargetRef.refs.scrollable : props.scrollTargetRef;
  }

  stopScrolling() {
    this.isScrolling = false;
    if (this.scrollIntervalId) {
      clearInterval(this.scrollIntervalId);
    }
  }

  isAtScrollTarget(scrollTargetRef, targetPosition) {

    if(!scrollTargetRef || !scrollTargetRef.scrollTop) {
      return false;
    }

    return Math.abs(scrollTargetRef.scrollTop - targetPosition) <= 2;
  }

  scrollToTarget(props) {
    if (this.canScroll(props)) {
      var scrollTargetRef = this.getScrollTargetRef(props);

      if (this.isScrolling) {
        scrollTargetRef.scrollTop =
          calculateScrollPosition(
            scrollTargetRef.scrollTop,
            props.targetPosition,
            props.speed,
            props.easeType,
          );

        if (this.isAtScrollTarget(scrollTargetRef, props.targetPosition)) {
          scrollTargetRef.scrollTop = props.targetPosition;
          this.props.onScrollingDone();
          this.stopScrolling();
        }
      }
    }
  }

  render() {
    return (
      <div className="autoscrollcomponent">
        {this.props.children}
      </div>
    );
  }
}
