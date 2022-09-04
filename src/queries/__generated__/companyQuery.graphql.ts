/**
 * @generated SignedSource<<70374bbefd9b3a2c12e50094353ac215>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type companyQuery$variables = {
  id?: string | null;
};
export type companyQuery$data = {
  readonly companyById: {
    readonly description: string | null;
    readonly emailAddress: string | null;
    readonly name: string | null;
    readonly tweet: {
      readonly id: string | null;
      readonly text: string | null;
    } | null;
  } | null;
};
export type companyQuery = {
  response: companyQuery$data;
  variables: companyQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "emailAddress",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Tweet",
  "kind": "LinkedField",
  "name": "tweet",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    },
    (v5/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "companyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Company",
        "kind": "LinkedField",
        "name": "companyById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "companyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Company",
        "kind": "LinkedField",
        "name": "companyById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "43dc0ae2fa4b475affe2788150b9b078",
    "id": null,
    "metadata": {},
    "name": "companyQuery",
    "operationKind": "query",
    "text": "query companyQuery(\n  $id: ID\n) {\n  companyById(id: $id) {\n    name\n    emailAddress\n    description\n    tweet {\n      text\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "57b642ec3a19aafeee8956c98d8e5eab";

export default node;
