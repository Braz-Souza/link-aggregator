<script lang="ts">
  import { Combobox } from "@skeletonlabs/skeleton-svelte";
  import { page } from "$app/stores";
  import UserLink from "$lib/components/UserLink.svelte";
  import { db, userData, user } from "$lib/firebase";
  import {
    arrayRemove,
    arrayUnion,
    doc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { writable } from "svelte/store";

  interface ComboboxData {
    label: string;
    value: string;
  }

  const comboboxData: ComboboxData[] = [
    { label: "Twitter", value: "Twitter" },
    { label: "YouTube", value: "YouTube" },
    { label: "TikTok", value: "TikTok" },
    { label: "LinkedIn", value: "LinkedIn" },
    { label: "GitHub", value: "GitHub" },
    { label: "Custom", value: "Custom" },
  ];

  let selectedIcon = $state(["Custom"]);

  const formDefaults = {
    icon: "custom",
    title: "",
    url: "https://",
  };

  const formData = writable(formDefaults);

  let showForm = $state(false);

  let urlIsValid = $derived(
    $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/)
  );
  let titleIsValid = $derived(
    $formData.title.length < 20 && $formData.title.length > 0
  );
  let formIsValid = $derived(urlIsValid && titleIsValid);

  async function addLink(e: SubmitEvent) {
    e.preventDefault();
    const userRef = doc(db, "users", $user!.uid);

    await updateDoc(userRef, {
      links: arrayUnion({
        ...$formData,
        id: Date.now().toString(),
      }),
    });

    formData.set({
      icon: "",
      title: "",
      url: "",
    });

    showForm = false;
  }

  async function deleteLink(item: any) {
    const userRef = doc(db, "users", $user!.uid);
    await updateDoc(userRef, {
      links: arrayRemove(item),
    });
  }

  function cancelLink() {
    formData.set(formDefaults);
    showForm = false;
  }
</script>

<main class="max-w-xl mx-auto">
  {#if $userData?.username == $page.params.username}
    <h1 class="mx-2 text-2xl font-bold mt-8 mb-4 text-center">
      Edit your Profile
    </h1>

    <!-- INSERT sortable list here -->

    {#if showForm}
      <form
        onsubmit={addLink}
        class="mx-auto card w-full max-w-md preset-filled-surface-100-900 p-4 text-center"
      >
        <Combobox
          data={comboboxData}
          value={selectedIcon}
          onValueChange={(e) => (selectedIcon = e.value)}
          label="Select Icon"
          placeholder="Select..."
        >
          {#snippet item(item)}
            <div class="flex w-full justify-between space-x-2">
              <span>{item.label}</span>
            </div>
          {/snippet}
        </Combobox>
        <input
          name="title"
          type="text"
          placeholder="Title"
          class="input input-sm mt-8"
          bind:value={$formData.title}
        />
        <input
          name="url"
          type="text"
          placeholder="URL"
          class="input input-sm"
          bind:value={$formData.url}
        />
        <div class="my-4">
          {#if !titleIsValid}
            <p class="text-warning-500 text-xs">Must have valid title</p>
          {/if}
          {#if !urlIsValid}
            <p class="text-warning-500 text-xs">Must have a valid URL</p>
          {/if}
          {#if formIsValid}
            <p class="text-success-500 text-xs">Looks good!</p>
          {/if}
        </div>

        <button
          disabled={!formIsValid}
          type="submit"
          class="btn preset-filled-primary-500">Add Link</button
        >

        <button
          type="button"
          class="btn preset-filled-error-500 my-4"
          onclick={cancelLink}>Cancel</button
        >
      </form>
    {:else}
      <button
        onclick={() => (showForm = true)}
        class="btn btn-outline btn-info block mx-auto my-4"
      >
        Add a Link
      </button>
    {/if}
  {/if}
</main>
