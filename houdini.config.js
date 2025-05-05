/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    "defaultCachePolicy": "NetworkOnly",
    "watchSchema": {
        "url": "http://localhost:5282"
    },
    "runtimeDir": ".houdini",
    "plugins": {
        "houdini-svelte": {}
    },
    "scalars": {
        "DateTime": {
            "type": "Date",
            "marshal": value => value.toISOString(),
            "unmarshal": value => new Date(value)
        },
        "Long": {
            "type": "number",
            "marshal": value => value,
            "unmarshal": value => value
        },
        "Decimal": {
            "type": "number",
            "marshal": value => value,
            "unmarshal": value => value
        }
    }
}

export default config