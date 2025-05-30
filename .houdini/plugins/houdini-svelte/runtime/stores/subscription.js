import { CompiledSubscriptionKind } from "$houdini/runtime/lib/types";
import { derived, writable } from "svelte/store";
import { initClient } from "../client";
import { getSession } from "../session";
import { BaseStore } from "./base";
class SubscriptionStore extends BaseStore {
  kind = CompiledSubscriptionKind;
  fetchingStore;
  constructor({ artifact }) {
    super({ artifact });
    this.fetchingStore = writable(false);
  }
  async listen(variables, args) {
    await initClient();
    this.fetchingStore.set(true);
    this.observer.send({
      variables,
      session: await getSession(),
      metadata: args?.metadata
    });
  }
  async unlisten() {
    await initClient();
    this.fetchingStore.set(false);
    await this.observer.cleanup();
  }
  subscribe(run, invalidate) {
    return derived(
      [{ subscribe: super.subscribe.bind(this) }, this.fetchingStore],
      ([$parent, $fetching]) => ({
        ...$parent,
        fetching: $fetching
      })
    ).subscribe(run, invalidate);
  }
}
export {
  SubscriptionStore
};
