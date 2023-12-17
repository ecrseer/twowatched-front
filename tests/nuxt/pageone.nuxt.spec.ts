import { describe, expect, it, test } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { mockComponent, mountSuspended } from "vitest-environment-nuxt/utils";

import indexVue from "../../pages/index.vue";
import DaisyListVue from "../../components/DaisyList.vue";
import DaisyInputVue from "../../components/DaisyInput.vue";

describe("index page", () => {
  it("Movie List component is ok", async () => {
    const listComponent = mount(DaisyListVue, {
      props: { items: [{ name: "test1" }] },
    });

    expect(listComponent.find("ul").exists()).toBe(true);
  });

  it("User can type movie name", async () => {
    const startPage = mount(indexVue);
    const movie_input = startPage.find(".float-label-input > input");
    const there_is_input = movie_input.exists();
    expect(there_is_input).toBe(true);

    movie_input.setValue("Attack on titan");
    startPage.findComponent(DaisyInputVue).trigger("keyup.enter");

    expect(startPage.find("li").exists()).toBe(true);
  });
});

