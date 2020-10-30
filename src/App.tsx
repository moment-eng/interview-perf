import React, { useEffect, useRef } from "react";
import mousetrap from "./vendor/mousetrap";

import "./App.css";

function App() {
    const mt = mousetrap as any;

    const ref = useRef<HTMLDivElement>(null);

    useEffectOnce(() => {
        mt.bind("g i", function () {
            ref.current!.innerText = "inbox";

            // bind keys specific to this view
            mt.bind("r", function () {
                ref.current!.innerText = "inbox: replying to email";
            });
        });
        mt.bind("g s", function () {
            mt.unbind("r"); // unbind keys not related to this view
            ref.current!.innerText = "settings";
        });
        mt.bind("g r", function () {
            mt.unbind("r"); // unbind keys not related to this view
            ref.current!.innerText = "reporting";
        });
    });

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    1. hit "g i" to go to email inbox
                    <br />
                    2. hit "r" to reply to email
                    <br />
                    3. hit "g s" to go to settings
                    <br />
                    3. hit "g r" to go to reporting - doesn't work!
                    <br />
                </p>
                <div ref={ref} />
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

export default App;
