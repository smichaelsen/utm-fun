# UTM Fun 🎲

A demo Chrome extension - not recommended for real world use!

This browser extension detects UTM parameters on links and does _not_ remove them - that would be boring.
To cause havoc it instead randomly changes the keys and values of the UTM parameters in a way that will puzzle the tracking system.

Before:

```
https://example.com/?utm_source=facebook&utm_medium=banner&utm_campaign=awareness
```

After:

```
https://example.com/?utm_device=fast&utm_placement=advert&utm_content=sidebar
```

## Collaboration ideas

1. Add new fun, boring or puzzling utm parameters and value to the list in `contentScript.js`.
2. Expand the logic to also replace other tracking parameters than `utm_`.
