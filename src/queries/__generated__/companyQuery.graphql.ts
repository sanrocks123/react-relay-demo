/**
 * @generated SignedSource<<6d78c45536e4a22ba7554f6201b5aa0d>>
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
    readonly id: string | null;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Company",
    "kind": "LinkedField",
    "name": "companyById",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "emailAddress",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
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
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "companyQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "companyQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "d7ab4d82cadb306f00bade932b16e68b",
    "id": null,
    "metadata": {},
    "name": "companyQuery",
    "operationKind": "query",
    "text": "query companyQuery(\n  $id: ID\n) {\n  companyById(id: $id) {\n    id\n    name\n    emailAddress\n    description\n    tweet {\n      text\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "030fdc51430fca33756d04ba4fea4ca3";

export default node;
