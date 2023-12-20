import { describe, expect, it, test } from "vitest";
import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import { mockComponent, mountSuspended } from "vitest-environment-nuxt/utils";

import indexVue from "../../pages/index.vue";
import DaisyListVue from "../../components/DaisyList.vue";
import DaisyInputVue from "../../components/DaisyInput.vue";
import DaisyMenuVue from "../../components/DaisyMenu.vue";
import DefaultVue from "../../layouts/default.vue";
import { MoviesRepository } from "../../main/Movies/MoviesRepository";
import { MoviesController } from "../../main/Movies/MoviesController";
import { mockSearchedMovie } from "./utils";

describe("index page", () => {
  const controller = MoviesController();
  const repository = MoviesRepository();

  it("Should movie List component be rendered", async () => {
    const listComponent = mount(DaisyListVue, {
      props: { items: [{ name: "test1" }] },
    });

    expect(listComponent.find("ul").exists()).toBe(true);
  });

  it("Should user be able to type movie name", async () => {
    const startPage = mount(indexVue);
    const movie_input = startPage.find(".float-label-input > input");
    const there_is_input = movie_input.exists();
    expect(there_is_input).toBe(true);

    movie_input.setValue("Attack on titan");
    startPage.findComponent(DaisyInputVue).trigger("keyup.enter");

    expect(startPage.find("li").exists()).toBe(true);
  });

  it("Should have is navbar menu", async () => {
    const startPageLayout = mount(DefaultVue);
    const movie_menu = startPageLayout.findComponent(DaisyMenuVue);
    const there_is_menu = movie_menu.exists();
    expect(there_is_menu).toBe(true);
  });
  it("Should add movie through function", async () => {
    const list = repository.addToMoviesList(mockSearchedMovie("testMovie"));
    expect(list.length).toBe(2);
  });
  it("Should be able to search movie through function", async () => {
    controller.searching.value = "indiana jones";
    await controller.searchMovie();
    await flushPromises();
    expect(repository.currentSearchedMovieImage.length).greaterThan(1);
  });
});

