import { MouseEventHandler, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { ClassValue, clsx } from "clsx";

import styles from "./ScrollContainer.module.scss";

interface Props {
  className?: ClassValue;
}

function calcScrollParams(scrollContainerElement: HTMLDivElement): {
  isSetScrollBar: boolean;
  scrollBarHeight: number;
  scrollThumbHeight: number;
} {
  const { clientHeight, scrollHeight } = scrollContainerElement;
  if (clientHeight === scrollHeight) {
    return {
      isSetScrollBar: false,
      scrollBarHeight: 0,
      scrollThumbHeight: 0,
    };
  }
  const scrollThumbPercentage = clientHeight / scrollHeight;
  const scrollThumbHeight = scrollThumbPercentage * clientHeight;
  return {
    isSetScrollBar: true,
    scrollBarHeight: clientHeight,
    scrollThumbHeight,
  };
}

export const ScrollContainer = ({ children, className }: PropsWithChildren<Props>) => {
  const [isDragging, setDragging] = useState(false);
  const [isSetScrollBar, setIsSetScrollBar] = useState(false);
  const [scrollBarHeight, setScrollBarHeight] = useState(0);
  const [scrollThumbHeight, setScrollThumbHeight] = useState(0);
  const [scrollThumbTop, setScrollThumbTop] = useState(0);
  const [scrollThumbPosition, setScrollThumbPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleDocumentMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) {
        return;
      }
      e.preventDefault();
      setDragging(false);
    },
    [isDragging]
  );

  const handleDocumentMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const scrollContainerElement = scrollContainerRef.current;
      if (scrollContainerElement === null) {
        return;
      }
      const { scrollHeight, offsetHeight } = scrollContainerElement;
      const deltaY = e.clientY - scrollThumbPosition;
      const percentage = deltaY * (scrollHeight / offsetHeight);
      setScrollThumbPosition(e.clientY);
      setScrollThumbTop(Math.min(Math.max(0, scrollThumbTop + deltaY), offsetHeight - scrollThumbHeight));
      scrollContainerElement.scrollTop = Math.min(
        scrollContainerElement.scrollTop + percentage,
        scrollHeight - offsetHeight
      );
    },
    [isDragging, scrollThumbPosition, scrollThumbHeight, scrollThumbTop]
  );

  const handleScrollThumbMouseDown = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollThumbPosition(e.clientY);
    setDragging(true);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollContainerElement = scrollContainerRef.current;
    if (scrollContainerElement === null) {
      return;
    }
    const { scrollTop, scrollHeight, offsetHeight } = scrollContainerElement;
    const top = (scrollTop / scrollHeight) * offsetHeight;
    const newTop = Math.min(top, offsetHeight - scrollThumbHeight);
    setScrollThumbTop(newTop);
  }, [scrollThumbHeight]);

  const handleWindowResize = useCallback(() => {
    setTimeout(() => {
      const scrollContainerElement = scrollContainerRef.current;
      if (scrollContainerElement === null) {
        return;
      }
      const scrollParams = calcScrollParams(scrollContainerElement);
      setIsSetScrollBar(scrollParams.isSetScrollBar);
      if (!scrollParams.isSetScrollBar) {
        return;
      }
      setScrollBarHeight(scrollParams.scrollBarHeight);
      setScrollThumbHeight(scrollParams.scrollThumbHeight);
    }, 100);
  }, []);

  useEffect(() => {
    const scrollContainerElement = scrollContainerRef.current;
    if (scrollContainerElement === null) {
      return;
    }
    const scrollParams = calcScrollParams(scrollContainerElement);
    setIsSetScrollBar(scrollParams.isSetScrollBar);
    if (!scrollParams.isSetScrollBar) {
      return;
    }
    setScrollBarHeight(scrollParams.scrollBarHeight);
    setScrollThumbHeight(scrollParams.scrollThumbHeight);
    scrollContainerElement.addEventListener("scroll", handleScroll, true);
    return () => {
      scrollContainerElement.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll, children]);

  useEffect(() => {
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseUp);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseUp);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp, handleWindowResize]);

  return (
    <div className={clsx(styles.scrollContainerWrapper, className)}>
      <div ref={scrollContainerRef} className={clsx(styles.scrollContainer)}>
        {children}
      </div>
      {isSetScrollBar && (
        <div className={clsx(styles.scrollBar)} style={{ height: scrollBarHeight }}>
          <div
            className={clsx(styles.scrollThumb)}
            style={{
              height: scrollThumbHeight,
              top: scrollThumbTop,
            }}
            onMouseDown={handleScrollThumbMouseDown}
          />
        </div>
      )}
    </div>
  );
};
