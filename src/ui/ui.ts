import blessed from "blessed";

export function UI() {
    const screen = setupScreen(blessed.screen());

    return screen;
}

function setupScreen(s: blessed.Widgets.Screen): blessed.Widgets.Screen {
    const boxA = blessed.box({
        width: "50%",
        height: "100%",
        style: {
            bg: "yellow",
        },
    });

    const boxB = blessed.box({
        left: "50%",
        width: "50%",
        height: "100%",
        style: {
            bg: "yellow",
        },
    });

    boxA.on("focus", () => {
        console.log("boxA: focus event");
        boxA.style.bg = "green";
    });

    boxA.on("unfocus", () => {
        console.log("boxA: unfocus event");
        boxA.style.bg = "yellow";
    });

    boxB.on("focus", () => {
        console.log("boxA: focus event");
        boxB.style.bg = "green";
    });

    boxB.on("unfocus", () => {
        console.log("boxA: unfocus event");
        boxB.style.bg = "yellow";
    });

    s.key("j", () => {
        s.focused.emit("unfocus");
        s.focusNext();
        s.render();
    });

    s.append(boxA);
    s.append(boxB);

    return s;
}
