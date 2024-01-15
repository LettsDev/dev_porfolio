<script lang="ts">
  let count = 0;

  function handleClick() {
    count += 1;
    console.log("clicked");
  }
</script>

<button on:click={handleClick} class="btn">
  count : {count}
  {count === 1 ? "time" : "times"}
</button>

<style lang="sass">
.btn
    border: none
    border-radius: 99px
    background-color: #ffffff
    padding: 8px 16px 8px 16px
    cursor: pointer
</style>
