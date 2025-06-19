<script lang="ts">
  import { auth, user } from "$lib/firebase";

  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  }
</script>

<article class="space-y-4 p-4">
  {#if $user}
    <div>
      <h2 class="h6">Welcome {$user.displayName}</h2>
      <h3 class="h3">User is Logged in</h3>
    </div>
    <p class="opacity-60">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
      aspernatur provident eveniet eligendi cumque consequatur tempore sint nisi
      sapiente. Iste beatae laboriosam iure molestias cum expedita architecto
      itaque quae rem.
    </p>
    <button
      type="button"
      onclick={() => signOut(auth)}
      class="btn preset-filled-warning-500">Sign out</button
    >
  {:else}
    <div>
      <h2 class="h6">User Login</h2>
    </div>
    <button
      type="button"
      onclick={signInWithGoogle}
      class="btn preset-filled-primary-500">Sign in with Google</button
    >
  {/if}
</article>
