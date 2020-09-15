import React from "react";

export default function createItems(count, text = '') {
    const items = [];
    for (let i = 0; i < count; i++) {
        const item = <li key={`index ${i}`}>{text} {i+1}</li>;
        items.push(item)
    }
    return items;
}

