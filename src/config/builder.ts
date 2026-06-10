import { Attribution } from "ox/erc8021";

/** Base Builder Code from base.dev → Settings → Builder Codes */
export const BUILDER_CODE = "bc_yo7u752b";

/** ERC-8021 suffix appended to all transactions for onchain attribution */
export const BUILDER_DATA_SUFFIX = Attribution.toDataSuffix({
  codes: [BUILDER_CODE],
});
