<script lang="ts">
  import AuthCheck from "../../../lib/components/AuthCheck.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";
  let username = $state("");
  let loading = $state(false);
  let isAvailable = $state(false);
  let debounceTimer: NodeJS.Timeout;

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  let isValid = $derived(
    username?.length > 2 && username.length < 16 && re.test(username)
  );
  let isTouched = $derived(username.length > 0);
  let isTaken = $derived(isValid && !isAvailable && !loading);

  function checkAvailability() {
    isAvailable = false;
    clearTimeout(debounceTimer);
    if (!isValid) {
      loading = false;
      return;
    }

    loading = true;

    debounceTimer = setTimeout(async () => {
      console.log("checking availability of", username);

      const ref = doc(db, "usernames", username);
      const exists = await getDoc(ref).then((doc) => doc.exists());

      isAvailable = !exists;
      loading = false;
    }, 500);
  }

  async function confirmUsername(e: SubmitEvent) {
    e.preventDefault();
    console.log("confirming username", username);
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), {
      uid: $user?.uid,
    });
    batch.set(doc(db, "users", $user!.uid), {
      username,
      photoURL: $user?.photoURL ?? null,
      published: true,
      bio: "I am testing",
      links: [
        {
          title: "My Website",
          url: "https://example.com",
          icon: "globe",
        },
        {
          title: "My GitHub",
          url: "https://github.com",
          icon: "github",
        },
      ],
    });

    await batch.commit();
    console.log("Username confirmed!");

    username = "";
    isAvailable = false;
  }
</script>

<AuthCheck>
  {#if $userData?.username}
    <article class="space-y-4 p-4">
      <p class="text-lg">
        Your username is <span class="text-success-500 font-bold"
          >@{$userData.username}</span
        >
      </p>
      <p class="text-sm text-warning-500">(Usernames cannot be changed)</p>
      <a class="btn preset-filled-primary-500" href="/login/photo"
        >Upload Profile Image</a
      >
    </article>
  {:else}
    <article class="space-y-4 p-4">
      <div>
        <h2 class="h6">Username</h2>
      </div>
      <form onsubmit={confirmUsername}>
        <input
          type="text"
          bind:value={username}
          oninput={checkAvailability}
          class="input"
          placeholder="Enter your username"
        />
        <div class=" min-h-8 px-8 w-full">
          {#if loading}
            <p class="text-warning-500">
              Checking availability of @{username}...
            </p>
          {/if}

          {#if !isValid && isTouched}
            <p class="text-error-500 text-sm">
              must be 3-16 characters long, alphanumeric only
            </p>
          {/if}

          {#if isValid && !isAvailable && !loading}
            <p class="text-warning-500 text-sm">
              @{username} is not available
            </p>
          {/if}

          {#if isAvailable}
            <button type="submit" class="btn mt-6 preset-filled-primary-500">
              Confirm username @{username}
            </button>
          {/if}
        </div>
      </form>
    </article>
  {/if}
</AuthCheck>
