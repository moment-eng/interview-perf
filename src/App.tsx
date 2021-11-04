import React, { useRef, useState } from "react";

import "./App.css";
import { useBindings } from "./Bindings";

function App() {
    const statusRef = useRef<HTMLDivElement>(null);
    const { status, events } = useBindings();

    return (
        <div className="App">
            <header className="App-header">
                <div className="perf-target">
                    <p>
                        <strong>Perf target:</strong> keypress events are reliably &lt; 1ms
                    </p>
                    <p>
                        Additionally, the app is unstable and periodically completely freezes. This
                        does not seem to be tracked by surfaced by the perf measurements below.
                    </p>
                </div>
                <div className="contents">
                    Actions to try:
                    <ul>
                        <li>"g i" to go to email inbox</li>
                        <li>"r" to reply to email (while in inbox)</li>
                        <li>"g s" to go to settings</li>
                        <li>"g r" to go to reporting</li>
                    </ul>
                    <div ref={statusRef}>{status || "Status: no actions taken yet"}</div>
                    <div className="perf-report">{events}</div>
                </div>
            </header>
        </div>
    );
}

export default App;
