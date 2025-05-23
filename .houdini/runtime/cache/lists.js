import { flatten } from "../lib/flatten";
import { rootID } from "./stuff";
class ListManager {
  rootID;
  cache;
  constructor(cache, rootID2) {
    this.rootID = rootID2;
    this.cache = cache;
  }
  lists = /* @__PURE__ */ new Map();
  listsByField = /* @__PURE__ */ new Map();
  get(listName, id, allLists, skipMatches) {
    const lists = this.getLists(listName, id, allLists);
    if (!lists) {
      return null;
    }
    if (skipMatches) {
      return new ListCollection(lists.lists.filter((list) => !skipMatches.has(list.fieldRef)));
    } else {
      return lists;
    }
  }
  getLists(listName, id, allLists) {
    const matches = this.lists.get(listName);
    if (!matches || matches.size === 0) {
      return null;
    }
    if (allLists) {
      return new ListCollection(
        Array.from(matches, ([key, value]) => [...value.lists]).flat()
      );
    }
    const head = [...matches.values()][0];
    const { recordType } = head.lists[0];
    const parentID = id ? this.cache._internal_unstable.id(recordType || "", id) : this.rootID;
    if (matches?.size === 1) {
      if (!id) {
        return head;
      }
      return parentID === Array.from(matches.keys())[0] ? head : null;
    }
    if (!id) {
      console.error(
        `Found multiple instances of "${listName}". Please provide one of @parentID or @allLists directives to help identify which list you want modify. For more information, visit this guide: https://www.houdinigraphql.com/api/graphql#parentidvalue-string `
      );
      return null;
    }
    return this.lists.get(listName)?.get(parentID);
  }
  remove(listName, id) {
    this.lists.get(listName)?.delete(id || this.rootID);
  }
  add(list) {
    if (!this.lists.has(list.name)) {
      this.lists.set(list.name, /* @__PURE__ */ new Map());
    }
    const name = list.name;
    const parentID = list.recordID || this.rootID;
    if (this.lists.get(name)?.get(parentID)?.includes(list.key)) {
      return;
    }
    if (!this.lists.has(name)) {
      this.lists.set(name, /* @__PURE__ */ new Map());
    }
    if (!this.lists.get(name).has(parentID)) {
      this.lists.get(name).set(parentID, new ListCollection([]));
    }
    if (!this.listsByField.has(parentID)) {
      this.listsByField.set(parentID, /* @__PURE__ */ new Map());
    }
    if (!this.listsByField.get(parentID).has(list.key)) {
      this.listsByField.get(parentID)?.set(list.key, []);
    }
    const handler = new List({ ...list, manager: this });
    this.lists.get(list.name).get(parentID).lists.push(handler);
    this.listsByField.get(parentID).get(list.key).push(handler);
  }
  removeIDFromAllLists(id, layer) {
    let removed = false;
    for (const fieldMap of this.lists.values()) {
      for (const list of fieldMap.values()) {
        if (list.removeID(id, void 0, layer)) {
          removed = true;
        }
      }
    }
    return removed;
  }
  deleteField(parentID, field) {
    if (!this.listsByField.get(parentID)?.has(field)) {
      return;
    }
    for (const list of this.listsByField.get(parentID).get(field)) {
      this.lists.get(list.name)?.get(list.recordID)?.deleteListWithKey(field);
      if (this.lists.get(list.name)?.get(list.recordID)?.lists.length === 0) {
        this.lists.get(list.name)?.delete(list.recordID);
      }
    }
    this.listsByField.get(parentID).delete(field);
  }
  reset() {
    this.lists.clear();
    this.listsByField.clear();
  }
}
class List {
  recordID;
  recordType;
  key;
  type;
  cache;
  selection;
  _when;
  filters;
  name;
  connection;
  manager;
  abstract;
  constructor({
    name,
    recordID,
    recordType,
    key,
    listType,
    selection,
    when,
    filters,
    connection,
    manager,
    abstract
  }) {
    this.recordID = recordID || rootID;
    this.recordType = recordType;
    this.key = key;
    this.type = listType;
    this.cache = manager.cache;
    this.selection = selection;
    this._when = when;
    this.filters = filters;
    this.name = name;
    this.connection = connection;
    this.manager = manager;
    this.abstract = abstract;
  }
  get fieldRef() {
    return `${this.recordID}.${this.key}`;
  }
  when(when) {
    return this.manager.lists.get(this.name).get(this.recordID).when(when);
  }
  append({
    selection,
    data,
    variables = {},
    layer
  }) {
    return this.addToList(selection, data, variables, "last", layer);
  }
  prepend({
    selection,
    data,
    variables = {},
    layer
  }) {
    return this.addToList(selection, data, variables, "first", layer);
  }
  addToList(selection, data, variables = {}, where, layer) {
    const listType = this.listType(data);
    const dataID = this.cache._internal_unstable.id(listType, data);
    if (!this.validateWhen() || !dataID) {
      return;
    }
    let insertSelection = selection;
    let insertData = data;
    if (this.connection) {
      insertSelection = {
        fields: {
          newEntry: {
            keyRaw: this.key,
            type: "Connection",
            selection: {
              fields: {
                edges: {
                  keyRaw: "edges",
                  type: "ConnectionEdge",
                  updates: ["append", "prepend"],
                  selection: {
                    fields: {
                      __typename: {
                        keyRaw: "__typename",
                        type: "String"
                      },
                      node: {
                        type: listType,
                        keyRaw: "node",
                        selection: {
                          ...selection,
                          fields: {
                            ...selection.fields,
                            __typename: {
                              keyRaw: "__typename",
                              type: "String"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      insertData = {
        newEntry: {
          edges: [
            {
              __typename: listType + "Edge",
              node: {
                ...data,
                __typename: listType
              }
            }
          ]
        }
      };
    } else {
      insertSelection = {
        fields: {
          newEntries: {
            keyRaw: this.key,
            type: listType,
            updates: ["append", "prepend"],
            selection: {
              ...selection,
              fields: {
                ...selection.fields,
                __typename: {
                  keyRaw: "__typename",
                  type: "String"
                }
              }
            }
          }
        }
      };
      insertData = {
        newEntries: [{ ...data, __typename: listType }]
      };
    }
    this.cache.write({
      selection: insertSelection,
      data: insertData,
      variables,
      parent: this.recordID,
      applyUpdates: [where === "first" ? "prepend" : "append"],
      layer: layer?.id
    });
  }
  removeID(id, variables = {}, layer) {
    if (!this.validateWhen()) {
      return;
    }
    let parentID = this.recordID;
    let targetID = id;
    let targetKey = this.key;
    if (this.connection) {
      const { value: embeddedConnection } = this.cache._internal_unstable.storage.get(
        this.recordID,
        this.key
      );
      if (!embeddedConnection) {
        return;
      }
      const embeddedConnectionID = embeddedConnection;
      const { value: edges } = this.cache._internal_unstable.storage.get(
        embeddedConnectionID,
        "edges"
      );
      for (const edge of flatten(edges) || []) {
        if (!edge) {
          continue;
        }
        const edgeID = edge;
        const { value: nodeID } = this.cache._internal_unstable.storage.get(edgeID, "node");
        if (!nodeID) {
          continue;
        }
        if (nodeID === id) {
          targetID = edgeID;
        }
      }
      parentID = embeddedConnectionID;
      targetKey = "edges";
    }
    let value = this.cache._internal_unstable.storage.get(parentID, targetKey).value;
    if (!value || !value.includes(targetID)) {
      return;
    }
    const subscribers = this.cache._internal_unstable.subscriptions.get(this.recordID, this.key);
    this.cache._internal_unstable.subscriptions.remove(
      targetID,
      this.connection ? this.selection.fields.edges.selection : this.selection,
      subscribers.map((sub) => sub[0]),
      variables
    );
    this.cache._internal_unstable.storage.remove(parentID, targetKey, targetID, layer);
    for (const [spec] of subscribers) {
      spec.set(
        this.cache._internal_unstable.getSelection({
          parent: spec.parentID || this.manager.rootID,
          selection: spec.selection,
          variables: spec.variables?.() || {},
          ignoreMasking: false
        }).data
      );
    }
    return true;
  }
  remove(data, variables = {}, layer) {
    const targetID = this.cache._internal_unstable.id(this.listType(data), data);
    if (!targetID) {
      return;
    }
    return this.removeID(targetID, variables, layer);
  }
  listType(data) {
    return data.__typename || this.type;
  }
  validateWhen(when) {
    let filters = when || this._when;
    let ok = true;
    if (filters) {
      const targets = this.filters;
      if (filters.must && targets) {
        ok = Object.entries(filters.must).reduce(
          (prev, [key, value]) => Boolean(prev && targets[key] == value),
          ok
        );
      }
      if (filters.must_not) {
        ok = !targets || Object.entries(filters.must_not).reduce(
          (prev, [key, value]) => Boolean(prev && targets[key] != value),
          ok
        );
      }
    }
    return ok;
  }
  toggleElement({
    selection,
    data,
    variables = {},
    layer,
    where
  }) {
    if (!this.remove(data, variables, layer)) {
      this.addToList(selection, data, variables, where, layer);
    }
  }
  *[Symbol.iterator]() {
    let entries = [];
    let value = this.cache._internal_unstable.storage.get(this.recordID, this.key).value;
    if (!this.connection) {
      entries = flatten(value);
    } else {
      entries = this.cache._internal_unstable.storage.get(value, "edges").value;
    }
    for (let record of entries) {
      yield record;
    }
  }
}
class ListCollection {
  lists = [];
  constructor(lists) {
    this.lists = lists;
  }
  get selection() {
    return this.lists[0].selection;
  }
  append(...args) {
    this.lists.forEach((list) => list.append(...args));
  }
  prepend(...args) {
    this.lists.forEach((list) => list.prepend(...args));
  }
  addToList(...args) {
    this.lists.forEach((list) => list.addToList(...args));
  }
  removeID(...args) {
    let removed = false;
    this.lists.forEach((list) => {
      if (list.removeID(...args)) {
        removed = true;
      }
    });
    return removed;
  }
  remove(...args) {
    this.lists.forEach((list) => list.remove(...args));
  }
  toggleElement(...args) {
    this.lists.forEach((list) => list.toggleElement(...args));
  }
  when(when) {
    return new ListCollection(
      this.lists.filter((list) => {
        return list.validateWhen(when);
      })
    );
  }
  includes(key) {
    return !!this.lists.find((list) => list.key === key);
  }
  deleteListWithKey(key) {
    return this.lists = this.lists.filter((list) => list.key !== key);
  }
  *[Symbol.iterator]() {
    for (let list of this.lists) {
      for (const entry of list) {
        yield entry;
      }
    }
  }
}
export {
  List,
  ListCollection,
  ListManager
};
