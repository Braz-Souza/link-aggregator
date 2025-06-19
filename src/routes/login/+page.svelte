<script lang="ts">
  import { auth } from "$lib/firebase";

  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  }
</script>

<article class="space-y-4 p-4">
  <div>
    <h2 class="h6">User Login</h2>
    <h3 class="h3">Skeleton is Awesome</h3>
  </div>
  <p class="opacity-60">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur
    provident eveniet eligendi cumque consequatur tempore sint nisi sapiente.
    Iste beatae laboriosam iure molestias cum expedita architecto itaque quae
    rem.
  </p>
  <button
    type="button"
    onclick={signInWithGoogle}
    class="btn preset-filled-primary-500">Sign in with Google</button
  >
</article>
