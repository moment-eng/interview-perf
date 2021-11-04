import React, { useEffect, useRef } from "react";
import mousetrap from "./vendor/mousetrap";

import "./App.css";

function App() {
    const mt = mousetrap as any;

    const durationRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);

    useEffectOnce(() => {
        mt.bind("g i", async function () {
            statusRef.current!.innerText = "Status: in inbox";

            for (let i = 0; i < 1000000000; i++) {
                // This loop is an example of a perf issue you might encounter. Remove it and see
                // what happens to perf!
            }

            // bind keys specific to this view
            mt.bind("r", function () {
                statusRef.current!.innerText = "Status: in inbox, replying to email";
            });
        });
        mt.bind("g s", function () {
            mt.unbind("r"); // unbind keys not related to this view
            statusRef.current!.innerText = "Status: on settings page";
        });
        mt.bind("g r", function () {
            mt.unbind("r"); // unbind keys not related to this view
            statusRef.current!.innerText = "Status: on reporting page";
        });

        document.addEventListener("keyup", last5Events(durationRef));
    });

    return (
        <div className="App">
            <header className="App-header">
                <div className="perf-target">
                    <strong>Perf target:</strong> keypress events are reliably &lt; 1ms
                </div>
                <div className="contents">
                    Actions to try:
                    <ul>
                        <li>"g i" to go to email inbox</li>
                        <li>"r" to reply to email (while in inbox)</li>
                        <li>"g s" to go to settings</li>
                        <li>"g r" to go to reporting</li>
                    </ul>
                    <div ref={statusRef}>Status: no keys pressed yet</div>
                    <div ref={durationRef} className="perf-report" />
                </div>
            </header>
        </div>
    );
}

export function useEffectOnce(effect: React.EffectCallback): void {
    // CLEAN_UP_ONLY_ON_UNMOUNT is used to indicate to `React.useEffect` that a hook must only be
    // cleaned up after the component is unmounted. It is passed as the second argument argument,
    // e.g.,
    //
    //     React.useEffect(doThing, CLEAN_UP_ONLY_ON_UNMOUNT)
    //
    // If you omit the second argument, the cleanup routine is run every time the component is
    // updated, including unmounts. If you pass in an array of values, cleanup is run any time those
    // values are updated.
    const CLEAN_UP_ONLY_ON_UNMOUNT: [] = [];

    useEffect(effect, CLEAN_UP_ONLY_ON_UNMOUNT);
}

function last5Events(durationRef: React.RefObject<HTMLDivElement>) {
    return () => {
        const w = window as any;
        if (durationRef.current) {
            const events = [...w.keyEvents]
                .reverse()
                .slice(0, 5)
                .map((e: any) => {
                    return `${e.event} ${e.duration.toFixed(2)}ms`;
                })
                .join("<br />");
            durationRef.current.innerHTML = events;
        }
    };
}

export default App;
