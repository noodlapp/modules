import React, { useState, useRef, useEffect, useCallback } from "react";
import classNames from 'classnames';

import css from "./ChatContainer.module.scss";

// There is a bug in Chromium when using iframe,
// since we have full control over the scroll area,
// lets just do it all by ourselves...
// https://bugs.chromium.org/p/chromium/issues/detail?id=819314#c21
function scrollIntoView(element, focusElement, type) {
  const elementRect = element.getBoundingClientRect();
  const focusElementRect = focusElement.getBoundingClientRect();

  let scrollTop = element.scrollTop;
  if (elementRect.top < focusElementRect.top) {
    scrollTop += focusElementRect.top - elementRect.top;
  } else if (elementRect.bottom > focusElementRect.bottom) {
    scrollTop -= elementRect.bottom - focusElementRect.bottom;
  }

  switch (type) {
    default:
    case "auto": {
      element.scrollTop = scrollTop;
      break;
    }
    case "smooth": {
      // TODO: Expose these as node inputs
      const duration = 500;
      const increment = 20; // Adjust as needed (smaller value for smoother animation)
      
      const start = element.scrollTop;
      const change = scrollTop - start;
      let currentTime = 0;

      function animateScroll() {
        currentTime += increment;
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        }
      }

      Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      animateScroll();
      break;
    }
  }
}

function ChatContainer({
  children,
  style,
  className,
  eventHandler,
  outAtBottom,
  outScrollPosition,
  outScrolling,
  outScrollingStarted,
  outScrollingStopped
}) {
  const scrollableRef = useRef(null);
  const scrollBottomRef = useRef(null);
  const [isTracking, setIsTracking] = useState(true);
  const isTrackingRef = useRef(true);
  const lastScrollTop = useRef(0);
  const isScrolling = useRef(false);
  const isJumpingToPresent = useRef(false);

  const onResize = useCallback(() => {
    if (isTrackingRef.current && scrollBottomRef.current) {
      scrollIntoView(scrollableRef.current, scrollBottomRef.current, 'auto');
      // scrollBottomRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    if (!scrollableRef.current) return;

    let scrollHandler = null;

    function handleScroll() {
      const elem = scrollableRef.current;

      outScrolling && outScrolling();

      // scrollTop can be half a pixel off, so you will never hit the bottom.
      const isAtBottom = elem.scrollTop + elem.clientHeight + 1 >= elem.scrollHeight;
      setIsTracking(isAtBottom);
      isTrackingRef.current = isAtBottom;
      outAtBottom && outAtBottom(isAtBottom);
      outScrollPosition && outScrollPosition(elem.scrollTop);

      lastScrollTop.current = scrollableRef.current.scrollTop;

      // HACK: Keep track of when the browser is scrolling.
      if (scrollHandler !== null) {
        clearTimeout(scrollHandler);        
      }

      if (!isScrolling.current) {
        isScrolling.current = true;
        outScrollingStarted && outScrollingStarted();
      }

      scrollHandler = setTimeout(function() {
        isScrolling.current = false;
        outScrollingStopped && outScrollingStopped();
      }, 150);

      if (isAtBottom && isJumpingToPresent.current) {
        isJumpingToPresent.current = false;
      }
    }

    const scrollable = scrollableRef.current;
    scrollable.addEventListener('scroll', handleScroll);

    const observer = new ResizeObserver(onResize);
    observer.observe(scrollableRef.current);

    return () => {
      if (scrollHandler !== null) {
        clearTimeout(scrollHandler);        
      }
      observer.disconnect();
      scrollable.removeEventListener('scroll', handleScroll);
    };
  }, [onResize, scrollableRef]);

  useEffect(() => {
    // Scroll to the bottom at the start
    if (scrollBottomRef.current) {
      scrollIntoView(scrollableRef.current, scrollBottomRef.current, 'auto');
      // scrollBottomRef.current.scrollIntoView({ behavior: 'auto' });
    }

    // Set the default "At Bottom" output
    outAtBottom && outAtBottom(isTracking);
    outScrollPosition && outScrollPosition(0);
  }, []);

  useEffect(() => {
    if (scrollableRef.current && !isTracking) {
      scrollableRef.current.scrollTop = lastScrollTop.current;
    }
  }, [children, isTracking]);

  useEffect(() => {
    function handleScrollToBottom() {
      if (scrollBottomRef.current) {
        isJumpingToPresent.current = true;
        scrollIntoView(scrollableRef.current, scrollBottomRef.current, 'smooth');
        // scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }

    eventHandler.addEventListener('scrollToBottom', handleScrollToBottom);
    return () => {
      eventHandler.removeEventListener('scrollToBottom', handleScrollToBottom);
    }
  }, [eventHandler]);

  if (isTracking && scrollBottomRef.current) {
    requestAnimationFrame(() => {
      if (scrollBottomRef.current) {
        scrollIntoView(scrollableRef.current, scrollBottomRef.current, 'auto');
        // scrollBottomRef.current.scrollIntoView({ behavior: 'auto' });
      }
    });
  }

  return (
    <div style={style} className={classNames([css["ScrollContainer"], className])}>
      <div className={css["ScrollArea"]} ref={scrollableRef}>
        {children}
        <span ref={scrollBottomRef}></span>
      </div>
    </div>
  );
}

export default {
  name: "noodl.controls.chat-container",
  displayName: "Chat Container",
  category: "ChatContainer",
  getReactComponent() {
    return ChatContainer;
  },
  initialize() {
    this.internal = {};
    this.props.eventHandler = new EventTarget();
  },
  inputs: {
    scrollToBottom: {
      type: "signal",
      displayName: "Scroll To Bottom",
      valueChangedToTrue() {
        this.props.eventHandler.dispatchEvent(new Event("scrollToBottom"));
      },
    },
  },
  inputProps: {},
  outputProps: {
    outAtBottom: {
      type: "boolean",
      displayName: "At Bottom",
      group: "State",
    },
    outScrollPosition: {
      type: "number",
      displayName: "Scroll Position",
      group: "Scroll",
    },
    outScrolling: {
      type: "signal",
      displayName: "Scrolling",
      group: "Scroll",
    },
    outScrollingStarted: {
      type: "signal",
      displayName: "Scroll Start",
      group: "Scroll",
    },
    outScrollingStopped: {
      type: "signal",
      displayName: "Scroll Stop",
      group: "Scroll",
    },
  },
};
