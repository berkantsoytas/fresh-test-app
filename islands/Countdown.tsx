/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

const timeFmt = new Intl.RelativeTimeFormat("en-US");

// the target date is passed as a string instead of as a `Date`, because the
// props to island components need to be JSON (de)serializable.
const Countdown = (props: { target: string }) => {
  const target = new Date(props.target);
  const [now, setNow] = useState(new Date());

  // set up an interval to update the 'now' date every second with the current
  // date as long as the component is mounted

  useEffect(() => {
    const timer = setInterval(() => {
      setNow((now) => {
        if (now > target) {
          clearInterval(timer);
        }
        return new Date();
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [props.target]);

  // if the target date passed, we stop counting down.
  if (now > target) {
    return <span>🎉</span>;
  }

  const secondsLeft = Math.floor((target.getTime() - now.getTime()) / 1000);

  return <span>{timeFmt.format(secondsLeft, "seconds")}</span>;
};

export default Countdown;
