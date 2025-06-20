<script>
  let { icon, url, title } = $props();
  if (!icon || !url || !title) {
    throw new Error("icon, url, and title are required props");
  }
</script>

<a
  href={url}
  class="card w-full preset-tonal-secondary p-4 text-center flex flex-row items-center"
  target="_blank"
>
  <img
    src={`${icon}`}
    alt={icon}
    width="32"
    height="32"
    class="w-8 mx-2 mr-10 rounded-lg"
  />
  {title}
</a>
