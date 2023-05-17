# Orange Finance Whitelist

Currently our vault limits the access to users who meets one of the criteria.

- Orange Finance Team
- Alpha Orange Crew
- Degen Beacon Holder
- Honey Comb Holder (new)

### Orange Finance Team

- Core Team's arbitrary addresses that are for development purpose.
- Our development partners (designer, auditor, dune wizards, ambassadors, and investors)
-

### Alpha Orange Crew

- "Alpha Orange Crew" role holders in the official discord server.

### Degen Beacon holders

- https://degenscore.com/beacon

### Honey Comb holders

- https://twitter.com/berachain
- https://opensea.io/ja/collection/honey-comb-2

The access control is done by snapshot, not real-time on-chain based control. So it takes some days to be updated the whitelist. (we update the list around once a week)

## Install & Run

```
npm i
```

create .env file, and update contract address.

### Query degen beacon holders

```
node degen-beacon/main.mjs
```

### Query honey-comb beacon holders

```
node degen-beacon/main.mjs
```
