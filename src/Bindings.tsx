import React, { useEffect, useRef, useState } from "react";

import mousetrap from "./vendor/mousetrap";

export function last5Events(setEvents: (es: JSX.Element[]) => void) {
    return () => {
        const w = window as any;

        const events = [...w.keyEvents]
            .reverse()
            .slice(0, 5)
            .map((e: any, i) => {
                const duration = e.duration.toFixed(2);
                return (
                    <div key={i}>
                        {e.event}{" "}
                        {e.duration > 1 ? (
                            <span style={{ backgroundColor: "red" }}>{duration}ms</span>
                        ) : (
                            `${duration}ms`
                        )}{" "}
                        {i === 0 ? "(latest)" : ""}
                    </div>
                );
            });

        setEvents(events);
    };
}

export const useBindings = () => {
    const mt = mousetrap as any;
    const [events, setEvents] = useState<JSX.Element[]>([]);
    const [status, setStatus] = useState<string>();

    useEffect(() => {
        mt.bind("g i", async function () {
            setStatus("Status: in inbox");

            for (let i = 0; i < 1000000000; i++) {
                // This loop is an example of a perf issue you might encounter. Remove it and see
                // what happens to perf!
            }

            // bind keys specific to this view
            mt.bind("r", function () {
                setStatus("Status: in inbox, replying to email");
            });
        });
        mt.bind("g s", function () {
            mt.unbind("r"); // unbind keys not related to this view
            setStatus("Status: on settings page");
        });
        mt.bind("g r", function () {
            mt.unbind("r"); // unbind keys not related to this view
            setStatus("Status: on reporting page");
        });

        document.addEventListener("keyup", last5Events(setEvents));
    });

    return { status, events };
};
