<script lang="ts">
  import { FileUpload } from "@skeletonlabs/skeleton-svelte";
  import { user, userData, storage, db } from "$lib/firebase";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import AuthCheck from "../../components/AuthCheck.svelte";
  import { doc, updateDoc } from "firebase/firestore";

  let previewURL: string | null = $state(null);
  let uploading: boolean = $state(false);
  // let href: string = $derived(`/${$userData?.username}/edit`);
  let href: string = "/login/photo";

  async function upload(e: any) {
    uploading = true;
    const file = e.target.files[0];
    previewURL = URL.createObjectURL(file);
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
    const result = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(result.ref);
    await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
    uploading = false;
  }
</script>

<AuthCheck>
  <article class="space-y-4 p-4">
    <div>
      <h2 class="h6">Upload Profile Photo</h2>
    </div>
    <img
      src={previewURL ?? $userData?.photoURL ?? "/user.png"}
      alt="Preview"
      class="w-full h-64 object-cover rounded-lg"
      width="256"
      height="256"
    />
    <label for="photoURL" class="label">
      <span class="label-text">Select Photo</span>
      <input
        type="file"
        id="photoURL"
        accept="image/png, image/jpeg, image/gif, image/webp"
        class="w-full input file-input"
        onchange={upload}
      />
      {#if uploading}
        <span class="loading loading-spinner loading-sm"></span>
      {/if}
    </label>
    <a {href} class="btn preset-filled-primary-500"> Finish </a>
  </article>
</AuthCheck>
